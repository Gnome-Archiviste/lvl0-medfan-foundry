import {ItemModifierInfo} from '../item-modifier-info';
import {Lvl0Item} from '../lvl0-item';

export interface ItemPropertiesTemplateStatModifiers {
    modifiers: { [id: string]: ItemModifierInfo };
}

export type Lvl0ItemWithModifiers = Lvl0Item & { data: { data: ItemPropertiesTemplateStatModifiers } };
