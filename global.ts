import {Lvl0ChatMessage} from './src/app/chat/lvl0-chat-message.types';
import {Lvl0FoundryActor, Lvl0FoundryCharacterSystemData} from './src/models/actor';
import {Lvl0FoundryItem} from './src/models/item';
import {
    Lvl0FoundryItemAmmunition,
    Lvl0FoundryItemArmor,
    Lvl0FoundryItemBag,
    Lvl0FoundryItemBelt,
    Lvl0FoundryItemCloak,
    Lvl0FoundryItemFoot,
    Lvl0FoundryItemHand,
    Lvl0FoundryItemHandWeapon,
    Lvl0FoundryItemHead,
    Lvl0FoundryItemMagical,
    Lvl0FoundryItemMisc,
    Lvl0FoundryItemNecklace,
    Lvl0FoundryItemPotions,
    Lvl0FoundryItemPurse,
    Lvl0FoundryItemRing,
    Lvl0FoundryItemScroll,
    Lvl0FoundryItemShield,
    Lvl0FoundryItemWand,
    Lvl0FoundryItemWeapon,
} from './src/models/item/schemas';

declare global {
    type RecursivePartial<T> = {
        [P in keyof T]?: RecursivePartial<T[P]>;
    };

    interface ColorSet {
        name: string,
        description?: string,
        category: string,
        foreground?: string,
        background?: string,
        texture?: string,
        edge?: string,
        material?: string,
        font?: string,
        fontScale?: Record<string, number>,
        visibility?: 'visible'
    }

    interface Dice3d {
        addColorset: (colorSet: ColorSet, mode: 'default' | 'preferred') => void
    }

    type Equals<X, Y> =
        (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
            ? true
            : false;

    type ExpectTrue<T extends true> = T;
}

declare module "fvtt-types/configuration" {
    interface DocumentClassConfig {
        Actor: typeof Lvl0FoundryActor<Actor.ConfiguredSubType>;
        Item: typeof Lvl0FoundryItem<Item.ConfiguredSubType>;
    }

    interface AssumeHookRan {
        ready: true;
    }

    interface DataModelConfig {
        Actor: {
            character: typeof Lvl0FoundryCharacterSystemData;
        }
        Item: {
            ammunition: typeof Lvl0FoundryItemAmmunition;
            armor: typeof Lvl0FoundryItemArmor;
            bag: typeof Lvl0FoundryItemBag;
            belt: typeof Lvl0FoundryItemBelt;
            cloak: typeof Lvl0FoundryItemCloak;
            foot: typeof Lvl0FoundryItemFoot;
            hand: typeof Lvl0FoundryItemHand;
            head: typeof Lvl0FoundryItemHead;
            magical: typeof Lvl0FoundryItemMagical;
            misc: typeof Lvl0FoundryItemMisc;
            necklace: typeof Lvl0FoundryItemNecklace;
            potions: typeof Lvl0FoundryItemPotions;
            purse: typeof Lvl0FoundryItemPurse;
            ring: typeof Lvl0FoundryItemRing;
            shield: typeof Lvl0FoundryItemShield;
            wand: typeof Lvl0FoundryItemWand;
            scroll: typeof Lvl0FoundryItemScroll;
            handWeapon: typeof Lvl0FoundryItemHandWeapon;
            weapon: typeof Lvl0FoundryItemWeapon;
        }
    }

    interface ConfiguredActor<SubType extends Actor.SubType> {
        document: Lvl0FoundryActor<SubType & Actor.ConfiguredSubType>;
    }

    interface ConfiguredItem<SubType extends Item.SubType> {
        document: Lvl0FoundryItem<SubType & Item.ConfiguredSubType>;
    }

    interface FlagConfig {
        ActiveEffect: {
            'lvl0mf-sheet'?: {
                statusId?: string;
            };
        };
        ChatMessage: {
            'lvl0mf-sheet'?: {
                lvl0ChatMessage: Lvl0ChatMessage;
            };
        }
    }
}
