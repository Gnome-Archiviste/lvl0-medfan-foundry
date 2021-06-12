import {SpellSelectorDialog} from "../ui/spell-selector-dialog.js";
import {SpellManager} from "../managers/spell-manager.js";

export class SpellSelector {

    /**
     * @param {Token} token
     * @param {'mage'|'champion'} spellCategory
     * @return Promise<Spell>
     */
    static selectSpell(token, spellCategory) {
        return new Promise(async (resolve) => {
            let spellActors = await SpellManager.getAvailableSpells(token.actor, spellCategory);
            if (spellActors.length === 0) {
                ui.notifications.error('Aucun sort disponible');
                return 0;
            }

            let spellSelectorDialog = new SpellSelectorDialog({spells: spellActors}, async (spell) => {
                resolve(spell);
            });
            spellSelectorDialog.render(true);
        });
    }
}
