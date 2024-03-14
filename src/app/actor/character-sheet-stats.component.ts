import {Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {distinctUntilChanged, map, Observable, Subscription} from 'rxjs';
import {LevelData, LevelValue, Lvl0Character} from '../data-accessor/models/lvl0-character';
import {
    selectCharacterExperience,
    selectCharacterHealth,
    selectCharacterInitialBasicStatValues, selectCharacterLevel,
    selectCharacterMana,
    selectNextLevelExperience
} from '../data-accessor/selectors/character-selectors';
import {selectCharacterMaxHealth} from '../data-accessor/selectors/character-max-health-selector';
import {selectCharacterMaxMana} from '../data-accessor/selectors/character-max-mana-selector';
import {selectCharacterProtection} from '../data-accessor/selectors/character-protection-selector';
import {
    ActorBasicStatValues,
    selectCharacterBasicStats
} from '../data-accessor/selectors/character-basic-stats-selector';
import {selectCharacterArcaneLevel} from '../data-accessor/selectors/character-arcane-level-selector';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {
    Lvl0ActorEffectArmorWithEffectId,
    selectCharacterMagicArmor
} from '../data-accessor/selectors/character-magic-armore-selector';
import {ActorEffectService} from '../data-accessor/actor-effect.service';
import {selectCharacterMovement} from '../data-accessor/selectors/character-movement-selector';
import {selectCharacterCanLevelUp} from '../data-accessor/selectors/character-level-up-selector';
import {DialogService} from '../data-accessor/dialog-service';
import {LevelUpDialogData, LevelUpDialogResult} from './level-up-dialog.component';
import {ActorBasicStatNames} from '../../models/shared';
import {selectCharacterRaceDefinition} from '../data-accessor/selectors/character-race-definition-selector';
import {selectCharacterJobDefinition} from '../data-accessor/selectors/character-job-definition-selector';
import {JobDefinition, RaceDefinition} from '../../repositories';
import {Lvl0Actor} from '../data-accessor/models/lvl0-actor';
import {result} from 'lodash';

@Component({
    selector: 'lvl0-character-sheet-stats',
    templateUrl: './character-sheet-stats.component.html',
    styleUrls: ['./character-sheet-stats.component.scss']
})
export class CharacterSheetStatsComponent implements OnInit, OnDestroy {
    @Input('characterId')
    characterId: string;

    subscriptions: Subscription = new Subscription();
    character$: Observable<Lvl0Character>;
    characterArmor$: Observable<number>;
    characterMana$: Observable<number>;
    characterMaxMana$: Observable<number>;
    characterArcaneLevel$: Observable<number>;
    characterHealth$: Observable<number>;
    characterMaxHealth$: Observable<number>;
    characterMagicArmor$: Observable<Lvl0ActorEffectArmorWithEffectId | undefined>;
    characterMagicArmorRemaining$: Observable<number>;
    characterBasicStatsValues$: Observable<ActorBasicStatValues>;
    characterCha$: Observable<number>;
    characterInt$: Observable<number>;
    characterPer$: Observable<number>;
    characterPhy$: Observable<number>;
    characterDex$: Observable<number>;
    characterMovement$: Observable<number>;
    characterExperience$: Observable<number>;
    characterCanLevelUp$: Observable<boolean>;
    nextLevelExperience$: Observable<number>;
    characterInitialStats$: Observable<ActorBasicStatValues>;
    characterInitialCha$: Observable<number>;
    characterInitialInt$: Observable<number>;
    characterInitialPer$: Observable<number>;
    characterInitialPhy$: Observable<number>;
    characterInitialDex$: Observable<number>;
    characterRace$: Observable<RaceDefinition | undefined>;
    characterJob$: Observable<JobDefinition | undefined>;
    characterLevel$: Observable<LevelValue>;

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly actorUpdaterService: ActorUpdaterService,
        private readonly actorEffectService: ActorEffectService,
        private readonly dialogService: DialogService,
    ) {
    }

    ngOnInit() {
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);

        this.characterArmor$ = this.character$.pipe(selectCharacterProtection());
        this.characterMana$ = this.character$.pipe(selectCharacterMana());
        this.characterMaxMana$ = this.character$.pipe(selectCharacterMaxMana());
        this.characterArcaneLevel$ = this.character$.pipe(selectCharacterArcaneLevel(this.systemDataDatabaseService));
        this.characterHealth$ = this.character$.pipe(selectCharacterHealth());
        this.characterMaxHealth$ = this.character$.pipe(selectCharacterMaxHealth());
        this.characterBasicStatsValues$ = this.character$.pipe(selectCharacterBasicStats());
        this.characterMagicArmor$ = this.character$.pipe(selectCharacterMagicArmor(this.systemDataDatabaseService));
        this.characterMovement$ = this.character$.pipe(selectCharacterMovement());
        this.characterRace$ = this.character$.pipe(selectCharacterRaceDefinition(this.systemDataDatabaseService));
        this.characterJob$ = this.character$.pipe(selectCharacterJobDefinition(this.systemDataDatabaseService));
        this.characterMagicArmorRemaining$ = this.characterMagicArmor$.pipe(map(x => x?.remainingArmorPoint || 0));
        this.characterCha$ = this.characterBasicStatsValues$.pipe(map(x => x.cha), distinctUntilChanged());
        this.characterInt$ = this.characterBasicStatsValues$.pipe(map(x => x.int), distinctUntilChanged());
        this.characterPer$ = this.characterBasicStatsValues$.pipe(map(x => x.per), distinctUntilChanged());
        this.characterDex$ = this.characterBasicStatsValues$.pipe(map(x => x.dex), distinctUntilChanged());
        this.characterPhy$ = this.characterBasicStatsValues$.pipe(map(x => x.phy), distinctUntilChanged());
        this.characterExperience$ = this.character$.pipe(selectCharacterExperience());
        this.characterCanLevelUp$ = this.character$.pipe(selectCharacterCanLevelUp(this.systemDataDatabaseService));
        this.nextLevelExperience$ = this.character$.pipe(selectNextLevelExperience());
        this.characterInitialStats$ = this.character$.pipe(selectCharacterInitialBasicStatValues());
        this.characterInitialCha$ = this.characterInitialStats$.pipe(map(x => x.cha), distinctUntilChanged());
        this.characterInitialInt$ = this.characterInitialStats$.pipe(map(x => x.int), distinctUntilChanged());
        this.characterInitialPer$ = this.characterInitialStats$.pipe(map(x => x.per), distinctUntilChanged());
        this.characterInitialDex$ = this.characterInitialStats$.pipe(map(x => x.dex), distinctUntilChanged());
        this.characterInitialPhy$ = this.characterInitialStats$.pipe(map(x => x.phy), distinctUntilChanged());
        this.characterLevel$ = this.character$.pipe(selectCharacterLevel());

        this.subscriptions.add(this.characterMaxHealth$.subscribe(maxHealth => {
            this.actorUpdaterService.updateActor(this.characterId, {
                system: {
                    health: {
                        max: maxHealth
                    }
                }
            });
        }));
        this.subscriptions.add(
            this.characterMaxMana$.subscribe(maxMana => {
                this.actorUpdaterService.updateActor(this.characterId, {
                    system: {
                        mana: {
                            max: maxMana
                        }
                    }
                });
            }));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    updateHealth(newHealth: number) {
        this.actorUpdaterService.updateActor(this.characterId, {
            system: {
                health: {
                    value: newHealth
                }
            }
        })
    }

    updateMana(newMana: number) {
        this.actorUpdaterService.updateActor(this.characterId, {
            system: {
                mana: {
                    value: newMana
                }
            }
        })
    }

    updateExperience(newExperience: number) {
        this.actorUpdaterService.updateActor(this.characterId, {
            system: {
                experience: {
                    value: newExperience
                }
            }
        })
    }

    updateMagicArmorRemaining(effectId: string, value: number) {
        if (value <= 0) {
            this.actorEffectService.removeEffect(this.characterId, effectId);
        } else {
            this.actorEffectService.updateEffect(this.characterId, effectId, {
                magicArmor: {
                    remainingArmorPoint: value
                }
            })
        }
    }

    openLevelUpDialog(character: Lvl0Character, characterJob: JobDefinition, characterRace: RaceDefinition, nextLevelExperience: number) {
        let fromLevel = character.system.level.value || 0;
        let toLevel = +fromLevel + 1;
        if (toLevel > 70) {
            return;
        }

        if (toLevel === 1) {
            for (let requirement of characterJob.requirements) {
                if (requirement.races && requirement.races.indexOf(characterRace.id) === -1)
                    continue;
                if (requirement.notRaces && requirement.notRaces.indexOf(characterRace.id) !== -1)
                    continue;
                if (character.system.baseStats[requirement.stat].value < requirement.min) {
                    ui.notifications?.error('Impossible de choisir cette classe. ' + requirement.stat.toUpperCase() + ' doit être au minimum de ' + requirement.min);
                    return;
                }
            }
        }

        let additionalHealth = characterJob.healthLevels[toLevel - 1];
        let additionalMana = characterJob.manaLevels[toLevel - 1];
        let hasNewSpeciality = characterJob.specialityLevels.indexOf(toLevel) === -1;
        let hasAdditionalPointInStat = (toLevel % 20) == 0;

        let dialogData: LevelUpDialogData = {
            toLevel,
            additionalHealth,
            additionalMana,
            hasNewSpeciality,
            hasAdditionalPointInStat,
            characterId: this.characterId
        }

        this.dialogService.openDialog<LevelUpDialogData, LevelUpDialogResult>('lvl0-level-up-dialog', dialogData, {title: 'Level Up'}).subscribe((result) => {
            let levelData: LevelData = {
                health: result.additionalHealth || 0,
                mana: result.additionalMana || 0,
                money: result.money || 0,
                additionalStat: result.additionalPointInStat,
            };
            let diff: RecursivePartial<Lvl0Character> = {
                system: {
                    health: { value: character.system.health.value + (result.additionalHealth || 0) },
                    mana: { value: character.system.mana.value + (result.additionalMana || 0) },
                    level: {value: toLevel},
                    experience: {value: character.system.experience.value - nextLevelExperience},
                    levelUpData: {
                        [toLevel]: levelData as any
                    }
                }
            };
            if (result.money) {
                diff = {
                    ...diff,
                    system: {
                        ...diff.system,
                        staticInventory: {money: (character.system.staticInventory.money ?? 0) + result.money}
                    }
                };
            }

            this.actorUpdaterService.updateActor(this.characterId, diff);
        });
    }

    updateInitialStat(newValue: number, statName: ActorBasicStatNames) {
        this.actorUpdaterService.updateActor(this.characterId,
            {
                system: {
                    baseStats: {
                        [statName]: {value: newValue}
                    }
                }
            })
    }

    openRollDiceInitialStat() {
        this.dialogService.openDialog<void, ActorBasicStatValues>('lvl0-character-initial-stat-roll-dialog', undefined, {title: 'Roll Stats'}).subscribe((result) => {
            this.actorUpdaterService.updateActor(this.characterId,
                {
                    system: {
                        baseStats: {
                            ['phy']: {value: result.phy},
                            ['dex']: {value: result.dex},
                            ['int']: {value: result.int},
                            ['cha']: {value: result.cha},
                            ['per']: {value: result.per},
                        }
                    }
                })
        });
    }
}
