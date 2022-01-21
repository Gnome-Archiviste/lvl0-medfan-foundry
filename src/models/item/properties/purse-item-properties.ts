import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {ItemPropertiesTemplateExtraSkills} from './item-properties-template-extra-skills';

export interface PurseItemPropertiesData extends ItemPropertiesTemplateBase {
    maxMoney: number;
}

export interface PurseItemProperties {
    type: 'purse';
    data: PurseItemPropertiesData;
}
