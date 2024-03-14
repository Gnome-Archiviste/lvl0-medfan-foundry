import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {AmmunitionType} from './ammunition-item-properties';

export enum WeaponType {
    Melee = 'melee',
    Range = 'range',
    MeleeRange = 'melee-range'
}

export interface WeaponItemPropertiesData extends ItemPropertiesTemplateBase, ItemPropertiesTemplateStatModifiers {
    damage?: string
    rangeDamage?: string
    handCount: number;
    element: string; // FIXME: enum
    bonus: string;
    usedAmmunitionType: AmmunitionType;
    weaponType: WeaponType;
}

export interface WeaponItemProperties {
    type: 'weapon';
    system: WeaponItemPropertiesData;
}
