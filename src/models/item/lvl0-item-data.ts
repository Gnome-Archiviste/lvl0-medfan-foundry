import {
    AmmunitionItemProperties,
    ArmorItemProperties,
    BagItemProperties,
    BeltItemProperties,
    CloakItemProperties,
    FootItemProperties,
    HandItemProperties,
    HandWeaponItemProperties,
    HeadItemProperties,
    MagicalItemProperties,
    MiscItemProperties,
    NecklaceItemProperties,
    PotionsItemProperties,
    PurseItemProperties,
    RingItemProperties,
    ScrollItemProperties,
    ShieldItemProperties,
    WandItemProperties,
    WeaponItemProperties
} from './properties';
import {ItemModifierInfo} from './item-modifier-info';

export type Lvl0ItemData =
    AmmunitionItemProperties
    | ArmorItemProperties
    | BagItemProperties
    | BeltItemProperties
    | CloakItemProperties
    | HandItemProperties
    | HeadItemProperties
    | MagicalItemProperties
    | PurseItemProperties
    | NecklaceItemProperties
    | FootItemProperties
    | PotionsItemProperties
    | RingItemProperties
    | MiscItemProperties
    | ShieldItemProperties
    | WandItemProperties
    | ScrollItemProperties
    | HandWeaponItemProperties
    | WeaponItemProperties

export enum Lvl0ItemType {
    "ammunition",
    "armor",
    "bag",
    "belt",
    "cloak",
    "foot",
    "hand",
    "head",
    "magical",
    "misc",
    "necklace",
    "potions",
    "purse",
    "ring",
    "shield",
    "wand",
    "scroll",
    "handWeapon",
    "weapon"
}


export const Lvl0ItemTypes = [
    "armor",
    "ammunition",
    "bag",
    "belt",
    "cloak",
    "foot",
    "hand",
    "head",
    "magical",
    "misc",
    "necklace",
    "potions",
    "purse",
    "ring",
    "shield",
    "wand",
    "scroll",
    "handWeapon",
    "weapon"]

export function getItemModifiersIfAvailable(data: Lvl0ItemData): { [id: string]: ItemModifierInfo } | undefined {
    if (data.type == 'armor'
        || data.type == 'belt'
        || data.type == 'cloak'
        || data.type == 'hand'
        || data.type == 'head'
        || data.type == 'necklace'
        || data.type == 'foot'
        || data.type == 'ring'
        || data.type == 'weapon')
        return data.system.modifiers;
    return undefined;
}


