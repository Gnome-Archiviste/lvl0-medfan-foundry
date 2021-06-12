import {RolledSpellStat} from "../managers/spell-manager.js";

/**
 * @typedef SpellSelectorDialogData
 * @property {ActorSpell[]} spells
 */

/**
 * @callback CompleteSpellSelectorCallback
 * @param {ActorSpell|undefined} selectedSpell
 */

export class SpellSelectorDialog extends Application {
    /**
     * @param {SpellSelectorDialogData} data
     * @param {CompleteSpellSelectorCallback} onComplete
     */
    constructor(data, onComplete) {
        super();

        this.data = data;
        this.onComplete = onComplete;
    }

    /** @override */
    getData(options = {}) {
        let data = super.getData(options);

        return {
            ...data,
            spells: this.data.spells
        };
    }

    /** @override */
    get title() {
        return "Selection du sort";
    }

    async close(options = {}) {
        if (!options.selected) {
            this.onComplete(undefined);
        }
        return super.close(options);
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        html.find('[data-action]').click(ev => {
            switch (ev.target.dataset["action"]) {
                case 'cancel': {
                    this.close();
                    break;
                }
                case 'confirm': {
                    let spellId = ev.target.dataset['spellId'];
                    let spell = this.data.spells.find(s => s.id === spellId);
                    this.onComplete(spell);
                    this.close({selected: true});
                    break;
                }
                case 'addMacro': {
                    let spellId = ev.target.dataset['spellId'];
                    let spell = this.data.spells.find(s => s.id === spellId);
                    let skillId = spell.id.startsWith('champion') ? 'champion.spellcasting' : 'mage.spell_casting';
                    Macro.create({name: spell.name, type: "script", scope: "global", command: `rollSkillManager.rollSkill(token, '${skillId}', {spellId: '${spellId}'})`})
                        .then(async (macro) => {
                            let freeSlot = Array.fromRange(50).map(i => i + 1).find(i => !(i in game.user.data.hotbar) || !game.macros.get(game.user.data.hotbar[i]));
                            await game.user.assignHotbarMacro(macro, freeSlot);
                        });

                    this.close();
                    break;
                }
            }
        });
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "spellSelector",
            template: "systems/lvl0mf-sheet/templates/ui/spell-selector-dialog.hbs",
            popOut: true,
            width: 500,
            height: 600
        });
    }
}

Handlebars.registerHelper('spellSelectorStat', (name, value) => {
    if (!value)
        return '';
    if (typeof value === 'string')
        return new Handlebars.SafeString(`<div class="${name}"><span class="label">${game.i18n.localize('LVL0MF.Spell.Label.' + name)}</span>&nbsp;${value}</div>`);
    if (typeof value === 'object' && value instanceof RolledSpellStat)
        return new Handlebars.SafeString(`<div class="${name}">
            <span class="label"><i class="fas fa-dice"></i> ${game.i18n.localize('LVL0MF.Spell.Label.' + name)}</span>&nbsp;${value.toDisplayDefinitionString()}
        </div>`);
})
