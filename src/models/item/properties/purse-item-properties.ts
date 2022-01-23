import {ItemPropertiesTemplateBase} from './item-properties-template-base';

export interface PurseItemPropertiesData extends ItemPropertiesTemplateBase {
    maxMoney: number;
}

export interface PurseItemProperties {
    type: 'purse';
    data: PurseItemPropertiesData;
}
