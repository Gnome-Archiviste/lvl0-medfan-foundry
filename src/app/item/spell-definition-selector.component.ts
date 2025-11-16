import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {DialogDataService} from '../data-accessor/dialog-data-service';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {NgForm} from '@angular/forms';
import {BehaviorSubject, map, Observable, Subject, Subscription} from 'rxjs';
import {SpellDefinition} from '../../repositories';
import fuzzysort from 'fuzzysort';
import {Spell, SpellContext} from '../spell/spell';
import {SpellUtil} from '../spell/spell-util';

export interface SpellDefinitionSelectorResult {
    spellId: string;
    spellContext?: SpellContext
}

type FilterModel = {
    arcaneLevels: number[];
    filter: string
};

@Component({
    selector: 'lvl0-spell-definition-selector',
    templateUrl: './spell-definition-selector.component.html',
    styleUrls: ['./spell-definition-selector.component.scss'],
    standalone: false
})
export class SpellDefinitionSelectorComponent implements OnInit, OnDestroy {
    @Input('dialogDataId')
    dialogDataId: string;
    @Output('close')
    close: EventEmitter<SpellDefinitionSelectorResult> = new EventEmitter<SpellDefinitionSelectorResult>();

    @ViewChild('filterForm', {static: true})
    filterForm: NgForm;

    filterModel: FilterModel = {
        arcaneLevels: [],
        filter: ''
    }

    filterModel$: Subject<FilterModel> = new BehaviorSubject(this.filterModel);
    arcanesLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20];
    availableSpells$: Observable<Fuzzysort.KeysResults<SpellDefinition>>;
    selectedSpellDefinition?: SpellDefinition;
    selectedSpell?: Spell;
    selectedSpellContext: SpellContext = {arcaneLevel: 1};

    private subscriptions: Subscription = new Subscription();

    constructor(
        private readonly dialogDataService: DialogDataService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly spellUtil: SpellUtil,
    ) {

    }

    ngOnInit() {
        if (this.dialogDataId)
            this.dialogDataService.consumeData(this.dialogDataId);

        this.subscriptions.add(this.filterForm.valueChanges?.subscribe(_ => {
            setTimeout(() => this.filterModel$.next(this.filterModel));
        }))

        this.availableSpells$ = this.filterModel$.pipe(
            map(filterForm => {
                let spells = this.systemDataDatabaseService.spellRepository.getListOfAllSpells()
                    .filter(spellDefinition => {
                        if (filterForm.arcaneLevels.length) {
                            if (!filterForm.arcaneLevels.includes(spellDefinition.level))
                                return false;
                        }
                        return true;
                    });
                return fuzzysort.go<SpellDefinition>(filterForm.filter, spells, {
                    keys: ['name', 'description'],
                    limit: 25,
                    all: true,
                    threshold: -20000
                })
            })
        );
    }

    highlightSpellName(result: Fuzzysort.KeysResult<SpellDefinition>) {
        if (!result[0])
            return result.obj.name;
        if (result[0].score == -Infinity)
            return result.obj.name;
        return fuzzysort.highlight(result[0], '<b>', '</b>');
    }

    highlightDescription(result: Fuzzysort.KeysResult<SpellDefinition>) {
        if (!result[1])
            return result.obj.description;
        if (result[1].score == -Infinity)
            return result.obj.description;
        return fuzzysort.highlight(result[1], '<b>', '</b>') || '';
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    toggleArcaneLevel($event: MouseEvent, arcaneLevel: number) {
        if (!arcaneLevel)
            this.filterModel.arcaneLevels = [];
        else if ($event.ctrlKey)
            this.filterModel.arcaneLevels.push(arcaneLevel);
        else
            this.filterModel.arcaneLevels = [arcaneLevel];
        this.filterModel$.next(this.filterModel);
    }

    selectSpellDefinition(spellDefinition: SpellDefinition) {
        if (spellDefinition.dependsOnArcaneLevel) {
            this.selectedSpellDefinition = spellDefinition;
            this.selectedSpellContext = {
                arcaneLevel: spellDefinition.level
            };
            this.updateSelectedSpell();
        }
        else {
            this.close.next({
                spellId: spellDefinition.id,
                spellContext: {
                    arcaneLevel: spellDefinition.level
                }
            });
        }
    }

    selectSpell() {
        if (!this.selectedSpellDefinition)
            return;
        this.close.next({
            spellId: this.selectedSpellDefinition.id,
            spellContext: this.selectedSpellContext
        });
    }

    selectArcaneLevelForSpell(arcaneLevel: number) {
        this.selectedSpellContext.arcaneLevel = arcaneLevel;
        this.updateSelectedSpell();
    }

    updateSelectedSpell() {
        if (!this.selectedSpellDefinition)
            return;
        this.selectedSpell = this.spellUtil.computeSpellValuesBeforeRoll(this.selectedSpellDefinition, this.selectedSpellContext);
    }
}
