import {Lvl0Character} from '../models/lvl0-character';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import _ from 'lodash';
import {Lvl0Item} from '../models/lvl0-item';
import {selectCharacterEquipedItems} from './character-equiped-items-selector';

export type SuperiorArcaneCapability = {
    sourceType: 'item';
    sourceId: string;
    label: string;
    manaMultiplier?: number;
    damagePerLevel?: number;
    usageCountPerSessions?: number;
    maximumArcaneLevel?: number;
}

export class CharacterSuperiorArcaneCapabilitySelector {
    static selectSuperiorArcaneCapabilitySelector(
        equipedItems: Lvl0Item[],
    ): SuperiorArcaneCapability[] {
            let result: SuperiorArcaneCapability[] = [];
        for (let equipedItem of equipedItems) {
            if (!('superiorArcane' in equipedItem.system)) {
                continue;
            }
            if (!equipedItem.system.superiorArcane?.active) {
                continue;
            }

            result.push({
                label: equipedItem.name,
                sourceId: equipedItem.id,
                sourceType: 'item',
                ...equipedItem.system.superiorArcane
            } as SuperiorArcaneCapability)
        }
        return result;
    }
}

export function selectSuperiorArcaneCapability() {
    return function (source: Observable<Lvl0Character>): Observable<SuperiorArcaneCapability[]> {
        return new Observable<SuperiorArcaneCapability[]>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterEquipedItems()),
            ]).subscribe({
                next([equipedItems]: [Lvl0Item[]]) {
                    subscriber.next(CharacterSuperiorArcaneCapabilitySelector.selectSuperiorArcaneCapabilitySelector(
                        equipedItems,
                    ));
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
