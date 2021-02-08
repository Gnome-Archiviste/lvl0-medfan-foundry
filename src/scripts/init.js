import {Lvl0mfActorSheet} from "../modules/lvl0mf-actor-sheet.js";
import {Lvl0mfItemSheet} from "../modules/lvl0mf-item-sheet.js";
import {Lvl0Actor} from "../modules/lvl0-actor.js";
import {Lvl0Item} from "../modules/lvl0-item.js";

CONFIG.Actor.entityClass = Lvl0Actor;
CONFIG.Item.entityClass = Lvl0Item;

Hooks.once("init", async function () {
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("lvl0mf", Lvl0mfActorSheet, {makeDefault: true});
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("lvl0mf", Lvl0mfItemSheet, {makeDefault: true});
});


Hooks.once("ready", async function () {
    // FOR DEBUG
    await ui.sidebar.activateTab('items');
    CONFIG.debug.hooks = true
});
