import {ItemPropertiesTemplateBase} from './item-properties-template-base';
import {ItemPropertiesTemplateExtraSkills} from './item-properties-template-extra-skills';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {ItemPropertiesUniqueCapabilities} from './item-properties-unique-capabilities';

export interface ShieldItemPropertiesData extends ItemPropertiesTemplateBase, ItemPropertiesTemplateExtraSkills, ItemPropertiesTemplateStatModifiers, ItemPropertiesUniqueCapabilities {
    blockValue: string;
    damage: string;
}

export interface ShieldItemProperties {
    type: 'shield';
    system: ShieldItemPropertiesData;
}
