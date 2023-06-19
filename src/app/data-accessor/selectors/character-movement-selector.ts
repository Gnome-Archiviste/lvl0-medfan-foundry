import {Lvl0Character} from '../models/lvl0-character';
import {getItemModifiersIfAvailable} from '../../../models/item';
import {Lvl0Item} from '../models/lvl0-item';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterEquipedItems} from './character-equiped-items-selector';
import {ActorBasicStatValues, selectCharacterBasicStats} from './character-basic-stats-selector';
import {ActiveCharacterModifier, selectCharacterModifiers} from './character-modifiers-selector';

export class CharacterMovementSelector {
    static computeMovement(
        basicStats: ActorBasicStatValues,
        equipedItems: Lvl0Item[],
        modifiers: ActiveCharacterModifier[]
    ): number {
        let movement = basicStats.phy + basicStats.dex;

        // FIXME: For movement we would need a % system
        for (let modifier of modifiers) {
            if (modifier.stat === 'movement') {
                movement += modifier.value;
            }
        }

        for (let item of equipedItems) {
            let itemModifiers = getItemModifiersIfAvailable(item);
            if (itemModifiers) {
                for (let modifier of Object.values(itemModifiers)) {
                    if (modifier.stat === 'movement') {
                        movement += modifier.value;
                    }
                }
            }
        }

        return movement;
    }
}


export function selectCharacterMovement() {
    return function (source: Observable<Lvl0Character>): Observable<number> {
        return new Observable<number>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterBasicStats()),
                source.pipe(selectCharacterEquipedItems()),
                source.pipe(selectCharacterModifiers()),
            ]).subscribe({
                next([basicStats, equipedUItems, modifiers]: [ActorBasicStatValues, Lvl0Item[], ActiveCharacterModifier[]]) {
                    subscriber.next(CharacterMovementSelector.computeMovement(basicStats, equipedUItems, modifiers));
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
