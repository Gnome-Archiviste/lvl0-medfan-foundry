import "reflect-metadata";

import './error-monitoring';
import {container} from "tsyringe";
import './handlebars_helpers';
import {InitializedGame} from './models/misc/game';
import {Lvl0FoundryActor} from './models/actor';
import {Lvl0FoundryItem} from './models/item';
import {Lvl0CharacterActorSheet} from './ui/sheets/actor/lvl0-character-actor-sheet';
import {Lvl0ItemSheet} from './ui/sheets/item/lvl0-item-sheet';
import {RollSkillManager} from './managers/skill';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import 'zone.js';
import './components'
import {environment} from './environments/environment';
import {FoundrySpecialityService} from './app/foundry/foundry-speciality.service';
import {ActorEffectService} from './app/data-accessor/actor-effect.service';


Hooks.once("init", async function () {
    CONFIG.Actor.documentClass = Lvl0FoundryActor;
    CONFIG.Item.documentClass = Lvl0FoundryItem;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("lvl0mf", Lvl0CharacterActorSheet, {types: ['character'], label: 'Character'});
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("lvl0mf", Lvl0ItemSheet, {makeDefault: true, label: 'Objet'});

    container.register<InitializedGame>(InitializedGame, {useValue: game as InitializedGame});
});

declare global {
    interface LenientGlobalVariableTypes {
        game: never; // the type doesn't matter
    }
}

Hooks.on("renderChatMessage", (message: ChatMessage, html: JQuery, _data: any) => {
    let customElement = message.getFlag('lvl0mf-sheet', 'lvl0ChatMessage') as {
        type: string;
        data: any;
    };

    if (customElement?.type) {
        let element = document.createElement('lvl0-chat-message');
        element.setAttribute('type', customElement.type);
        element.setAttribute('raw-data', JSON.stringify(customElement?.data))
        html.find('.message-content').html(element)
    }
});

let bootstrapAppModulePromise = platformBrowserDynamic().bootstrapModule(AppModule)

Hooks.once("ready", async () => {
    try {
        const bootstrapAppModule = await bootstrapAppModulePromise;

        // bootstrapAppModule.instance...
        // FIXME: replace with
        (window as any).rollSkillManager = container.resolve(RollSkillManager);
        (window as any).rollSpecialityManager = bootstrapAppModule.instance.specialityService;
        (window as any).actorEffectService = bootstrapAppModule.instance.actorEffectService;

        // DEBUG do not commit
        // game.items!.get("IaD00I10zZJL4c9S").sheet?.render(true)
        // game.items!.find(i => i.type === 'weapon').sheet?.render(true)
        //game.actors!.get('29muKc1C0kokkhGw')!.sheet?.render(true)
        game.actors!.find(i => i.data.name.endsWith('Active'))?.sheet?.render(true)
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

