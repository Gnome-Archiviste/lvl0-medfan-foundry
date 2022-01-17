import {ItemPropertiesTemplateBase} from './item-properties-template-base';

export interface ScrollItemPropertiesData extends ItemPropertiesTemplateBase {
    spell: string;
    arcane: number;
}

export interface ScrollItemProperties {
    type: 'scroll';
    data: ScrollItemPropertiesData;
}
