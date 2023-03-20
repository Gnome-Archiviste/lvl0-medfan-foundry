import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Lvl0Character} from '../data-accessor/models/lvl0-character';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {BehaviorSubject, combineLatest, map, Observable, Subject, Subscription, withLatestFrom} from 'rxjs';
import {SpellClass} from '../../repositories';
import {selectAvailableSpells} from '../data-accessor/selectors/character-available-spell-selector';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {SpellUtil} from './spell-util';
import {Spell, SpellContext} from './spell';
import {selectCharacterArcaneLevel} from '../data-accessor/selectors/character-arcane-level-selector';
import {NgForm} from '@angular/forms';
import {search} from 'fast-fuzzy';
import {selectCharacterEmptyWands} from '../data-accessor/selectors/character-empty-wand-selector';
import {selectCharacterFillableWands} from '../data-accessor/selectors/character-fillable-wand-selector';

type FilterModel = {
    arcaneLevels: number[];
    showDamageSpells: boolean;
    showHealSpells: boolean;
    otherSpells: boolean;
    filter: string
};

@Component({
    selector: 'lvl0-spell-selector',
    templateUrl: './spell-selector.component.html',
    styleUrls: ['./spell-selector.component.scss'],
})
export class SpellSelectorComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();

    @Input('characterId')
    characterId: string;
    @Input('spellClass')
    spellClass: SpellClass;
    @Output('castSpell')
    castSpell: EventEmitter<string> = new EventEmitter<string>();
    @Output('addMacro')
    addMacro: EventEmitter<string> = new EventEmitter<string>();
    @Output('createScroll')
    createScroll: EventEmitter<string> = new EventEmitter<string>();
    @Output('fillWand')
    fillWand: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('filterForm', {static: true})
    filterForm: NgForm;

    character$: Observable<Lvl0Character>;
    spells$: Observable<Spell[]>;
    visibleSpells$: Observable<Spell[]>;
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
    ) {
    }

    ngOnInit() {
        this.subscriptions.add(this.filterForm.valueChanges?.subscribe(_ => {
            setTimeout(() => this.filterModel$.next(this.filterModel));
        }))
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);
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
                if (!filterForm.filter)
                    return spells;
                return search(filterForm.filter, spells, {
                    keySelector: (obj) => obj.definition.name,
                    ignoreCase: true,
                    threshold: 0.7,
                })
            })
        );

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

    identitySpell(index: number, item: Spell): string {
        return item.definition.id;
    }
}
