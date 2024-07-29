import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {ItemPropertiesTemplateExtraSkills} from './item-properties-template-extra-skills';
import {ItemPropertiesUniqueCapabilities} from './item-properties-unique-capabilities';

export interface NecklaceItemPropertiesData extends ItemPropertiesTemplateBase, ItemPropertiesTemplateStatModifiers, ItemPropertiesUniqueCapabilities, ItemPropertiesTemplateExtraSkills {
    immunity: string;
}

export interface NecklaceItemProperties {
    type: 'necklace';
    system: NecklaceItemPropertiesData;
}
