import {LevelValue, Lvl0Character} from '../models/lvl0-character';
import {getItemModifiersIfAvailable} from '../../../models/item';
import {Lvl0Item} from '../models/lvl0-item';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterLevel} from './character-selectors';
import {selectCharacterEquipedItems} from './character-equiped-items-selector';
import {ActiveCharacterModifier, selectCharacterModifiers} from './character-modifiers-selector';
import {CharacterLevelData, selectCharacterLevelUpData} from './character-level-up-data-selector';

export class CharacterMaxHealthSelector {
    static computeMaxHealth(
        level: LevelValue,
        levelUpData: CharacterLevelData[],
        equipedItems: Lvl0Item[],
        modifiers: ActiveCharacterModifier[]
    ): number {
        let maxHealth = 0;
        for (let levelData of levelUpData) {
            if (levelData.level <= level.value) {
                maxHealth += levelData.health;
            }
        }

        for (let modifier of modifiers) {
            if (modifier.stat === 'health') {
                maxHealth += modifier.value;
            }
        }

        for (let item of equipedItems) {
            let itemModifiers = getItemModifiersIfAvailable(item);
            if (itemModifiers) {
                for (let modifier of Object.values(itemModifiers)) {
                    if (modifier.stat === 'health') {
                        maxHealth += modifier.value;
                    }
                }
            }
        }

        return maxHealth;
    }
}


export function selectCharacterMaxHealth() {
    return function (source: Observable<Lvl0Character>): Observable<number> {
        return new Observable<number>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterEquipedItems()),
                source.pipe(selectCharacterLevel()),
                source.pipe(selectCharacterLevelUpData()),
                source.pipe(selectCharacterModifiers()),
            ]).subscribe({
                next([equipedUItems, level, levelUpData, modifiers]: [Lvl0Item[], LevelValue, CharacterLevelData[], ActiveCharacterModifier[]]) {
                    subscriber.next(CharacterMaxHealthSelector.computeMaxHealth(level, levelUpData, equipedUItems, modifiers));
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
