import {Lvl0mfActorSheet} from "../modules/lvl0mf-actor-sheet.js";
import {Lvl0mfItemSheet} from "../modules/lvl0mf-item-sheet.js";
import {Lvl0Actor} from "../modules/lvl0-actor.js";
import {Lvl0Item} from "../modules/lvl0-item.js";
import {RollSkillManager} from "../modules/managers/roll-skill-manager.js";
import {RollSpecialityManager} from "../modules/managers/roll-speciality-manager.js";
import './handlebars_helpers';

Hooks.once("init", async function () {
    CONFIG.Actor.documentClass = Lvl0Actor;
    CONFIG.Item.documentClass = Lvl0Item;

    await loadTemplates([
        "systems/lvl0mf-sheet/templates/actors/partials/equipment.hbs",
        "systems/lvl0mf-sheet/templates/actors/partials/skills.hbs",
        "systems/lvl0mf-sheet/templates/actors/partials/inventory.hbs",
        "systems/lvl0mf-sheet/templates/actors/partials/modifiers.hbs",
    ]);

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("lvl0mf", Lvl0mfActorSheet, {types: ['character']});
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("lvl0mf", Lvl0mfItemSheet, {makeDefault: true});
});

(window as any).rollSkillManager = RollSkillManager;
(window as any).rollSpecialityManager = RollSpecialityManager;


declare global {
    const rollSkillManager: RollSkillManager;
    const rollSpecialityManager: RollSpecialityManager;
}

Hooks.once("ready", async function () {
    // FOR DEBUG
    if (game.user?.isGM) {
        // await ui.sidebar.activateTab('actors');
        // CONFIG.debug.hooks = true
    }
});


declare global {
    interface LenientGlobalVariableTypes {
        game: never; // the type doesn't matter
    }
}
