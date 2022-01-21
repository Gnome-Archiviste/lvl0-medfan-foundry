import './handlebars_helpers';
import {Lvl0Actor} from './models/actor/lvl0-actor';
import {Lvl0Item} from './models/item/lvl0-item';
import {RollSkillManager} from './managers/skill/roll-skill-manager';
import {Lvl0CharacterActorSheet} from './ui/sheets/actor/lvl0-character-actor-sheet';
import {Lvl0ItemSheet} from './ui/sheets/item/lvl0-item-sheet';
import {RollSpecialityManager} from './managers/speciality/roll-speciality-manager';

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
