import {SpellCastAction, SpellSelectorDialog} from "../ui/dialog/spell-selector-dialog";
import {SpellManager} from "../managers/spell/spell-manager";
import {ActorSpell} from '../managers/spell/actor-spell.model';
import {DialogAwaiter} from './dialog-awaiter';
import {SpellClass} from '../repositories/data/jobs';
import {inject, singleton} from 'tsyringe';

@singleton()
export class SpellSelector {
    constructor(
        @inject(SpellManager) private spellManager: SpellManager,
        @inject(DialogAwaiter) private dialogAwaiter: DialogAwaiter,
    ) {
    }

    async selectSpell(token: Token, spellClass: SpellClass): Promise<{ spell: ActorSpell, action: SpellCastAction } | undefined> {
        if (!token.actor) {
            throw new Error('No actor associated with the token: ' + token);
        }

        let spellActors = await this.spellManager.getAvailableSpells(token.actor, spellClass);
        if (spellActors.length === 0) {
            ui.notifications?.error('Aucun sort disponible');
            return undefined;
        }

        return await this.dialogAwaiter.openAndWaitResult(SpellSelectorDialog, {spells: spellActors, actor: token.actor});
    }
}
