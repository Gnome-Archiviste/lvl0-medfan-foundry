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
    ItemPropertiesTemplateExtraSkills,
    ItemPropertiesTemplateStatModifiers,
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
} from '../../../models/item';

export type BaseLvl0Item = {
    id: string;
    name: string;
    img?: string;
    isOwned: boolean;
    ownerId?: string;
}

export type Lvl0ItemAmmunition = BaseLvl0Item & AmmunitionItemProperties;
export type Lvl0ItemArmor = BaseLvl0Item & ArmorItemProperties;
export type Lvl0ItemBag = BaseLvl0Item & BagItemProperties;
export type Lvl0ItemBelt = BaseLvl0Item & BeltItemProperties;
export type Lvl0ItemCloak = BaseLvl0Item & CloakItemProperties;
export type Lvl0ItemFoot = BaseLvl0Item & FootItemProperties;
export type Lvl0ItemHand = BaseLvl0Item & HandItemProperties;
export type Lvl0ItemHead = BaseLvl0Item & HeadItemProperties;
export type Lvl0ItemMagical = BaseLvl0Item & MagicalItemProperties;
export type Lvl0ItemMisc = BaseLvl0Item & MiscItemProperties;
export type Lvl0ItemNecklace = BaseLvl0Item & NecklaceItemProperties;
export type Lvl0ItemPotions = BaseLvl0Item & PotionsItemProperties;
export type Lvl0ItemPurse = BaseLvl0Item & PurseItemProperties;
export type Lvl0ItemRing = BaseLvl0Item & RingItemProperties;
export type Lvl0ItemShield = BaseLvl0Item & ShieldItemProperties;
export type Lvl0ItemWand = BaseLvl0Item & WandItemProperties;
export type Lvl0ItemScroll = BaseLvl0Item & ScrollItemProperties;
export type Lvl0ItemHandWeapon = BaseLvl0Item & HandWeaponItemProperties;
export type Lvl0ItemWeapon = BaseLvl0Item & WeaponItemProperties;

export type Lvl0Item =
    | Lvl0ItemAmmunition
    | Lvl0ItemArmor
    | Lvl0ItemBag
    | Lvl0ItemBelt
    | Lvl0ItemCloak
    | Lvl0ItemFoot
    | Lvl0ItemHand
    | Lvl0ItemHead
    | Lvl0ItemMagical
    | Lvl0ItemMisc
    | Lvl0ItemNecklace
    | Lvl0ItemPotions
    | Lvl0ItemPurse
    | Lvl0ItemRing
    | Lvl0ItemShield
    | Lvl0ItemWand
    | Lvl0ItemScroll
    | Lvl0ItemHandWeapon
    | Lvl0ItemWeapon;

export type Lvl0ItemWithModifiers = Lvl0Item & { system: ItemPropertiesTemplateStatModifiers };
export type Lvl0ItemWitExtraSkills = Lvl0Item & { system: ItemPropertiesTemplateExtraSkills };

