import {Lvl0Character} from '../models/lvl0-character';
import {Lvl0Item} from '../models/lvl0-item';
import {createSelector} from './selector-helper';
import {Observable} from 'rxjs';

class CharacterEquipedItemsSelector {
    static computeEquipedItems(character: Lvl0Character): Lvl0Item[] {
        return character.items.filter(i => i.system.equiped);
    }
}

export function selectCharacterEquipedItems() {
    return createSelector<Lvl0Character, Lvl0Item[]>(c => CharacterEquipedItemsSelector.computeEquipedItems(c))
}
