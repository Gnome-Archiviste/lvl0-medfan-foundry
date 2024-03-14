import {ItemPropertiesTemplateBase} from './item-properties-template-base';

export interface BagItemPropertiesData extends ItemPropertiesTemplateBase {
    extraRows: number;
    extraColumns: number;
    noLimit: boolean;
}

export interface BagItemProperties {
    type: 'bag';
    system: BagItemPropertiesData;
}
