import "reflect-metadata";

import './error-monitoring';
import {container} from "tsyringe";
import './handlebars_helpers';
import {InitializedGame} from './models/misc/game';
import {Lvl0Actor} from './models/actor';
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
  CONFIG.Actor.documentClass = Lvl0Actor;
  CONFIG.Item.documentClass = Lvl0FoundryItem;

  await loadTemplates([
    "systems/lvl0mf-sheet/ui/sheets/actor/partials/equipment.hbs",
    "systems/lvl0mf-sheet/ui/sheets/actor/partials/skills.hbs",
    "systems/lvl0mf-sheet/ui/sheets/actor/partials/inventory.hbs",
    "systems/lvl0mf-sheet/ui/sheets/actor/partials/modifiers.hbs",
  ]);

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
  // canvas?.tokens?.get('ksI0ie2fQHaZADrN')?.actor?.items!.get('IEmnMakdAf4UNxGm').sheet?.render(true)

});
declare global {
    interface LenientGlobalVariableTypes {
        game: never; // the type doesn't matter
    }
}

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

