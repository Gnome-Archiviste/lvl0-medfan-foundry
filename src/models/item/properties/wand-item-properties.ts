import {ItemPropertiesTemplateBase} from './item-properties-template-base';

export interface WandItemPropertiesData extends ItemPropertiesTemplateBase {
    charge: number;
    clutter: number;
    arcane: number;
    spell: string;
    // When trying to fill a wand with an epic fail, the wand cannot be filled anymore
    blocked: boolean;
}

export interface WandItemProperties {
    type: 'wand';
    data: WandItemPropertiesData;
}
