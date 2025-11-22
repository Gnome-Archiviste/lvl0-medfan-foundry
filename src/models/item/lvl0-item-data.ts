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
    WeaponItemProperties,
} from './properties';

import {ItemModifierInfo} from './item-modifier-info';
import {ItemPropertiesTemplateBaseSchema} from './schemas';
import {isInteger} from 'lodash';

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
        || data.type == 'magical'
        || data.type == 'foot'
        || data.type == 'ring'
        || data.type == 'weapon')
        return data.system.modifiers;
    return undefined;
}

export abstract class FoundryItemSystemDataBase<DS extends ReturnType<typeof ItemPropertiesTemplateBaseSchema>>
    extends foundry.abstract.TypeDataModel<DS, Item.Implementation> {

    static migrateData(source: any) {
        console.debug(`Migrating item with data`, source);
        if ('arcane' in source && !isInteger(source.arcane)) {
            if (source.spell) {
                console.warn(`Fixing arcane level`, source);
                source.arcane = parseInt(source.spell.split('.')[2]);
            } else {
                console.warn(`Reseting arcane level`, source);
                source.arcane = 0;
            }
        }

        if ('weaponType' in source) {
            if (source.weaponType != 'melee' && source.weaponType != 'range' && source.weaponType != 'melee-range') {
                console.warn(`Fixing weapon type`, source);
                source.weaponType = 'melee';
            }
        }

        if ('damage' in source && typeof source.damage === 'object') {
            console.warn(`Fixing damage`, source.damage);
            source.damage = '1';
        }

        if ('damage' in source && source.damage === '1d6 x2') {
            source.damage = '(1d6)*2'
        }

        if (source.ammunitionType && !source.extraDamageEffect) {
            console.warn(`Fixing element`, source.extraDamageEffect);
            source.extraDamageEffect = 'physic';
        }

        return super.migrateData(source);
    }
}
