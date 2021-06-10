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
