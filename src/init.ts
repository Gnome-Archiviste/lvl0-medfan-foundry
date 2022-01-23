import './error-monitoring';
import "reflect-metadata";
import {container} from "tsyringe";
import './handlebars_helpers';
import {Lvl0Actor} from './models/actor/lvl0-actor';
import {Lvl0Item} from './models/item/lvl0-item';
import {RollSkillManager} from './managers/skill/roll-skill-manager';
import {Lvl0CharacterActorSheet} from './ui/sheets/actor/lvl0-character-actor-sheet';
import {Lvl0ItemSheet} from './ui/sheets/item/lvl0-item-sheet';
import {RollSpecialityManager} from './managers/speciality/roll-speciality-manager';
import {InitializedGame} from './models/misc/game';

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
    Actors.registerSheet("lvl0mf", Lvl0CharacterActorSheet, {types: ['character']});
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("lvl0mf", Lvl0ItemSheet, {makeDefault: true});

    container.register<InitializedGame>(InitializedGame, {useValue: game as InitializedGame});
});

Hooks.once("ready", async function () {
    (window as any).rollSkillManager = container.resolve(RollSkillManager);
    (window as any).rollSpecialityManager = container.resolve(RollSpecialityManager);
});

declare global {
    interface LenientGlobalVariableTypes {
        game: never; // the type doesn't matter
    }
}

Hooks.once('diceSoNiceReady', (dice3d: Dice3d) => {
    container.resolve(RollSpecialityManager).registerDiceSoNiceColors(dice3d);
});

