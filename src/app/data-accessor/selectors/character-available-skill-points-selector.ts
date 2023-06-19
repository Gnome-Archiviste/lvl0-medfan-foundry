import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {
    CharacterPendingSkillPoints,
    CharacterSkillPoints,
    LevelValue,
    Lvl0Character, PendingSkillValue,
    SkillValue
} from '../models/lvl0-character';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterLevel, selectCharacterPendingSkills, selectCharacterSkills} from './character-selectors';
import _ from 'lodash';

export type SkillPointType = 'general' | 'job_combat' | 'all' | 'master' | 'prodigy';
export type UsedSkillPointType = 'combat' | 'job' | 'general' | 'prodigy' | 'master';
export type AvailableSkillPoint = {
    availableSkillPoints: Record<SkillPointType, number>;
    total: number;
}

export class CharacterAvailableSkillPointsSelector {
    static pointTypes: SkillPointType[] = ['general', 'job_combat', 'all', 'master', 'prodigy'];

    public static selectAvailableSkillPoints(
        characterLevel: LevelValue,
        characterSkills: CharacterSkillPoints,
        characterPendingSkills: CharacterPendingSkillPoints,
        systemDataDatabaseService: SystemDataDatabaseService,
    ): AvailableSkillPoint {
        let maximumSkillPoints = this.countMaximumSkillPoints(characterLevel, systemDataDatabaseService);
        let availableSkillPoints = this.computeAvailablePoints(characterSkills, characterPendingSkills, maximumSkillPoints);
        return {
            availableSkillPoints: availableSkillPoints,
            total: Object.values(availableSkillPoints).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
        };
    }

    private static countMaximumSkillPoints(level: LevelValue, systemDataDatabaseService: SystemDataDatabaseService): Record<SkillPointType, number> {
        let maximumSkillPoints = {all: 0, general: 0, job_combat: 0, master: 0, prodigy: 0};

        let skillLevels = systemDataDatabaseService.skillRepository.getSkillLevels();
        for (let i = 0; i < skillLevels.length && i < level.value; i++) {
            let points = skillLevels[i].skillPoints.split(' ');
            for (const point of points) {
                let pointNumber = +(point[0]);
                let pointType = point[1];
                switch (pointType) {
                    case 'G':
                        maximumSkillPoints['general'] += pointNumber;
                        break;
                    case 'C':
                        maximumSkillPoints['job_combat'] += pointNumber;
                        break;
                    case 'N':
                        maximumSkillPoints['all'] += pointNumber;
                        break;
                    case 'M':
                        maximumSkillPoints['master'] += pointNumber;
                        break;
                    case 'P':
                        maximumSkillPoints['prodigy'] += pointNumber;
                        break;
                }
            }
        }
        return maximumSkillPoints;
    }

    private static computeAvailablePoints(
        characterSkills: CharacterSkillPoints,
        characterPendingSkills: CharacterPendingSkillPoints,
        maximumSkillPoints: Record<SkillPointType, number>
    ) {

        let availableSkillPoints: Record<SkillPointType, number> = {all: 0, general: 0, job_combat: 0, master: 0, prodigy: 0};
        for (const pointType of CharacterAvailableSkillPointsSelector.pointTypes) {
            availableSkillPoints[pointType] = maximumSkillPoints[pointType];
        }

        let usedPoints = this.countUsedPoint(characterSkills, characterPendingSkills);
        let leftover = 0;

        availableSkillPoints.job_combat -= usedPoints.combat;
        availableSkillPoints.job_combat -= usedPoints.job;
        if (availableSkillPoints.job_combat < 0) {
            leftover += -availableSkillPoints.job_combat;
            availableSkillPoints.job_combat = 0;
        }

        availableSkillPoints.general -= usedPoints.general;
        if (availableSkillPoints.general < 0) {
            leftover += -availableSkillPoints.general;
            availableSkillPoints.general = 0;
        }

        availableSkillPoints.all -= leftover;
        leftover = 0;
        if (availableSkillPoints.all < 0) {
            leftover = -availableSkillPoints.all;
            availableSkillPoints.all = 0;
        }

        availableSkillPoints.master -= (leftover + usedPoints.master);
        leftover = 0;
        if (availableSkillPoints.master < 0) {
            leftover = -availableSkillPoints.master;
            availableSkillPoints.master = 0
        }

        availableSkillPoints.prodigy -= (leftover + usedPoints.prodigy);

        return availableSkillPoints;
    }


    private static countUsedPoint(
        characterSkills: CharacterSkillPoints,
        characterPendingSkills: CharacterPendingSkillPoints
    ): Record<UsedSkillPointType, number> {
        let usedPoints: Record<UsedSkillPointType, number> = {
            combat: 0,
            job: 0,
            general: 0,
            prodigy: 0,
            master: 0
        }

        for (let [skillCategoryId, skillByCategories] of Object.entries(characterSkills)) {
            for (let [_, skillValue] of Object.entries(skillByCategories) as [string, SkillValue][]) {
                if (skillValue.prodigy) {
                    usedPoints.prodigy++;
                }
                if (skillValue.master) {
                    usedPoints.master++;
                }
                switch (skillCategoryId) {
                    case 'general':
                        usedPoints.general += +skillValue.value;
                        break;
                    case 'combat':
                        usedPoints.combat += +skillValue.value;
                        break;
                    default:
                        usedPoints.job += +skillValue.value;
                        break;
                }
            }
        }

        for (let [skillCategoryId, skillByCategories] of Object.entries(characterPendingSkills)) {
            for (let [_, skillValue] of Object.entries(skillByCategories) as [string, PendingSkillValue][]) {
                if (skillValue.prodigy) {
                    usedPoints.prodigy++;
                }
                if (skillValue.master) {
                    usedPoints.master++;
                }
                let job = +(skillValue.value ?? 0);
                switch (skillCategoryId) {
                    case 'general':
                        usedPoints.general += job;
                        break;
                    case 'combat':
                        usedPoints.combat += job;
                        break;
                    default:
                        usedPoints.job += job;
                        break;
                }
            }
        }
        return usedPoints;
    }
}

export function selectCharacterAvailableSkillPoints(systemDataDatabaseService: SystemDataDatabaseService) {
    return function (source: Observable<Lvl0Character>): Observable<AvailableSkillPoint> {
        return new Observable<AvailableSkillPoint>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterLevel()),
                source.pipe(selectCharacterSkills()),
                source.pipe(selectCharacterPendingSkills()),
            ]).subscribe({
                next: ([level, skills, characterPendingSkills]: [LevelValue, CharacterSkillPoints, CharacterPendingSkillPoints]) => {
                    subscriber.next(CharacterAvailableSkillPointsSelector.selectAvailableSkillPoints(level, skills, characterPendingSkills, systemDataDatabaseService));
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        }).pipe(
            distinctUntilChanged((a, b) => _.isEqual(a, b)),
            shareReplay(1)
        );
    };
}
