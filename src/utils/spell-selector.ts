import {inject, singleton} from 'tsyringe';
import {DialogAwaiter, SpellCastAction, SpellSelectorDialog} from "../ui/dialog";
import {ActorSpell, SpellManager} from "managers/spell";
import {SpellClass} from 'repositories';

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

        return await this.dialogAwaiter.openAndWaitResult(SpellSelectorDialog, {
            spells: spellActors,
            actor: token.actor
        });
    }
}
