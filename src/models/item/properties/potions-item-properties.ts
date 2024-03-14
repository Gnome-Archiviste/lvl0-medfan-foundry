import {ItemPropertiesTemplateBase} from './item-properties-template-base';

export interface PotionsItemPropertiesData extends ItemPropertiesTemplateBase {
}

export interface PotionsItemProperties {
    type: 'potions';
    system: PotionsItemPropertiesData;
}
