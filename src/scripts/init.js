import {Lvl0mfActorSheet} from "../modules/lvl0mf-actor-sheet.js";

Hooks.once("init", async function () {
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("lvl0mf", Lvl0mfActorSheet, {makeDefault: true});
});
