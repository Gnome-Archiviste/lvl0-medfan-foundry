import {SpellCastAction, SpellSelectorDialog} from "../ui/dialog/spell-selector-dialog";
import {SpellManager} from "../managers/spell/spell-manager";
import {ActorSpell} from '../managers/spell/spell-definition.model';
import {DialogAwaiter} from './dialog-awaiter';
import {SpellClass} from '../repositories/data/jobs';

export class SpellSelector {
    static async selectSpell(token: Token, spellClass: SpellClass): Promise<{ spell: ActorSpell, action: SpellCastAction } | undefined> {
        if (!token.actor) {
            throw new Error('No actor associated with the token: ' + token);
        }

        let spellActors = await SpellManager.getAvailableSpells(token.actor, spellClass);
        if (spellActors.length === 0) {
            ui.notifications?.error('Aucun sort disponible');
            return undefined;
        }

        return await DialogAwaiter.openAndWaitResult(SpellSelectorDialog, {spells: spellActors, actor: token.actor!});
    }
}
