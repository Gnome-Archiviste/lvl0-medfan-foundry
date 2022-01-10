import {ItemPropertiesTemplateBase} from './item-properties-template-base';

export interface HandWeaponItemPropertiesData extends ItemPropertiesTemplateBase {
    damage: string;
    element: string;
    bonus: string;
    canUseWeapon: boolean;
}

export interface HandWeaponItemProperties {
    type: 'handWeapon';
    data: HandWeaponItemPropertiesData;
}
