import {SpellCastAction, SpellSelectorDialog} from "../ui/dialog/spell-selector-dialog.js";
import {SpellManager} from "../managers/spell/spell-manager";
import {ActorSpell} from '../managers/spell/spell-definition.model';

export class SpellSelector {
    static selectSpell(token: Token, spellCategory: 'mage' | 'champion'): Promise<{spell: ActorSpell, action: SpellCastAction} | undefined> {
        return new Promise(async (resolve) => {
            let spellActors = await SpellManager.getAvailableSpells(token.actor, spellCategory);
            if (spellActors.length === 0) {
                ui.notifications?.error('Aucun sort disponible');
                return 0;
            }

            let spellSelectorDialog = new SpellSelectorDialog({spells: spellActors, actor: token.actor!},
                async (spell, action) => {
                    if (spell && action)
                        resolve({spell, action});
                    resolve(undefined);
                });
            spellSelectorDialog.render(true);
        });
    }
}
