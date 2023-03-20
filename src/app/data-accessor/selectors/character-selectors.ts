import {Lvl0Character} from '../models/lvl0-character';
import {createSelector} from './selector-helper';

export function selectCharacterLevel() {
    return createSimpleSelector(c => c.data.level, (a, b) => a.value === b.value)
}

export function selectCharacterLevelUpData() {
    // FIXME: Maybe use a deep compare library or write one?
    return createSimpleSelector(c => c.data.levelUpData, (a, b) => JSON.stringify(a) === JSON.stringify(b))
}

export function selectCharacterModifiers() {
    return createSimpleSelector(c => c.data.modifiers, (a, b) => JSON.stringify(a) === JSON.stringify(b))
}

export function selectCharacterMana() {
    return createSimpleSelector(c => c.data.mana.value, (a, b) => a === b)
}

function createSimpleSelector<T>(
    valueSelector: (character: Lvl0Character) => T,
    comparator?: (previous: T, current: T) => boolean
) {
    return createSelector<Lvl0Character, T>(
        character => valueSelector(character)
    )
}
