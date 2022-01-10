import {ItemPropertiesTemplateBase} from './item-properties-template-base';

export interface ScrollItemPropertiesData extends ItemPropertiesTemplateBase {
    spell: string;
    arcane: string;
}

export interface ScrollItemProperties {
    type: 'scroll';
    data: ScrollItemPropertiesData;
}
