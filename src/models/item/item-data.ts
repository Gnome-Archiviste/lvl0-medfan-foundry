import {WeaponItemProperties} from './weapon-item-properties';
import {AmmunitionItemProperties} from './ammunition-item-properties';
import {BeltItemProperties} from './belt-item-properties';
import {ArmorItemProperties} from './armor-item-properties';
import {CloakItemProperties} from './cloak-item-properties';
import {HandItemProperties} from './hand-item-properties';
import {MagicalItemProperties} from './magical-item-properties';
import {PurseItemProperties} from './purse-item-properties';
import {NecklaceItemProperties} from './necklace-item-properties';
import {FootItemProperties} from './foot-item-properties';
import {RingItemProperties} from './ring-item-properties';
import {HandWeaponItemProperties} from './hand-weapon-item-properties';
import {BagItemProperties} from './bag-item-properties';
import {HeadItemProperties} from './head-item-properties';
import {ShieldItemProperties} from './shield-item-properties';
import {WandItemProperties} from './wand-item-properties';
import {ScrollItemProperties} from './scroll-item-properties-data';
import {PotionsItemProperties} from './potions-item-properties';
import {MiscItemProperties} from './misc-item-properties';
import {ItemPropertiesTemplateStatModifiers} from './item-properties-template-stat-modifiers';
import {ItemModifierInfo} from '../all';

type Lvl0ItemData = AmmunitionItemProperties
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
