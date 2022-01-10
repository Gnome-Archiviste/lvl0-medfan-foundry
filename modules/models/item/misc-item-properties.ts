import {ItemPropertiesTemplateBase} from './item-properties-template-base';

export interface MiscItemPropertiesData extends ItemPropertiesTemplateBase {
}

export interface MiscItemProperties {
    type: 'misc';
    data: MiscItemPropertiesData;
}
