import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateExtraSkills} from './item-properties-template-extra-skills';

export interface ShieldItemPropertiesData extends ItemPropertiesTemplateBase, ItemPropertiesTemplateExtraSkills {
    blockValue: string;
    damage: string;
}

export interface ShieldItemProperties {
    type: 'shield';
    data: ShieldItemPropertiesData;
}
