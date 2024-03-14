import {ItemPropertiesTemplateBase} from './item-properties-template-base';

export interface MagicalItemPropertiesData extends ItemPropertiesTemplateBase {
}

export interface MagicalItemProperties {
    type: 'magical';
    system: MagicalItemPropertiesData;
}
