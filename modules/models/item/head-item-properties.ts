import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {ItemPropertiesTemplateExtraSkills} from './item-properties-template-extra-skills';

export interface HeadItemPropertiesData extends ItemPropertiesTemplateBase, ItemPropertiesTemplateStatModifiers, ItemPropertiesTemplateExtraSkills {
    immunity: string;
}

export interface HeadItemProperties {
    type: 'head';
    data: HeadItemPropertiesData;
}
