import {Level0ActorSheet} from "../modules/level0-actor-sheet.js";

Hooks.once("init", async function () {
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("naheulbook", Level0ActorSheet, {makeDefault: true});
});
