import {LevelUpData, LevelValue, Lvl0Character, Lvl0CharacterModifiers} from '../models/lvl0-character';
import {getItemModifiersIfAvailable} from '../../../models/item';
import {Lvl0Item} from '../models/lvl0-item';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterLevel, selectCharacterLevelUpData, selectCharacterModifiers} from './character-selectors';
import {selectCharacterEquipedItems} from './character-equiped-items-selector';

export class CharacterMaxHealthSelector {
    static computeMaxHealth(
        level: LevelValue,
        levelUpData: LevelUpData,
        equipedItems: Lvl0Item[],
        modifiers: Lvl0CharacterModifiers
    ): number {
        let maxHealth = 0;

        if (levelUpData) {
            for (let i = 1; i <= level.value; i++) {
                if (!(i in levelUpData)) {
                    continue;
                }

                maxHealth += levelUpData[i].health;
            }
        }

        for (let modifier of Object.values(modifiers)) {
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
                next([equipedUItems, level, levelUpData, modifiers]) {
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
