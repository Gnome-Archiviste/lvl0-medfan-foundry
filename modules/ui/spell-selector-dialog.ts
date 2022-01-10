import {RolledSpellStat} from "../managers/spell/spell-manager";
import {ActorSpell} from '../managers/spell/spell-definition.model';

export interface SpellSelectorDialogData {
    spells: ActorSpell[];
}

export type CompleteSpellSelectorCallback = (selectedSpell?: ActorSpell) => void;

export class SpellSelectorDialog extends Application {
    constructor(
        private readonly data: SpellSelectorDialogData,
        private readonly onComplete: CompleteSpellSelectorCallback
    ) {
        super();
    }

    /** @override */
    getData(options = {}) {
        let data = super.getData(options);
        let spellPerLevels = this.data.spells.reduce((previousValue, spell) => {
            if (!(spell.cost in previousValue))
                previousValue[spell.cost] = [];
            previousValue[spell.cost].push(spell);
            return previousValue;
        }, {});

        return {
            ...data,
            spells: this.data.spells,
            levels: Object.keys(spellPerLevels),
            spellPerLevels: spellPerLevels
        };
    }

    /** @override */
    get title() {
        return "Selection du sort";
    }

    async close(options?: Application.CloseOptions & {selected: boolean}): Promise<void> {
        if (!options?.selected) {
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
                    if (!spell)
                        throw new Error("Spell not found: " + spellId);
                    let skillId = spell.id.startsWith('champion') ? 'champion.spellcasting' : 'mage.spell_casting';
                    Macro.create({
                        name: spell.name,
                        type: "script",
                        img: spell.icon,
                        scope: "actor",
                        command: `rollSkillManager.rollSkill(token, '${skillId}', {spellId: '${spellId}'})`
                    }).then(async (macro) => {
                        if (!macro) {
                            ui.notifications?.error('Failed to create macro')
                            throw new Error('Failed to create macro');
                        }
                        await game.user?.assignHotbarMacro(macro, '');
                    });

                    this.close();
                    break;
                }
            }
        });
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "spellSelector",
            template: "systems/lvl0mf-sheet/templates/ui/spell-selector-dialog.hbs",
            popOut: true,
            tabs: [{navSelector: ".tabs", contentSelector: ".spells", initial: "1"}],
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
    if (typeof value === 'object' && 'toDisplayDefinitionString' in value)
        return new Handlebars.SafeString(`<div class="${name}">
            <span class="label"><i class="fas fa-dice"></i> ${game.i18n.localize('LVL0MF.Spell.Label.' + name)}</span>&nbsp;${value.toDisplayDefinitionString()}
        </div>`);
    console.error(value);
    return new Handlebars.SafeString(`<div class="${name}"><span class="label">${game.i18n.localize('LVL0MF.Spell.Label.' + name)}</span>&nbsp;ERROR</div>`);
})
