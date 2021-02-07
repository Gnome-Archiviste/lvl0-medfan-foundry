import {CharacterDataComputer} from "./character-data-computer.js";
import skillLevels from '../../../data/skills-level.js';

export class SkillsCharacterDataComputer extends CharacterDataComputer {
    static pointTypes = ['general', 'job_combat', 'all', 'master', 'prodigy'];

    /**
     * @override
     */
    compute(actorData) {
        this.countMaximumPoints(actorData);
        this.computeAvailablePoints(actorData)
    }

    /**
     * @param {Lvl0CharacterData} actorData
     */
    countMaximumPoints(actorData) {
        for (const pointType of SkillsCharacterDataComputer.pointTypes) {
            actorData.computedData.skills.maximumSkillPoints[pointType] = 0;
        }

        let skillLevel = skillLevels.find(f => f.jobs.indexOf(actorData.job.id) !== -1);
        if (skillLevel !== undefined) {
            for (let i = 0; i < skillLevel.levels.length && i < actorData.level.value; i++) {
                let points = skillLevel.levels[i].skillPoints.split(' ');
                for (const point of points) {
                    let pointNumber = +(point.substr(0, 1));
                    let pointType = point.substr(1, 1);
                    switch (pointType) {
                        case 'G':
                            actorData.computedData.skills.maximumSkillPoints['general'] += pointNumber;
                            break;
                        case 'C':
                            actorData.computedData.skills.maximumSkillPoints['job_combat'] += pointNumber;
                            break;
                        case 'N':
                            actorData.computedData.skills.maximumSkillPoints['all'] += pointNumber;
                            break;
                        case 'M':
                            actorData.computedData.skills.maximumSkillPoints['master'] += pointNumber;
                            break;
                        case 'P':
                            actorData.computedData.skills.maximumSkillPoints['prodigy'] += pointNumber;
                            break;
                    }
                }
            }
        }
    }

    computeAvailablePoints(actorData) {
        let availableSkillPoints = {};
        for (const pointType of SkillsCharacterDataComputer.pointTypes) {
            availableSkillPoints[pointType] = actorData.computedData.skills.maximumSkillPoints[pointType];
        }

        let usedPoints = this.countUsedPoint(actorData);
        let leftover = 0;

        availableSkillPoints['job_combat'] -= usedPoints.combat;
        availableSkillPoints['job_combat'] -= usedPoints.job;
        if (availableSkillPoints['job_combat'] < 0) {
            leftover += -availableSkillPoints['job_combat'];
            availableSkillPoints['job_combat'] = 0;
        }

        availableSkillPoints['general'] -= usedPoints.general;
        if (availableSkillPoints['general'] < 0) {
            leftover += -availableSkillPoints['general'];
            availableSkillPoints['general'] = 0;
        }

        availableSkillPoints['all'] -= leftover;
        leftover = 0;
        if (availableSkillPoints['all'] < 0) {
            leftover = -availableSkillPoints['all'];
            availableSkillPoints['all'] = 0;
        }

        availableSkillPoints['master'] -= (leftover + usedPoints.master);
        leftover = 0;
        if (availableSkillPoints['master'] < 0) {
            leftover = -availableSkillPoints['master'];
            availableSkillPoints['master'] = 0
        }

        availableSkillPoints['prodigy'] -= leftover;

        actorData.computedData.skills.availableSkillPoints = availableSkillPoints;
    }

    /**
     * @param actorData
     * @return {{general: number, prodigy: number, combat: number, job: number, master: number}}
     */
    countUsedPoint(actorData) {
        let usedPoints = {
            combat: 0,
            job: 0,
            general: 0,
            prodigy: 0,
            master: 0
        }

        for (let [skillCategoryId, skillByCategories] of Object.entries(actorData.skills)) {
            for (let [skillId, value] of Object.entries(skillByCategories)) {
                /**
                 * @type {SkillValue}
                 */
                let skillValue = value;
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
        return usedPoints;
    }
}
