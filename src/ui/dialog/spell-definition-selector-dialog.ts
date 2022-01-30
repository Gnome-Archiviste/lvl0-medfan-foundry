import {inject, injectable} from 'tsyringe';
import {SpellDefinition, SpellRepository} from 'repositories';
import {DialogBase, DialogResultCallback} from './dialog-base';
import * as marked from 'marked';
import * as fuzzysort from 'fuzzysort';
import Prepared = Fuzzysort.Prepared;
import Result = Fuzzysort.Result;

export interface SpellDefinitionSelectorDialogData {
}

@injectable()
export class SpellDefinitionSelectorDialog extends DialogBase<SpellDefinitionSelectorDialogData, SpellDefinition> {
    private selectedSpell?: SpellDefinition;
    private filteredSpells?: (Result & { spellDefinition: SpellDefinition })[];
    private allSpellsPrepared: (Prepared & { spellDefinition: SpellDefinition })[];
    private filterTerm = '';

    constructor(
        @inject("DIALOG_DATA") dialogData: SpellDefinitionSelectorDialogData,
        @inject("DIALOG_RESULT") result: DialogResultCallback<SpellDefinition>,
        @inject(SpellRepository) private readonly spellRepository: SpellRepository,
    ) {
        super(dialogData, result);
        this.allSpellsPrepared = spellRepository.getListOfAllSpells()
            .map(s => ({...fuzzysort.prepare(s.name)!, spellDefinition: s}))
    }

    protected getResult(): SpellDefinition | undefined {
        return this.selectedSpell;
    }

    getData(options?: Partial<ApplicationOptions>): object | Promise<object> {
        return {
            ...super.getData(options),
            filteredSpells: this.filteredSpells,
            filterTerm: this.filterTerm,
        };
    }

    override activateListeners(html: JQuery) {
        super.activateListeners(html);


        html.find('[data-search-box]').on('keyup', (ev) => {
            this.filterTerm = (ev.currentTarget as HTMLInputElement).value;
            fuzzysort.goAsync(this.filterTerm, this.allSpellsPrepared, {limit: 25, allowTypo: true, threshold: -10000})
                .then(results => {
                    // @ts-ignore
                    html.find('.spells').html(this.renderResults(results))
                    html.find('[data-action]').on('click', (ev) => {
                        switch (ev.currentTarget.dataset.action) {
                            case 'select':
                                let spell = this.allSpellsPrepared.find(x => x.spellDefinition.id === ev.currentTarget.dataset.spellId)?.spellDefinition
                                this.result(spell);
                                this.close({selected: true});
                                break;
                        }
                    });
                })
        })
    }

    static get defaultOptions(): ApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "spellSelector",
            title: "Selection du sort",
            template: "systems/lvl0mf-sheet/ui/dialog/spell-definition-selector-dialog.hbs",
            popOut: true,
            width: 500,
            height: 600
        };
    }

    private renderResults(results: Fuzzysort.Results & { spellDefinition: SpellDefinition }[]): string {
        let renderedList = '';
        for (let result of results) {
            let spellDefinition = result.spellDefinition as SpellDefinition;
            let highlightedName = fuzzysort.highlight(result, '<b>', '</b>');
            renderedList += `
                <div class="spell">
                    <div class="header">
                        <img class="icon" src="${spellDefinition.icon}">
                        <h2 class="title">${highlightedName}</h2>
                        <span class="subtitle">Niveau: ${spellDefinition.level} - Spe: ${spellDefinition.specializationName}</span>
                    </div>
                    <div class="description">${marked.parse(spellDefinition.description)}</div>
                    <div class="actions">
                        <button class="action" data-action="select" data-spell-id="${spellDefinition.id}"><i class="fas fa-arrow-right"></i> Choisir</button>
                    </div>
                </div>`;
        }
        if (!renderedList) {
            renderedList = 'Aucun résultat disponible';
        }
        return renderedList;
    }
}
