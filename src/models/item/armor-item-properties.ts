import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {ItemPropertiesTemplateExtraSkills} from './item-properties-template-extra-skills';

export interface ArmorItemPropertiesData extends ItemPropertiesTemplateBase, ItemPropertiesTemplateStatModifiers, ItemPropertiesTemplateExtraSkills {
    protection: number;
    dexMalus: number;
    immunity: string;
}

export interface ArmorItemProperties {
    type: 'armor';
    data: ArmorItemPropertiesData;
}
