import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {ItemPropertiesTemplateExtraSkills} from './item-properties-template-extra-skills';
import {ItemPropertiesUniqueCapabilities} from './item-properties-unique-capabilities';

export interface ArmorItemPropertiesData extends ItemPropertiesTemplateBase, ItemPropertiesTemplateStatModifiers, ItemPropertiesUniqueCapabilities, ItemPropertiesTemplateExtraSkills {
    protection: number;
    dexMalus: number;
    immunity: string;
}

export interface ArmorItemProperties {
    type: 'armor';
    system: ArmorItemPropertiesData;
}
