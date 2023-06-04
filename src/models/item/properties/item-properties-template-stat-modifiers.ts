import {ItemModifierInfo} from '../item-modifier-info';
import {Lvl0FoundryItem} from '../lvl0-foundry-item';

export interface ItemPropertiesTemplateStatModifiers {
    modifiers: { [id: string]: ItemModifierInfo };
}

export type Lvl0FoundryItemWithModifiers = Lvl0FoundryItem & { data: { data: ItemPropertiesTemplateStatModifiers } };
