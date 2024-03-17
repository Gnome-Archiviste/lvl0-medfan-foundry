import {Lvl0Character} from '../models/lvl0-character';
import {Lvl0ItemWand} from '../models/lvl0-item';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import _ from 'lodash';
import {selectCharacterItemsOfType} from './character-selectors';

class CharacterFillableWandForSpellSelector {
    static selectFillableWandsForSpell(
        spellId: string,
        wands: Lvl0ItemWand[],
        systemDataDatabaseService: SystemDataDatabaseService
    ): Lvl0ItemWand[] {
        let fillableWands: Lvl0ItemWand[] = [];
        for (let wand of wands) {
            if (wand.system.blocked)
                continue;

            if (!wand.system.spell) {
                fillableWands.push(wand)
                continue;
            }

            if (wand.system.spell !== spellId) {
                continue;
            }

            let spellDefinition = systemDataDatabaseService.spellRepository.getSpellById(wand.system.spell)
            if (!spellDefinition) {
                continue;
            }

            let wandConfig = systemDataDatabaseService.wandConfigRepository.getWandConfig(spellDefinition.level);
            if (!wandConfig) {
                continue;
            }

            if (wand.system.charge < wandConfig.maxChargesPerWand) {
                fillableWands.push(wand)
            }
        }
        return fillableWands;
    }
}

export function selectCharacterFillableWandsForSpell(spellId: string, systemDataDatabaseService: SystemDataDatabaseService) {
    return function (source: Observable<Lvl0Character>): Observable<Lvl0ItemWand[]> {
        return new Observable<Lvl0ItemWand[]>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterItemsOfType<Lvl0ItemWand>('wand')),
            ]).subscribe({
                next([wands]) {
                    subscriber.next(CharacterFillableWandForSpellSelector.selectFillableWandsForSpell(spellId, wands, systemDataDatabaseService));
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        }).pipe(
            distinctUntilChanged((a, b) => _.isEqual(a, b)),
            shareReplay(1)
        );
    };
}

