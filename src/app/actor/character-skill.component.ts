import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SkillDefinition} from '../../repositories';
import {combineLatest, map, Observable, take} from 'rxjs';
import {
    ActiveSkillValue,
    CharacterPendingSkillPoints,
    Lvl0Character,
    PendingSkillValue,
    SkillValue
} from '../data-accessor/models/lvl0-character';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {
    selectCharacterPendingSkills,
    selectCharacterPendingSkillValue,
    selectHavePendingSkillPoints
} from '../data-accessor/selectors/character-selectors';
import {AvailableSkillPoint} from '../data-accessor/selectors/character-available-skill-points-selector';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {CdkMenu} from '@angular/cdk/menu';
import {SkillService} from '../skill/skill.service';
import {selectCharacterActiveSkillValue} from '../data-accessor/selectors/character-active-skill-value-selector';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';

@Component({
    selector: 'lvl0-character-skill',
    templateUrl: './character-skill.component.html',
    styleUrls: ['./character-skill.component.scss']
})
export class CharacterSkillComponent implements OnInit, OnDestroy {
    @Input() skillDefinition: SkillDefinition
    @Input() characterId: string;

    @Input() characterAvailableSkillPoints$: Observable<AvailableSkillPoint>;
    character$: Observable<Lvl0Character>;
    skillValue$: Observable<ActiveSkillValue>;
    pendingSkillValue$: Observable<PendingSkillValue>;
    value$: Observable<number>;
    manualMode$: Observable<boolean>;
    master$: Observable<boolean>;
    prodigy$: Observable<boolean>;
    masterUsed$: Observable<boolean>;
    prodigyUsed$: Observable<boolean>;
    totalValue$: Observable<number>;

    characterPendingSkills$: Observable<CharacterPendingSkillPoints>;
    canAddBasePoint$: Observable<boolean>;
    canRemoveBasePoint$: Observable<boolean>;
    haveAvailableSkillPoints$: Observable<boolean>;
    havePendingSkillPoints: Observable<boolean>;
    hadAdditionalBasePoint$: Observable<boolean>;

    canAddMasterPoint$: Observable<boolean>;
    canRemoveMasterPoint$: Observable<boolean>;

    canAddProdigyPoint$: Observable<boolean>;
    canRemoveProdigyPoint$: Observable<boolean>;

    canAddPoint$: Observable<boolean>;
    canRemovePoint$: Observable<boolean>;

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly actorUpdaterService: ActorUpdaterService,
        private readonly skillService: SkillService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
    ) {
    }

    ngOnInit(): void {
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);

        this.skillValue$ = this.character$.pipe(selectCharacterActiveSkillValue(this.skillDefinition.categoryId, this.skillDefinition.id, this.systemDataDatabaseService))
        this.pendingSkillValue$ = this.character$.pipe(selectCharacterPendingSkillValue(this.skillDefinition.categoryId, this.skillDefinition.id))
        this.value$ = this.skillValue$.pipe(map(x => x.value));
        this.manualMode$ = this.skillValue$.pipe(map(x => x.manualMode ?? false));
        this.master$ = this.skillValue$.pipe(map(x => x.master));
        this.prodigy$ = this.skillValue$.pipe(map(x => x.prodigy));
        this.masterUsed$ = this.skillValue$.pipe(map(x => x.masterUsed));
        this.prodigyUsed$ = this.skillValue$.pipe(map(x => x.prodigyUsed));
        this.totalValue$ = this.skillValue$.pipe(map(x => x.successValue));
        this.characterPendingSkills$ = this.character$.pipe(selectCharacterPendingSkills());
        this.haveAvailableSkillPoints$ = this.characterAvailableSkillPoints$.pipe(map(x => x.total > 0))
        this.havePendingSkillPoints = this.character$.pipe(selectHavePendingSkillPoints())

        this.hadAdditionalBasePoint$ = this.characterPendingSkills$.pipe(
            pendingSkillPoint => pendingSkillPoint[this.skillDefinition.categoryId]?.[this.skillDefinition.id]?.value
                || pendingSkillPoint[this.skillDefinition.categoryId]?.[this.skillDefinition.id]?.prodigy
                || pendingSkillPoint[this.skillDefinition.categoryId]?.[this.skillDefinition.id]?.master
        );
        this.canAddBasePoint$ = combineLatest([
            this.value$,
            this.characterAvailableSkillPoints$
        ]).pipe(map(([value, characterAvailableSkillPoints]: [number, AvailableSkillPoint]) => {
            if (value > 2)
                return false;

            if (characterAvailableSkillPoints.availableSkillPoints.all > 0) {
                return true;
            }
            if (characterAvailableSkillPoints.availableSkillPoints.master > 0) {
                return true;
            }
            if (characterAvailableSkillPoints.availableSkillPoints.prodigy > 0) {
                return true;
            }
            if (characterAvailableSkillPoints.availableSkillPoints.general > 0 && this.skillDefinition.categoryId == 'general') {
                return true;
            }
            if (characterAvailableSkillPoints.availableSkillPoints.job_combat > 0 && this.skillDefinition.categoryId != 'general') {
                return true;
            }
            return false;
        }));

        this.canRemoveBasePoint$ = this.pendingSkillValue$.pipe(
            map((pendingSkillValue: PendingSkillValue) => {
                // Cannot remove point if master or prodigy was selected
                if (pendingSkillValue.master)
                    return false;
                if (pendingSkillValue.prodigy)
                    return false;
                return (pendingSkillValue.value ?? 0) > 0;
            }));
        this.canAddMasterPoint$ = combineLatest([
            this.skillValue$,
            this.characterAvailableSkillPoints$
        ]).pipe(map(([skillValue, characterAvailableSkillPoints]: [SkillValue, AvailableSkillPoint]) => {
            if (skillValue.value != 3)
                return false;
            if (skillValue.master)
                return false;
            return characterAvailableSkillPoints.availableSkillPoints.master > 0 || characterAvailableSkillPoints.availableSkillPoints.prodigy > 0;
        }));
        this.canRemoveMasterPoint$ = this.pendingSkillValue$.pipe(
            map((pendingSkillValue: PendingSkillValue) => {
                // Cannot remove point if prodigy was selected
                if (pendingSkillValue.prodigy)
                    return false;

                return pendingSkillValue.master;
            }));

        this.canAddProdigyPoint$ = combineLatest([
            this.skillValue$,
            this.characterAvailableSkillPoints$
        ]).pipe(map(([skillValue, characterAvailableSkillPoints]: [SkillValue, AvailableSkillPoint]) => {
            if (skillValue.value != 3)
                return false;
            if (!skillValue.master)
                return false;
            if (skillValue.prodigy)
                return false;
            return characterAvailableSkillPoints.availableSkillPoints.prodigy > 0;
        }));
        this.canRemoveProdigyPoint$ = this.pendingSkillValue$.pipe(map((pendingSkillValue: PendingSkillValue) => pendingSkillValue.prodigy));

        this.canAddPoint$ = combineLatest([this.canAddBasePoint$, this.canAddMasterPoint$, this.canAddProdigyPoint$]).pipe(map(([b, m, p]) => b || m || p))
        this.canRemovePoint$ = combineLatest([this.canRemoveBasePoint$, this.canRemoveMasterPoint$, this.canRemoveProdigyPoint$]).pipe(map(([b, m, p]) => b || m || p))
    }


    setPoint(newValue: number) {
        this.actorUpdaterService.updateActor(this.characterId, {
            data: {
                skills: {
                    [this.skillDefinition.categoryId]: {
                        [this.skillDefinition.id]: {
                            value: newValue
                        }
                    }
                }
            }
        })
    }
    addPoint() {
        combineLatest([
            this.pendingSkillValue$,
            this.skillValue$
        ]).pipe(take(1))
            .subscribe(([pendingSkillValue, skillValue]: [PendingSkillValue, SkillValue]) => {
                let newValue: PendingSkillValue = {...pendingSkillValue}
                if (skillValue.value < 3) {
                    newValue.value++;
                } else if (!skillValue.master) {
                    newValue.master = true;
                } else {
                    newValue.prodigy = true;
                }
                this.actorUpdaterService.updateActor(this.characterId, {
                    data: {
                        pendingSkills: {
                            [this.skillDefinition.categoryId]: {
                                [this.skillDefinition.id]: newValue
                            }
                        }
                    }
                })
            })
    }

    removePoint() {
        this.pendingSkillValue$.pipe(take(1)).subscribe(pendingSkillValue => {
            let newValue = {...pendingSkillValue};
            if (newValue.prodigy)
                newValue.prodigy = false;
            else if (newValue.master)
                newValue.master = false;
            else if (newValue.value > 0)
                newValue.value--;
            this.actorUpdaterService.updateActor(this.characterId, {
                data: {
                    pendingSkills: {
                        [this.skillDefinition.categoryId]: {
                            [this.skillDefinition.id]: newValue
                        }
                    }
                }
            })
        })
    }

    ngOnDestroy() {

    }

    toggleMasterUse($event: Event) {
        if ($event.target instanceof HTMLInputElement)
            this.actorUpdaterService.updateActor(this.characterId, {
                data: {
                    usedSkillMastery: {[this.skillDefinition.categoryId]: {[this.skillDefinition.id]: $event.target.checked}}
                }
            });
    }

    toggleProdigyUse($event: Event) {
        if ($event.target instanceof HTMLInputElement) {
            this.actorUpdaterService.updateActor(this.characterId, {
                data: {
                    usedSkillProdigy: {[this.skillDefinition.categoryId]: {[this.skillDefinition.id]: $event.target.checked}}
                }
            });
        }
    }

    rollDice(menu: CdkMenu) {
        menu.menuStack.closeAll();
        this.skillService.rollSkill(this.characterId, this.skillDefinition.skillId);
    }

    createMacro(menu: CdkMenu) {
        menu.menuStack.closeAll();
        this.skillService.createSkillMacro(this.skillDefinition.skillId);
    }

    toggleManualMode(menu: CdkMenu) {
        menu.menuStack.closeAll();
        this.skillValue$.pipe(take(1)).subscribe((activeSkillValue) => {
            this.actorUpdaterService.updateActor(this.characterId, {
                data: {
                    skills: {
                        [this.skillDefinition.categoryId] : {
                            [this.skillDefinition.id] : {
                                manualMode: !activeSkillValue.manualMode
                            }
                        }
                    }
                }
            })
        })
    }
}
