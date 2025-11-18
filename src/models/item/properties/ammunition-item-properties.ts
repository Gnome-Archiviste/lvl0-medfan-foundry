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
    // FIXME: Replace with AmmunitionType
    ammunitionType: 'arrow' | 'bolt' | 'dart' | 'marble';
}

export interface AmmunitionItemProperties {
    type: 'ammunition';
    system: AmmunitionItemPropertiesData;
}

