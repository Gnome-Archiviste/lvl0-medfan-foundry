import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {ItemPropertiesUniqueCapabilities} from './item-properties-unique-capabilities';

export enum WeaponType {
    Melee = 'melee',
    Range = 'range',
    MeleeRange = 'melee-range'
}

export interface WeaponItemPropertiesData extends ItemPropertiesTemplateBase, ItemPropertiesTemplateStatModifiers, ItemPropertiesUniqueCapabilities {
    damage: string | undefined;
    rangeDamage: string | undefined;
    handCount: number;
    element: string;
    bonus: string;
    // FIXME: Replace with AmmunitionType
    usedAmmunitionType: 'arrow' | 'bolt' | 'dart' | 'marble';
    // FIXME: Replace with WeaponType
    weaponType: 'melee' | 'range' | 'melee-range';
}

export interface WeaponItemProperties {
    type: 'weapon';
    system: WeaponItemPropertiesData;
}
