import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {ItemPropertiesTemplateExtraSkills} from './item-properties-template-extra-skills';

export interface HandWeaponItemPropertiesData extends ItemPropertiesTemplateBase, ItemPropertiesTemplateStatModifiers, ItemPropertiesTemplateExtraSkills {
    damage: string;
    element: string;
    bonus: string;
    canUseWeapon: boolean;
    immunity: string;
}

export interface HandWeaponItemProperties {
    type: 'handWeapon';
    data: HandWeaponItemPropertiesData;
}
