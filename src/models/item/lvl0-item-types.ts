import {Lvl0Item} from './lvl0-item';

export type Lvl0ItemAmmunition = Lvl0Item & { data: { type: 'ammunition' } }
export type Lvl0ItemArmor = Lvl0Item & { data: { type: 'armor' } }
export type Lvl0ItemBag = Lvl0Item & { data: { type: 'bag' } }
export type Lvl0ItemBelt = Lvl0Item & { data: { type: 'belt' } }
export type Lvl0ItemCloak = Lvl0Item & { data: { type: 'cloak' } }
export type Lvl0ItemFoot = Lvl0Item & { data: { type: 'foot' } }
export type Lvl0ItemHand = Lvl0Item & { data: { type: 'hand' } }
export type Lvl0ItemHead = Lvl0Item & { data: { type: 'head' } }
export type Lvl0ItemMagical = Lvl0Item & { data: { type: 'magical' } }
export type Lvl0ItemMisc = Lvl0Item & { data: { type: 'misc' } }
export type Lvl0ItemNecklace = Lvl0Item & { data: { type: 'necklace' } }
export type Lvl0ItemPotions = Lvl0Item & { data: { type: 'potions' } }
export type Lvl0ItemPurse = Lvl0Item & { data: { type: 'purse' } }
export type Lvl0ItemRing = Lvl0Item & { data: { type: 'ring' } }
export type Lvl0ItemShield = Lvl0Item & { data: { type: 'shield' } }
export type Lvl0ItemWand = Lvl0Item & { data: { type: 'wand' } }
export type Lvl0ItemScroll = Lvl0Item & { data: { type: 'scroll' } }
export type Lvl0ItemHandWeapon = Lvl0Item & { data: { type: 'handWeapon' } }
export type Lvl0ItemWeapon = Lvl0Item & { data: { type: 'weapon' } };
