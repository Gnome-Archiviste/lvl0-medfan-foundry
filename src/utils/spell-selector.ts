import {SpellCastAction, SpellSelectorDialog} from "../ui/dialog/spell-selector-dialog.js";
import {SpellManager} from "../managers/spell/spell-manager";
import {ActorSpell} from '../managers/spell/spell-definition.model';
import {DialogAwaiter} from './dialog-awaiter';

export class SpellSelector {
    static async selectSpell(token: Token, spellCategory: 'mage' | 'champion'): Promise<{ spell: ActorSpell, action: SpellCastAction } | undefined> {
        if (!token.actor) {
            throw new Error('No actor associated with the token: ' + token);
        }

        let spellActors = await SpellManager.getAvailableSpells(token.actor, spellCategory);
        if (spellActors.length === 0) {
            ui.notifications?.error('Aucun sort disponible');
            return undefined;
        }

        return await DialogAwaiter.openAndWaitResult(SpellSelectorDialog, {spells: spellActors, actor: token.actor!});
    }
}
