import {CharacterNote, CharacterSkillPoints, Lvl0Character, StaticInventoryData} from '../models/lvl0-character';
import {createSelector} from './selector-helper';
import _ from 'lodash';
import {Lvl0Item} from '../models/lvl0-item';
import {UnionKeys} from '../../../utils/util';

export function selectCharacterLevel() {
    return createSimpleSelector(c => c.system.level, (a, b) => a.value === b.value)
}

export function selectCharacterInitialBasicStatValues() {
    return createSimpleSelector(c => ({
        cha: +c.system.baseStats.cha.value || 0,
        per: +c.system.baseStats.per.value || 0,
        phy: +c.system.baseStats.phy.value || 0,
        dex: +c.system.baseStats.dex.value || 0,
        int: +c.system.baseStats.int.value || 0
    }), _.isEqual)
}

export function selectNextLevelExperience() {
    return createSimpleSelector(c => {
        if (c.system.level.value < 1)
            return 0;
        else if (c.system.level.value < 25)
            return 10;
        else if (c.system.level.value < 50)
            return 15;
        else
            return 20;
    })
}

export function selectCharacterItemsOfType<T extends Lvl0Item = Lvl0Item>(itemType: UnionKeys<T, 'type'>) {
    return createSimpleSelector<T[]>(c => c.itemsByType[itemType] as T[], _.isEqual)
}

export function selectCharacterItemsByType() {
    return createSimpleSelector(c => c.itemsByType, _.isEqual)
}

export function selectCharacterItems() {
    return createSelector<Lvl0Character, Lvl0Item[]>(c => c.items)
}

export function selectCharacterMana() {
    return createSimpleSelector(c => c.system.mana.value, (a, b) => a === b)
}

export function selectRationCount() {
    return createSimpleSelector(c => c.system.staticInventory.rationCount ?? 0, (a, b) => a === b)
}

export function selectTorchCount() {
    return createSimpleSelector(c => c.system.staticInventory.torchCount ?? 0, (a, b) => a === b)
}

export function selectStaticInventory() {
    return createSimpleSelector(c => ({
        money: 0,
        money100: 0,
        money500: 0,
        money1000: 0,
        torchCount: 0,
        rationCount: 0,
        ...c.system.staticInventory as any
    } as StaticInventoryData));
}

export function selectCharacterHealth() {
    return createSimpleSelector(c => c.system.health.value, (a, b) => a === b)
}

export function selectCharacterExperience() {
    return createSimpleSelector(c => c.system.experience.value, (a, b) => a === b)
}

export function selectIsSkillMasterUsed(skillCategoryId: string, id: string) {
    return createSimpleSelector(c => c.system.usedSkillMastery?.[skillCategoryId]?.[id] ?? false);
}

export function selectIsSkillProdigyUsed(skillCategoryId: string, id: string) {
    return createSimpleSelector(c => c.system.usedSkillProdigy?.[skillCategoryId]?.[id] ?? false);
}

export function selectCharacterSpecialities() {
    return createSimpleSelector(c => c.system.specialities ?? {});
}

export function selectNotes() {
    return createSimpleSelector<CharacterNote>(c => {
        if (!c.system.notes) {
            return {
                mode: 'markdown',
                content: ''
            };
        }
        if (c.system.notes.content && !c.system.notes.mode) {
            return  {
                ...c.system.notes,
                mode: 'html'
            }
        }
        return {...c.system.notes};
    });
}


export function selectHavePendingSkillPoints() {
    return createSimpleSelector(c => {
        if (!c.system.pendingSkills)
            return false;

        for (let skills of Object.values(c.system.pendingSkills)) {
            for (let pendingSkillValue of Object.values(skills)) {
                if (pendingSkillValue.prodigy || pendingSkillValue.master || pendingSkillValue.value > 0) {
                    return true;
                }
            }
        }

        return false;
    })
}

export function selectCharacterPendingSkillValue(skillCategoryId: string, id: string) {
    return createSimpleSelector(c => {
        let pendingSkillValue = c.system.pendingSkills?.[skillCategoryId]?.[id];
        return {value: 0, prodigy: false, master: false, ...pendingSkillValue};
    })
}

export function selectCharacterSkills() {
    return createSimpleSelector(c => c.system.skills)
}

export function selectCharacterSkillValue(skillCategoryId: string, id: string) {
    return createSimpleSelector(c => c.system.skills?.[skillCategoryId]?.[id] ?? {
        value: 0,
        prodigy: false,
        master: false,
        manualMode: false
    })
}

export function selectCharacterPendingSkills() {
    return createSimpleSelector(c => c.system.pendingSkills ?? {} as CharacterSkillPoints)
}

function createSimpleSelector<T>(
    valueSelector: (character: Lvl0Character) => T,
    comparator?: (previous: T, current: T) => boolean
) {
    return createSelector<Lvl0Character, T>(
        character => valueSelector(character),
        comparator
    )
}
