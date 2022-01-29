import {inject, injectable} from 'tsyringe';
import {ActorSpell, WandUtil} from 'managers/spell';
import {DialogBase, DialogResultCallback} from './dialog-base';
import {Lvl0Actor} from 'models/actor';
import {InitializedGame} from 'models/misc/game';
import {MacroUtil} from 'utils/macro-util';
import ClickEvent = JQuery.ClickEvent;

export interface SpellSelectorDialogData {
    spells: ActorSpell[];
    actor: Lvl0Actor;
}

export type SpellCastAction = 'fillWand' | 'createScroll' | 'cast';

@injectable()
export class SpellSelectorDialog extends DialogBase<SpellSelectorDialogData, { spell: ActorSpell, action: SpellCastAction }> {

    constructor(
        @inject("DIALOG_DATA") dialogData: SpellSelectorDialogData,
        @inject("DIALOG_RESULT") result: DialogResultCallback<{ spell: ActorSpell; action: SpellCastAction }>,
        @inject(MacroUtil) private readonly macroUtil: MacroUtil,
        @inject(InitializedGame) private readonly game: InitializedGame,
        @inject(WandUtil) private readonly wandUtil: WandUtil,
    ) {
        super(dialogData, result);
    }

    override getData(options?: Partial<ApplicationOptions>): object | Promise<object> {
        let data = super.getData(options);
        let spellPerLevels = this.dialogData.spells.reduce((previousValue, spell) => {
            if (!(spell.cost in previousValue))
                previousValue[spell.cost] = [];
            previousValue[spell.cost].push(spell);
            return previousValue;
        }, {});

        let [spellInNonFullWand, emptyWandAvailable] = this.wandUtil.getNonFullWands(this.dialogData.actor);
        let emptyScrollAvailable = this.dialogData.actor.getFirstEmptyScroll() !== undefined;

        return {
            ...data,
            spells: this.dialogData.spells,
            levels: Object.keys(spellPerLevels),
            spellPerLevels: spellPerLevels,
            emptyWandAvailable,
            spellInNonFullWand,
            emptyScrollAvailable
        };
    }


    protected getResult(): { spell: ActorSpell; action: SpellCastAction } | undefined {
        return undefined;
    }

    override activateListeners(html: JQuery) {
        super.activateListeners(html);

        html.find('[data-action]').on('click', async (ev: ClickEvent) => {
            switch (ev.target.dataset["action"]) {
                case 'fillWand':
                case 'createScroll':
                case 'cast': {
                    let spellId = ev.target.dataset['spellId'];
                    let spell = this.dialogData.spells.find(s => s.id === spellId);
                    if (spell) {
                        this.result({spell: spell, action: ev.target.dataset["action"]});
                        await this.close({selected: true});
                    }
                    break;
                }
                case 'addMacro': {
                    let spellId = ev.target.dataset['spellId'];
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
                    break;
                }
            }
        });
    }

    static get defaultOptions(): ApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "spellSelector",
            title: "Selection du sort",
            template: "systems/lvl0mf-sheet/ui/dialog/spell-selector-dialog.hbs",
            popOut: true,
            tabs: [{navSelector: ".tabs", contentSelector: ".spells", initial: "1"}],
            width: 500,
            height: 600
        };
    }
}

Handlebars.registerHelper('spellSelectorStat', (name, value) => {
    if (!value)
        return '';
    if (typeof value === 'string')
        return new Handlebars.SafeString(`<div class="${name}"><span class="label">${game.i18n.localize('LVL0MF.Spell.Label.' + name)}</span>&nbsp;${value}</div>`);
    if (typeof value === 'object' && 'toDisplayDefinitionString' in value)
        return new Handlebars.SafeString(`<div class="${name}">
            <span class="label"><i class="fas fa-dice"></i> ${game.i18n.localize('LVL0MF.Spell.Label.' + name)}</span>&nbsp;${value.toDisplayDefinitionString()}
        </div>`);
    console.error(value);
    return new Handlebars.SafeString(`<div class="${name}"><span class="label">${game.i18n.localize('LVL0MF.Spell.Label.' + name)}</span>&nbsp;ERROR</div>`);
})
