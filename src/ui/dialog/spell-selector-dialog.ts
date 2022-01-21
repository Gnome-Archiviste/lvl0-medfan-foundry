import {ActorSpell} from '../../managers/spell/actor-spell.model';
import {DialogBase} from './dialog-base';
import ClickEvent = JQuery.ClickEvent;
import {Lvl0Actor} from '../../models/actor/lvl0-actor';
import {Lvl0ItemWand} from '../../models/item/lvl0-item-types';

export interface SpellSelectorDialogData {
    spells: ActorSpell[];
    actor: Lvl0Actor;
}

export type SpellCastAction = 'fillWand' | 'createScroll' | 'cast';

export class SpellSelectorDialog extends DialogBase<SpellSelectorDialogData, {spell: ActorSpell, action: SpellCastAction}> {
    override getData(options?: Partial<Application.Options>): object | Promise<object> {
        let data = super.getData(options);
        let spellPerLevels = this.dialogData.spells.reduce((previousValue, spell) => {
            if (!(spell.cost in previousValue))
                previousValue[spell.cost] = [];
            previousValue[spell.cost].push(spell);
            return previousValue;
        }, {});

        let spellInNonFullWand = {};
        let emptyWandAvailable = false;
        // FIXME: Remove https://github.com/League-of-Foundry-Developers/foundry-vtt-types/issues/1551
        let wands = this.dialogData.actor.itemTypes['wand'].map(w => w as Lvl0ItemWand);
        if (wands) {
            for (let wand of wands) {
                if (!wand.data.data.spell) {
                    emptyWandAvailable = true;
                    break;
                }
                if (wand.data.data.charge < 10) {
                    spellInNonFullWand[wand.data.data.spell] = true;
                }
            }
        }

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
                    let macro = await Macro.create({
                        name: spell.name,
                        type: "script",
                        img: spell.icon,
                        scope: "actor",
                        command: `rollSkillManager.rollSkill(token, '${skillId}', {spellId: '${spellId}'})`
                    });
                    if (!macro) {
                        ui.notifications?.error('Failed to create macro')
                        throw new Error('Failed to create macro');
                    }
                    await game.user?.assignHotbarMacro(macro, '');
                    await this.close();
                    break;
                }
            }
        });
    }

    static get defaultOptions(): Application.Options {
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
