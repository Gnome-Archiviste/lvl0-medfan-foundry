import {WeaponItemProperties} from './properties/weapon-item-properties';
import {AmmunitionItemProperties} from './properties/ammunition-item-properties';
import {BeltItemProperties} from './properties/belt-item-properties';
import {ArmorItemProperties} from './properties/armor-item-properties';
import {CloakItemProperties} from './properties/cloak-item-properties';
import {HandItemProperties} from './properties/hand-item-properties';
import {MagicalItemProperties} from './properties/magical-item-properties';
import {PurseItemProperties} from './properties/purse-item-properties';
import {NecklaceItemProperties} from './properties/necklace-item-properties';
import {FootItemProperties} from './properties/foot-item-properties';
import {RingItemProperties} from './properties/ring-item-properties';
import {HandWeaponItemProperties} from './properties/hand-weapon-item-properties';
import {BagItemProperties} from './properties/bag-item-properties';
import {HeadItemProperties} from './properties/head-item-properties';
import {ShieldItemProperties} from './properties/shield-item-properties';
import {WandItemProperties} from './properties/wand-item-properties';
import {ScrollItemProperties} from './properties/scroll-item-properties-data';
import {PotionsItemProperties} from './properties/potions-item-properties';
import {MiscItemProperties} from './properties/misc-item-properties';
import {ItemModifierInfo} from './item-modifier-info';

type Lvl0ItemData =
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

export type Lvl0ItemType =
    "ammunition"
    | "armor"
    | "bag"
    | "belt"
    | "cloak"
    | "foot"
    | "hand"
    | "head"
    | "magical"
    | "misc"
    | "necklace"
    | "potions"
    | "purse"
    | "ring"
    | "shield"
    | "wand"
    | "scroll"
    | "handWeapon"
    | "weapon";

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
        return data.data.modifiers;
    return undefined;
}

export function getItemExtraSkillsIfAvailable(data: Lvl0ItemData): { [id: string]: string } | undefined {
    if (data.type == "armor"
        || data.type == "belt"
        || data.type == "cloak"
        || data.type == "hand"
        || data.type == "head"
        || data.type == "necklace"
        || data.type == "foot"
        || data.type == "ring"
        || data.type == "shield")
        return data.data.extraSkills;
    return undefined;
}

declare global {
    interface DataConfig {
        Item: Lvl0ItemData;
    }
}
