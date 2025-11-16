import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, map, Observable, take} from 'rxjs';
import {
    CharacterPendingSkillPoints,
    CharacterSkillPoints,
    Lvl0Character,
    PendingSkillValue
} from '../data-accessor/models/lvl0-character';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {JobDefinition, SkillDefinition, SkillRepository} from '../../repositories';
import {selectCharacterJobDefinition} from '../data-accessor/selectors/character-job-definition-selector';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {
    AvailableSkillPoint,
    selectCharacterAvailableSkillPoints
} from '../data-accessor/selectors/character-available-skill-points-selector';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {
    selectCharacterPendingSkills,
    selectCharacterSkills,
    selectHavePendingSkillPoints
} from '../data-accessor/selectors/character-selectors';

@Component({
    selector: 'lvl0-character-sheet-skills',
    templateUrl: './character-sheet-skills.component.html',
    styleUrls: ['./character-sheet-skills.component.scss'],
    standalone: false
})
export class CharacterSheetSkillsComponent implements OnInit, OnDestroy {
    @Input('characterId')
    characterId: string;

    character$: Observable<Lvl0Character>;
    skillsByCategories: Record<string, SkillDefinition[]>;
    orderedJobsSkillCategoryIds$: Observable<string[]>;

    jobsSkillCategoryIds = ['mage', 'champion', 'warrior', 'ranger', 'rogue'];
    commonSkillCategoryIds = ['combat', 'general'];
    characterJob$: Observable<JobDefinition | undefined>;
    characterAvailableSkillPoints$: Observable<AvailableSkillPoint>;
    haveAvailableSkillPointsOrPendingPoints$: Observable<boolean>;

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly skillRepository: SkillRepository,
        private readonly actorUpdaterService: ActorUpdaterService,
    ) {
    }

    ngOnInit(): void {
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);

        this.skillsByCategories = this.skillRepository.getSkillsByCategoryIds()
        this.characterJob$ = this.character$.pipe(selectCharacterJobDefinition(this.systemDataDatabaseService));
        this.orderedJobsSkillCategoryIds$ = this.characterJob$.pipe(map(jobDefinition => {
            if (jobDefinition) {
                return [jobDefinition.skillCategoryId, ...this.jobsSkillCategoryIds.filter(x => x != jobDefinition.skillCategoryId)];
            }
            return [...this.jobsSkillCategoryIds];
        }));
        this.characterAvailableSkillPoints$ = this.character$.pipe(selectCharacterAvailableSkillPoints(this.systemDataDatabaseService));
        this.haveAvailableSkillPointsOrPendingPoints$ = combineLatest([
            this.characterAvailableSkillPoints$,
            this.character$.pipe(selectHavePendingSkillPoints()),
        ]).pipe(map(([availableSkillPoints, havePendingSkillPoints]: [AvailableSkillPoint, boolean]) => {
            return availableSkillPoints.total > 0 || havePendingSkillPoints;
        }));
    }

    ngOnDestroy(): void {
    }

    validPendingPoints() {
        combineLatest([
            this.character$.pipe(selectCharacterPendingSkills()),
            this.character$.pipe(selectCharacterSkills()),
        ]).pipe(take(1)).subscribe(([pendingSkills, characterSkills]: [CharacterPendingSkillPoints, CharacterSkillPoints]) => {
            let updatedSkills: CharacterSkillPoints = {...characterSkills};
            for (let [categoryId, skillByIds] of Object.entries(pendingSkills)) {
                for (let [id, pendingSkillValue] of Object.entries(skillByIds)) {
                    if (!(categoryId in updatedSkills))
                        updatedSkills = {...updatedSkills, [categoryId]: {}};
                    if (!(id in updatedSkills[categoryId]))
                        updatedSkills[categoryId][id] = {value: 0, prodigy: false, master: false};
                    updatedSkills[categoryId][id].value = +updatedSkills[categoryId][id].value + +pendingSkillValue.value;
                    if (updatedSkills[categoryId][id].value > 3)
                        updatedSkills[categoryId][id].value = 3;
                    updatedSkills[categoryId][id].master ||= pendingSkillValue.master;
                    updatedSkills[categoryId][id].prodigy ||= pendingSkillValue.prodigy;
                }
            }
            this.actorUpdaterService.updateActor(
                this.characterId,
                {
                    system: {
                        skills: updatedSkills,
                        ['-=pendingSkills']: null
                    } as any
                });
        })
    }
}
