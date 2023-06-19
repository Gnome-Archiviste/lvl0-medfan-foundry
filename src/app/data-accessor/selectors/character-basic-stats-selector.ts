import {Lvl0Character} from '../models/lvl0-character';
import {getItemModifiersIfAvailable} from '../../../models/item';
import {Lvl0Item} from '../models/lvl0-item';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterInitialBasicStatValues} from './character-selectors';
import {selectCharacterEquipedItems} from './character-equiped-items-selector';
import {ActorBasicStatNames} from '../../../models/shared';
import {ActiveCharacterModifier, selectCharacterModifiers} from './character-modifiers-selector';
import {CharacterLevelData, selectCharacterLevelUpData} from './character-level-up-data-selector';

export type ActorBasicStatValues = {
    [Key in ActorBasicStatNames]: number;
};

export class CharacterBasicStatsSelector {
    static computeBasicStats(
        equipedItems: Lvl0Item[],
        modifiers: ActiveCharacterModifier[],
        levelUpData: CharacterLevelData[],
        initialStats: ActorBasicStatValues
    ): ActorBasicStatValues {
        let basicStats: ActorBasicStatValues = {...initialStats};

        for (let modifier of modifiers) {
            if (modifier.stat in basicStats) {
                basicStats[modifier.stat] += modifier.value;
            }
        }

        for (let item of equipedItems) {
            let itemModifiers = getItemModifiersIfAvailable(item);
            if (itemModifiers) {
                for (let modifier of Object.values(itemModifiers)) {
                    if (modifier.stat in basicStats) {
                        basicStats[modifier.stat] += modifier.value;
                    }
                }
            }
            if (item.type == 'armor' && item.data.dexMalus) {
                basicStats.dex -= item.data.dexMalus;
            }
        }


        for (const levelData of levelUpData) {
            if (levelData.additionalStat)
                basicStats[levelData.additionalStat]++;
        }

        return basicStats;
    }
}

export function selectCharacterBasicStats() {
    return function (source: Observable<Lvl0Character>): Observable<ActorBasicStatValues> {
        return new Observable<ActorBasicStatValues>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterEquipedItems()),
                source.pipe(selectCharacterModifiers()),
                source.pipe(selectCharacterLevelUpData()),
                source.pipe(selectCharacterInitialBasicStatValues()),
            ]).subscribe({
                next: ([equipedUItems, modifiers, LevelUpData, initialStats]: [Lvl0Item[], ActiveCharacterModifier[], CharacterLevelData[], ActorBasicStatValues]) => {
                    subscriber.next(CharacterBasicStatsSelector.computeBasicStats(equipedUItems, modifiers, LevelUpData, initialStats));
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
