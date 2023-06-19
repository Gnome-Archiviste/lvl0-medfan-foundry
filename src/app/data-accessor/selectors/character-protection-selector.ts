import {Lvl0Character} from '../models/lvl0-character';
import {getItemModifiersIfAvailable} from '../../../models/item';
import {Lvl0Item} from '../models/lvl0-item';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterEquipedItems} from './character-equiped-items-selector';
import {ActiveCharacterModifier, selectCharacterModifiers} from './character-modifiers-selector';

export class CharacterProtectionSelector {
    static computeProtection(
        equipedItems: Lvl0Item[],
        modifiers: ActiveCharacterModifier[]
    ): number {
        let protection = 0;

        for (let modifier of modifiers) {
            if (modifier.stat === 'protection') {
                protection += modifier.value;
            }
        }

        for (let item of equipedItems) {
            if (item.type == 'armor') {
                protection += item.data.protection
            }
            let itemModifiers = getItemModifiersIfAvailable(item);
            if (itemModifiers) {
                for (let modifier of Object.values(itemModifiers)) {
                    if (modifier.stat === 'protection') {
                        protection += modifier.value;
                    }
                }
            }
        }

        return protection;
    }
}


export function selectCharacterProtection() {
    return function (source: Observable<Lvl0Character>): Observable<number> {
        return new Observable<number>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterEquipedItems()),
                source.pipe(selectCharacterModifiers()),
            ]).subscribe({
                next([equipedUItems, modifiers]: [Lvl0Item[], ActiveCharacterModifier[]]) {
                    subscriber.next(CharacterProtectionSelector.computeProtection(equipedUItems, modifiers));
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
