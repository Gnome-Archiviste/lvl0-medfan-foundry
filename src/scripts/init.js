import {Lvl0mfActorSheet} from "../modules/lvl0mf-actor-sheet.js";
import {Lvl0Actor} from "../modules/lvl0-actor.js";

CONFIG.Actor.entityClass = Lvl0Actor;

Hooks.once("init", async function () {
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("lvl0mf", Lvl0mfActorSheet, {makeDefault: true});

});


Hooks.once("ready", async function () {
    // FOR DEBUG
    await ui.sidebar.activateTab('actors');
    CONFIG.debug.hooks=true


});
