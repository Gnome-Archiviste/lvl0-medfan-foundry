import './error-monitoring';
import './handlebars_helpers';
import {Lvl0FoundryActor, Lvl0FoundryCharacterSystemData} from './models/actor';
import {Lvl0FoundryItem} from './models/item';
import {Lvl0CharacterActorSheet} from './ui/sheets/actor/lvl0-character-actor-sheet';
import {Lvl0ItemSheet} from './ui/sheets/item/lvl0-item-sheet';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import 'zone.js';
import {environment} from './environments/environment';
import {
    Lvl0FoundryItemAmmunition,
    Lvl0FoundryItemArmor,
    Lvl0FoundryItemBag,
    Lvl0FoundryItemBelt,
    Lvl0FoundryItemCloak,
    Lvl0FoundryItemFoot,
    Lvl0FoundryItemHand,
    Lvl0FoundryItemHead,
    Lvl0FoundryItemMagical,
    Lvl0FoundryItemMisc,
    Lvl0FoundryItemNecklace,
    Lvl0FoundryItemPotions,
    Lvl0FoundryItemPurse,
    Lvl0FoundryItemRing,
    Lvl0FoundryItemShield,
    Lvl0FoundryItemWand,
    Lvl0FoundryItemScroll,
    Lvl0FoundryItemHandWeapon,
    Lvl0FoundryItemWeapon,
} from './models/item/schemas';
import {SYSTEM_NAME} from './constants';

Hooks.once("init", async function () {
    console.log(`${SYSTEM_NAME} | Initializing ${SYSTEM_NAME}`);

    CONFIG.Actor.documentClass = Lvl0FoundryActor;
    CONFIG.Item.documentClass = Lvl0FoundryItem;

    CONFIG.Actor.dataModels["character"] = Lvl0FoundryCharacterSystemData

    CONFIG.Item.dataModels["ammunition"] = Lvl0FoundryItemAmmunition;
    CONFIG.Item.dataModels["armor"] = Lvl0FoundryItemArmor;
    CONFIG.Item.dataModels["bag"] = Lvl0FoundryItemBag;
    CONFIG.Item.dataModels["belt"] = Lvl0FoundryItemBelt;
    CONFIG.Item.dataModels["cloak"] = Lvl0FoundryItemCloak;
    CONFIG.Item.dataModels["foot"] = Lvl0FoundryItemFoot;
    CONFIG.Item.dataModels["hand"] = Lvl0FoundryItemHand;
    CONFIG.Item.dataModels["head"] = Lvl0FoundryItemHead;
    CONFIG.Item.dataModels["magical"] = Lvl0FoundryItemMagical;
    CONFIG.Item.dataModels["misc"] = Lvl0FoundryItemMisc;
    CONFIG.Item.dataModels["necklace"] = Lvl0FoundryItemNecklace;
    CONFIG.Item.dataModels["potions"] = Lvl0FoundryItemPotions;
    CONFIG.Item.dataModels["purse"] = Lvl0FoundryItemPurse;
    CONFIG.Item.dataModels["ring"] = Lvl0FoundryItemRing;
    CONFIG.Item.dataModels["shield"] = Lvl0FoundryItemShield;
    CONFIG.Item.dataModels["wand"] = Lvl0FoundryItemWand;
    CONFIG.Item.dataModels["scroll"] = Lvl0FoundryItemScroll;
    CONFIG.Item.dataModels["handWeapon"] = Lvl0FoundryItemHandWeapon;
    CONFIG.Item.dataModels["weapon"] = Lvl0FoundryItemWeapon;

    foundry.documents.collections.Actors.unregisterSheet('core', foundry.applications.sheets.ActorSheetV2);
    foundry.documents.collections.Actors.registerSheet(SYSTEM_NAME, Lvl0CharacterActorSheet, {
        label: "Character",
        makeDefault: true,
        types: ['character']
    });

    foundry.documents.collections.Items.unregisterSheet('core', foundry.applications.sheets.ItemSheetV2);
    foundry.documents.collections.Items.registerSheet(SYSTEM_NAME, Lvl0ItemSheet, {
        label: "SR5.SheetItem",
        makeDefault: true
    });
});

Hooks.on("renderChatMessageHTML", (message: ChatMessage, parent: HTMLElement, _data: any) => {
    let customElement = message.getFlag('lvl0mf-sheet', 'lvl0ChatMessage') as {
        type: string;
        data: any;
    };

    if (customElement?.type) {
        let element = document.createElement('lvl0-chat-message');
        element.setAttribute('type', customElement.type);
        element.setAttribute('chat-message-id', message.id!);
        element.setAttribute('raw-data', JSON.stringify(customElement?.data))
        parent.innerHTML = element.outerHTML;
    }
});

let bootstrapAppModulePromise = platformBrowserDynamic().bootstrapModule(AppModule)

Hooks.once("ready", async () => {
    try {
        const bootstrapAppModule = await bootstrapAppModulePromise;

        (window as any).rollSkillManager = {
            rollSkill: async (token: Token | undefined, skillId: string, options = {}): Promise<void> => {
                if (!token?.actor) {
                    ui.notifications?.warn('Sélectionnez un token pour effectuer cette action');
                    return;
                }
                let actorId = token?.actor!.lvl0Id;
                if (!actorId) {
                    ui.notifications?.error('Error: Invalid lvl0Id');
                    return;
                }
                await bootstrapAppModule.instance.skillService.rollActorSkill(actorId, skillId, options);
            }
        };
        (window as any).rollSpecialityManager = bootstrapAppModule.instance.specialityService; // Keep it (used in macro)

        // DEBUG do not commit
        // game.items!.get("pMk7473zwHSZNFAU").sheet?.render(true)
        // game.items!.find(i => i.type === 'weapon').sheet?.render(true)
        //game.actors!.get('29muKc1C0kokkhGw')!.sheet?.render(true)
        // game.actors!.find((i: any) => i.name.endsWith('Active'))?.sheet?.render(true)
        // game.items!.find(i => i.name === 'Cristal d\'améthyste')?.sheet?.render(true)
        // canvas?.tokens?.get('ksI0ie2fQHaZADrN')?.actor?.items!.get('IEmnMakdAf4UNxGm').sheet?.render(true)
        // CONFIG.debug.hooks = true;

    } catch (e) {
        console.error(e);
    }
});


if (environment.liveServer) {
    let webSocket = new WebSocket(environment.liveServer);
    webSocket.onopen = (event) => {
        console.log('Connected to live server!');
    }

    webSocket.onmessage = (event) => {
        console.log(event);
        if (event.data === 'reload') {
            window.location.reload();
        }
    }
}

