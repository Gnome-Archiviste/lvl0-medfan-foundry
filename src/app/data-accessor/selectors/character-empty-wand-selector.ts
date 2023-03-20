import {Lvl0Character} from '../models/lvl0-character';
import {Lvl0Item} from '../models/lvl0-item';
import {createSelector} from './selector-helper';
import _ from 'lodash';

class CharacterEmptyWandSelector {
    static selectEmptyWands(
        character: Lvl0Character
    ): Lvl0Item[] {
        return character.itemsByType['wand'].filter(w => !w.data.spell && w.data.quantity)
    }
}

export function selectCharacterEmptyWands() {
    return createSelector<Lvl0Character, Lvl0Item[]>(c => CharacterEmptyWandSelector.selectEmptyWands(c))
}

