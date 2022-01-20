import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {ItemPropertiesTemplateExtraSkills} from './item-properties-template-extra-skills';

export interface MagicalItemPropertiesData extends ItemPropertiesTemplateBase {
}

export interface MagicalItemProperties {
    type: 'magical';
    data: MagicalItemPropertiesData;
}
