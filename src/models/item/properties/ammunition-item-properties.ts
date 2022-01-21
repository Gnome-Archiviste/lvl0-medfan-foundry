import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {Lvl0ItemType} from '../lvl0-item-data';

export enum AmmunitionType {
    Arrow = 'arrow',
    Bolt = 'bolt',
    Dart = 'dart',
    Marble = 'marble',
}

export interface AmmunitionItemPropertiesData extends ItemPropertiesTemplateBase {
    extraDamage: string;
    extraDamageEffect: string;
    bonus: string;
    ammunitionType: AmmunitionType;
}

export interface AmmunitionItemProperties {
    type: 'ammunition';
    data: AmmunitionItemPropertiesData;
}

export function assertIAmmunition(type: Lvl0ItemType): asserts type is 'ammunition' {
    if (type !== 'ammunition')
        throw new Error('Not supported for item of type: ' + this.actor.data.type);
}
