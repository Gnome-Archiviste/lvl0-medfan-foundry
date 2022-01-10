import {SpellSelectorDialog} from "../ui/spell-selector-dialog.js";
import {SpellManager} from "../managers/spell/spell-manager";
import {ActorSpell} from '../managers/spell/spell-definition.model';

export class SpellSelector {
    static selectSpell(token: Token, spellCategory: 'mage' | 'champion'): Promise<ActorSpell | undefined> {
        return new Promise(async (resolve) => {
            let spellActors = await SpellManager.getAvailableSpells(token.actor, spellCategory);
            if (spellActors.length === 0) {
                ui.notifications?.error('Aucun sort disponible');
                return 0;
            }

            let spellSelectorDialog = new SpellSelectorDialog({spells: spellActors}, async (spell) => {
                resolve(spell);
            });
            spellSelectorDialog.render(true);
        });
    }
}
