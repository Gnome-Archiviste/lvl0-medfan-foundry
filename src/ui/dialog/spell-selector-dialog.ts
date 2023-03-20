import {inject, injectable} from 'tsyringe';
import {ActorSpell, WandUtil} from 'managers/spell';
import {DialogBase, DialogResultCallback} from './dialog-base';
import {Lvl0Actor} from 'models/actor';
import {InitializedGame} from 'models/misc/game';
import {MacroUtil} from 'utils/macro-util';
import {SpellClass} from '../../repositories';

export interface SpellSelectorDialogData {
    spells: ActorSpell[];
    actor: Lvl0Actor;
    spellClass: SpellClass;
}

export type SpellCastAction = 'fillWand' | 'createScroll' | 'cast';

@injectable()
export class SpellSelectorDialog extends DialogBase<SpellSelectorDialogData, { spell: ActorSpell, action: SpellCastAction }> {

    constructor(
        @inject("DIALOG_DATA") dialogData: SpellSelectorDialogData,
        @inject("DIALOG_RESULT") result: DialogResultCallback<{ spell: ActorSpell; action: SpellCastAction }>,
        @inject(MacroUtil) private readonly macroUtil: MacroUtil,
        @inject(InitializedGame) private readonly game: InitializedGame,
    ) {
        super(dialogData, result);
    }

    override getData(options?: Partial<ApplicationOptions>): object | Promise<object> {
        let data = super.getData(options);

        return {
            ...data,
            actorId: this.dialogData.actor.lvl0Id,
            spellClass: this.dialogData.spellClass,
        };
    }


    protected getResult(): { spell: ActorSpell; action: SpellCastAction } | undefined {
        return undefined;
    }

    override activateListeners(html: JQuery) {
        super.activateListeners(html);

        html.find('#spell-selector')[0].addEventListener('castSpell', async (ev: CustomEvent<string>) => {
            let spellId = ev.detail;
            let spell = this.dialogData.spells.find(s => s.id === spellId);
            if (spell) {
                this.result({spell: spell, action: 'cast'});
                await this.close({selected: true});
            }
        });
        html.find('#spell-selector')[0].addEventListener('fillWand', async (ev: CustomEvent<string>) => {
            let spellId = ev.detail;
            let spell = this.dialogData.spells.find(s => s.id === spellId);
            if (spell) {
                this.result({spell: spell, action: 'fillWand'});
                await this.close({selected: true});
            }
        });
        html.find('#spell-selector')[0].addEventListener('createScroll', async (ev: CustomEvent<string>) => {
            let spellId = ev.detail;
            let spell = this.dialogData.spells.find(s => s.id === spellId);
            if (spell) {
                this.result({spell: spell, action: 'createScroll'});
                await this.close({selected: true});
            }
        });
        html.find('#spell-selector')[0].addEventListener('addMacro', async (ev: CustomEvent<string>) => {
            let spellId = ev.detail;
            let spell = this.dialogData.spells.find(s => s.id === spellId);
            if (!spell)
                throw new Error("Spell not found: " + spellId);
            let skillId = spell.id.startsWith('champion') ? 'champion.spellcasting' : 'mage.spell_casting';
            await this.macroUtil.createAndAssignMacroToFirstAvailableSlot({
                name: spell.name,
                type: "script",
                img: spell.icon,
                scope: "actor",
                command: this.macroUtil.guardScriptExecutionWithTokenCheck(`rollSkillManager.rollSkill(token, '${skillId}', {spellId: '${spellId}'})`)
            });
            await this.close();
        });
    }

    static get defaultOptions(): ApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "spellSelector",
            title: "Selection du sort",
            template: "systems/lvl0mf-sheet/ui/dialog/spell-selector-dialog.hbs",
            popOut: true,
            width: 500,
            height: 600
        };
    }
}
