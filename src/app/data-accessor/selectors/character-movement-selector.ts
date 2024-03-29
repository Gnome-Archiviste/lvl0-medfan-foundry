import {Lvl0Character} from '../models/lvl0-character';
import {getItemModifiersIfAvailable} from '../../../models/item';
import {Lvl0Item} from '../models/lvl0-item';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterEquipedItems} from './character-equiped-items-selector';
import {ActorBasicStatValues, selectCharacterBasicStats} from './character-basic-stats-selector';
import {ActiveCharacterModifier, selectCharacterModifiers} from './character-modifiers-selector';
import {CharacterEffect, selectCharacterEffects} from './character-effects-selector';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';

export class CharacterMovementSelector {
    static computeMovement(
        basicStats: ActorBasicStatValues,
        equipedItems: Lvl0Item[],
        modifiers: ActiveCharacterModifier[],
        effects: CharacterEffect[]
    ): number {
        let movement = basicStats.phy + basicStats.dex;

        for (let modifier of modifiers) {
            if (modifier.stat === 'movement') {
                if (modifier.operation == 'MULTIPLY')
                    movement *= modifier.value;
                else
                    movement += modifier.value;
            }
        }

        for (let effect of effects) {
            for (let modifier of effect.modifiers) {
                if (modifier.stat === 'movement') {
                    if (modifier.operation == 'MULTIPLY')
                        movement *= modifier.value;
                    else
                        movement += modifier.value;
                }
            }
        }

        for (let item of equipedItems) {
            let itemModifiers = getItemModifiersIfAvailable(item);
            if (itemModifiers) {
                for (let modifier of Object.values(itemModifiers)) {
                    if (modifier.stat === 'movement') {
                        if (modifier.operation == 'MULTIPLY')
                            movement *= modifier.value;
                        else
                            movement += modifier.value;
                    }
                }
            }
        }

        return movement;
    }
}


export function selectCharacterMovement(systemDataDatabaseService: SystemDataDatabaseService) {
    return function (source: Observable<Lvl0Character>): Observable<number> {
        return new Observable<number>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterBasicStats()),
                source.pipe(selectCharacterEquipedItems()),
                source.pipe(selectCharacterModifiers()),
                source.pipe(selectCharacterEffects(systemDataDatabaseService)),
            ]).subscribe({
                next([basicStats, equipedUItems, modifiers, effects]: [ActorBasicStatValues, Lvl0Item[], ActiveCharacterModifier[], CharacterEffect[]]) {
                    subscriber.next(CharacterMovementSelector.computeMovement(basicStats, equipedUItems, modifiers, effects));
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        }).pipe(
            distinctUntilChanged(),
            shareReplay(1)
        );
    };
}
