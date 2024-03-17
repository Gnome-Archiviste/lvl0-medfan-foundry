import '';
import {Lvl0ItemData} from './src/models/item';
import {InitializedGame} from './src/models/misc/game';
import {Lvl0CharacterData} from './src/app/data-accessor/models/lvl0-character';
import {Lvl0ActorData} from './src/models/actor';
import {
    ConfiguredDocumentClass,
    ConfiguredObjectClassForName
} from '@league-of-foundry-developers/foundry-vtt-types/src/types/helperTypes';

declare global {
    type RecursivePartial<T> = {
        [P in keyof T]?: RecursivePartial<T[P]>;
    };

    class Actor extends ClientDocumentMixin(foundry.documents.BaseActor) {
        game: InitializedGame;
        type: Lvl0ActorData['type'];
        system: Lvl0ActorData['system'];
        get isToken(): boolean;
        get token(): InstanceType<ConfiguredDocumentClass<typeof foundry.documents.BaseToken>> | null;
        get thumbnail(): this["data"]["img"];
        get img(): this["data"]["img"];
        get itemTypes(): Record<
            foundry.documents.BaseItem["data"]["type"],
            Array<InstanceType<ConfiguredDocumentClass<typeof foundry.documents.BaseItem>>>
        >
        getActiveTokens(
            linked: boolean,
            document: true,
        ): InstanceType<ConfiguredDocumentClass<typeof foundry.documents.BaseToken>>[];
        getActiveTokens(linked?: boolean, document?: false): InstanceType<ConfiguredObjectClassForName<"Token">>[];
        getActiveTokens(
            linked: boolean,
            document: boolean,
        ):
            | InstanceType<ConfiguredObjectClassForName<"Token">>[]
            | InstanceType<ConfiguredDocumentClass<typeof foundry.documents.BaseToken>>[];
        getTokenImages(): Promise<string[]>;

    }

    class Item extends ClientDocumentMixin(foundry.documents.BaseItem) {
        get isEmbedded(): boolean;
        get actor(): this["parent"];
        get img(): this["data"]["img"];
        get thumbnail(): this["data"]["img"];
        get isOwned(): this["isEmbedded"];
        get transferredEffects(): ReturnType<this["effects"]["filter"]>;
        getRollData(): object;
        type: Lvl0ItemData['type']
        system: Lvl0ItemData['system']
    }

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

}
