import {ItemPropertiesTemplateBase} from './item-properties-template-base';

export interface WandItemPropertiesData extends ItemPropertiesTemplateBase {
    charge: number;
    clutter: number;
    arcane: number;
    spell: string;
}

export interface WandItemProperties {
    type: 'wand';
    data: WandItemPropertiesData;
}
