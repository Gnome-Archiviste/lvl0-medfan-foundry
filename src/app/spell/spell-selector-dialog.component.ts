import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Lvl0Character} from '../data-accessor/models/lvl0-character';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {BehaviorSubject, combineLatest, map, Observable, Subject, Subscription, withLatestFrom} from 'rxjs';
import {selectAvailableSpells} from '../data-accessor/selectors/character-available-spell-selector';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {SpellUtil} from './spell-util';
import {Spell, SpellContext} from './spell';
import {selectCharacterArcaneLevel} from '../data-accessor/selectors/character-arcane-level-selector';
import {NgForm} from '@angular/forms';
import {selectCharacterEmptyWands} from '../data-accessor/selectors/character-empty-wand-selector';
import {selectCharacterFillableWands} from '../data-accessor/selectors/character-fillable-wand-selector';
import fuzzysort from 'fuzzysort';
import {DialogDataService} from '../data-accessor/dialog-data-service';

export type SpellCastAction = 'fillWand' | 'createScroll' | 'cast' | 'createMacro';

export type SpellSelectorDialogData = {
    characterId: string
}

export type SpellSelectorDialogResult = {
    spell: Spell
    action: SpellCastAction
}

type FilterModel = {
    arcaneLevels: number[];
    showDamageSpells: boolean;
    showHealSpells: boolean;
    otherSpells: boolean;
    filter: string
};

@Component({
    selector: 'lvl0-spell-selector',
    templateUrl: './spell-selector-dialog.component.html',
    styleUrls: ['./spell-selector-dialog.component.scss'],
})
export class SpellSelectorDialogComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();

    @Input('dialogDataId')
    dialogDataId: string;
    @Output('close')
    close: EventEmitter<SpellSelectorDialogResult> = new EventEmitter<SpellSelectorDialogResult>();

    data: SpellSelectorDialogData;

    @ViewChild('filterForm', {static: true})
    filterForm: NgForm;

    character$: Observable<Lvl0Character>;
    spells$: Observable<Spell[]>;
    visibleSpells$: Observable<Fuzzysort.KeysResults<Spell>>;
    emptyScrollAvailable$: Observable<boolean>;
    emptyWandAvailable$: Observable<boolean>;
    arcanesLevels$: Observable<number[]>;

    filterModel: FilterModel = {
        arcaneLevels: [],
        showDamageSpells: true,
        showHealSpells: true,
        otherSpells: true,
        filter: ''
    }
    filterModel$: Subject<FilterModel> = new BehaviorSubject(this.filterModel);

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly spellUtil: SpellUtil,
        private readonly dialogDataService: DialogDataService,
    ) {
    }

    ngOnInit() {
        if (this.dialogDataId) {
            this.data = this.dialogDataService.consumeData<SpellSelectorDialogData>(this.dialogDataId);

            this.subscriptions.add(this.filterForm.valueChanges?.subscribe(_ => {
                setTimeout(() => this.filterModel$.next(this.filterModel));
            }))
            this.character$ = this.characterAccessorService.selectCharacter(this.data.characterId);
            this.emptyScrollAvailable$ = this.character$
                .pipe(
                    map(character => !!character.itemsByType['wand'].find(x => !x.data.spell))
                );
            this.emptyWandAvailable$ = this.character$
                .pipe(
                    selectCharacterEmptyWands(),
                    map(w => w.length > 0)
                );
            let availableSpells$ = this.character$.pipe(selectAvailableSpells(this.systemDataDatabaseService));
            this.spells$ = availableSpells$
                .pipe(
                    withLatestFrom(this.character$.pipe(selectCharacterArcaneLevel(this.systemDataDatabaseService))),
                    map(([spellDefinitions, arcaneLevel]) => {
                        const context: SpellContext = {
                            arcaneLevel
                        };
                        return spellDefinitions.map(sd => this.spellUtil.computeSpellValuesBeforeRoll(sd, context));
                    }));
            this.arcanesLevels$ = availableSpells$.pipe(
                map(spellDefinitions => {
                    let allLevels = spellDefinitions.reduce((acc, value) => {
                        acc.push(value.level);
                        return acc
                    }, [] as number[]);
                    let levels = new Set(allLevels)
                    return [...levels].sort((a, b) => a - b);
                })
            );
            this.visibleSpells$ = combineLatest([
                this.spells$,
                this.filterModel$
            ]).pipe(
                map(([spells, filterForm]) => {
                    return [
                        spells.filter(spell => {
                            if (filterForm.arcaneLevels.length) {
                                if (!filterForm.arcaneLevels.includes(spell.definition.level))
                                    return false;
                            }

                            if (spell.definition.damage) {
                                if (!filterForm.showDamageSpells) {
                                    return false;
                                }
                            } else if (spell.definition.heal) {
                                if (!filterForm.showHealSpells) {
                                    return false;
                                }
                            } else {
                                if (!filterForm.otherSpells) {
                                    return false;
                                }
                            }
                            return true;
                        }),
                        filterForm
                    ];
                }),
                map(([spells, filterForm]: [Spell[], FilterModel]) => {
                    return fuzzysort.go<Spell>(filterForm.filter, spells, {
                        keys: ['definition.name', 'computedData.description'],
                        all: true,
                        threshold: -20000
                    })
                })
            );
        }
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    canFillAWandWith(spellId: string): Observable<boolean> {
        return combineLatest([
            this.character$.pipe(selectCharacterArcaneLevel(this.systemDataDatabaseService)),
            this.character$.pipe(selectCharacterFillableWands(this.systemDataDatabaseService))
        ]).pipe(
            map(([arcaneLevel, fillableWands]) => !!fillableWands.find(x => x.data.spell === spellId && x.data.arcane === arcaneLevel))
        );
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

    identitySpell(index: number, item: Fuzzysort.KeysResult<Spell>): string {
        return item.obj.definition.id;
    }

    highlightSpellName(result: Fuzzysort.KeysResult<Spell>) {
        if (!result[0])
            return result.obj.definition.name;
        if (result[0].score == -Infinity)
            return result.obj.definition.name;
        return fuzzysort.highlight(result[0], '<b>', '</b>') || '';
    }

    highlightDescription(result: Fuzzysort.KeysResult<Spell>) {
        if (!result[1])
            return result.obj.computedData.description;
        if (result[1].score == -Infinity)
            return result.obj.computedData.description;
        return fuzzysort.highlight(result[1], '<b>', '</b>') || undefined;
    }

    addMacro(spell: Spell) {
        this.close.emit({spell, action: 'createMacro'});
    }

    castSpell(spell: Spell) {
        this.close.emit({spell, action: 'cast'});
    }

    createScroll(spell: Spell) {
        this.close.emit({spell, action: 'createScroll'});
    }

    fillWand(spell: Spell) {
        this.close.emit({spell, action: 'fillWand'});
    }
}
