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
import {RollSpecialityManager} from './managers/speciality';


import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';

declare global {
  const rollSkillManager: RollSkillManager;
  const rollSpecialityManager: RollSpecialityManager;
}

Hooks.once("init", async function () {
  CONFIG.Actor.documentClass = Lvl0FoundryActor;
  CONFIG.Item.documentClass = Lvl0FoundryItem;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("lvl0mf", Lvl0CharacterActorSheet, {types: ['character'], label: 'Character'});
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("lvl0mf", Lvl0ItemSheet, {makeDefault: true, label: 'Objet'});

  container.register<InitializedGame>(InitializedGame, {useValue: game as InitializedGame});
});

Hooks.once("ready", async function () {
  (window as any).rollSkillManager = container.resolve(RollSkillManager);
  (window as any).rollSpecialityManager = container.resolve(RollSpecialityManager);

  // DEBUG do not commit
  // game.items!.get("IaD00I10zZJL4c9S").sheet?.render(true)
  // game.items!.find(i => i.type === 'weapon').sheet?.render(true)
  //game.actors!.get('29muKc1C0kokkhGw')!.sheet?.render(true)
  game.actors!.find(i => i.data.name.endsWith('Active'))?.sheet?.render(true)
  // canvas?.tokens?.get('ksI0ie2fQHaZADrN')?.actor?.items!.get('IEmnMakdAf4UNxGm').sheet?.render(true)
    // CONFIG.debug.hooks = true;

});
declare global {
    interface LenientGlobalVariableTypes {
        game: never; // the type doesn't matter
    }
}

/* Will use when rework skill messages
Hooks.on("renderChatMessage", (message: ChatMessage, html: JQuery, data) => {
    let customElement = message.getFlag('lvl0mf-sheet', 'lvl0CustomElement') as any;
    if (customElement?.name && customElement?.params) {
        let element = document.createElement(customElement.name);
        for (let [key, value] of Object.entries(customElement.params)) {
            element.setAttribute(key, (value as any).toString())
        }
        html.find('.message-content').html(element)
    }
});*/

Hooks.once('diceSoNiceReady', (dice3d: Dice3d) => {
  container.resolve(RollSpecialityManager).registerDiceSoNiceColors(dice3d);
});

import 'zone.js';
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

import './components'

import {environment} from './environments/environment';

if (environment.liveServer) {
    let webSocket = new WebSocket(environment.liveServer);
    webSocket.onopen = (event) => {
        console.log('Connected to live server!');
    }

    webSocket.onmessage = (event) => {
        console.log(event);
        if (event.data ===  'reload') {
            window.location.reload();

        }
    }
}

