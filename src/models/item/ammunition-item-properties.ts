import {ItemPropertiesTemplateBase} from './item-properties-template-base';

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
