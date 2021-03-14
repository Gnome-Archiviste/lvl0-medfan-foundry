import {Lvl0mfActorSheet} from "../modules/lvl0mf-actor-sheet.js";
import {Lvl0mfItemSheet} from "../modules/lvl0mf-item-sheet.js";
import {Lvl0Actor} from "../modules/lvl0-actor.js";
import {Lvl0Item} from "../modules/lvl0-item.js";
import {RollSkillManager} from "../modules/managers/roll-skill-manager.js";

CONFIG.Actor.entityClass = Lvl0Actor;
CONFIG.Item.entityClass = Lvl0Item;

Hooks.once("init", async function () {
    await loadTemplates([
        "systems/lvl0mf-sheet/templates/actors/partials/equipment.hbs",
        "systems/lvl0mf-sheet/templates/actors/partials/skills.hbs",
        "systems/lvl0mf-sheet/templates/actors/partials/inventory.hbs",
    ]);

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("lvl0mf", Lvl0mfActorSheet, {makeDefault: true});
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("lvl0mf", Lvl0mfItemSheet, {makeDefault: true});
});

window.rollSkillManager = RollSkillManager;

Hooks.once("ready", async function () {
    // FOR DEBUG
    if (game.user.isGM) {
        await ui.sidebar.activateTab('actors');
        CONFIG.debug.hooks = true
    }
});
