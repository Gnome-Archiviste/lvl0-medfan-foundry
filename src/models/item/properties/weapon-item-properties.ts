import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {AmmunitionType} from './ammunition-item-properties';
import {Lvl0ItemType} from '../lvl0-item-data';

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
    data: WeaponItemPropertiesData;
}

export function assertIsWeapon(type: Lvl0ItemType): asserts type is 'weapon' {
    if (type !== 'weapon')
        throw new Error('Not supported for item of type: ' + this.actor.data.type);
}
