import './error-monitoring';
import "reflect-metadata";
import {container} from "tsyringe";
import './handlebars_helpers';
import {InitializedGame} from './models/misc/game';
import {Lvl0Actor} from './models/actor';
import {Lvl0Item} from './models/item';
import {Lvl0CharacterActorSheet} from './ui/sheets/actor/lvl0-character-actor-sheet';
import {Lvl0ItemSheet} from './ui/sheets/item/lvl0-item-sheet';
import {RollSkillManager} from './managers/skill';
import {RollSpecialityManager} from './managers/speciality';

declare global {
    const rollSkillManager: RollSkillManager;
    const rollSpecialityManager: RollSpecialityManager;
}

Hooks.once("init", async function () {
    CONFIG.Actor.documentClass = Lvl0Actor;
    CONFIG.Item.documentClass = Lvl0Item;

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
    await ui.sidebar?.activateTab('items');
});

declare global {
    interface LenientGlobalVariableTypes {
        game: never; // the type doesn't matter
    }
}

Hooks.once('diceSoNiceReady', (dice3d: Dice3d) => {
    container.resolve(RollSpecialityManager).registerDiceSoNiceColors(dice3d);
});

