import {CharacterDataComputer} from "./character-data-computer.js";
import skillLevels from '../../../data/skills-level.js';
import {Lvl0ActorEffect} from '../../managers/effects/lvl0-actor-effect';
import {SkillDefinition} from '../../models/all';
import {SkillValue} from '../../models/data/skill/skill';

export class SkillsCharacterDataComputer extends CharacterDataComputer {
    static pointTypes = ['general', 'job_combat', 'all', 'master', 'prodigy'];

    /**
     * @override
     */
    compute(actorData, actor) {
        this.countMaximumPoints(actorData);
        this.computeAvailablePoints(actorData);
        this.computeExtraSkills(actorData, actor);

        let skillModifiers = {};
        if (actorData.effects) {
            for (let effect of Object.values(actorData.effects) as Lvl0ActorEffect[]) {
                for (let modifier of effect.modifiers) {
                    if (modifier.skill)
                        skillModifiers[modifier.skill] = (skillModifiers[modifier.skill] || 0) + modifier.value;
                }
            }
        }
        actorData.computedData.skills.skillModifiers = skillModifiers;
    }

    /**
     * @param {Lvl0CharacterData} actorData
     */
    countMaximumPoints(actorData) {
        for (const pointType of SkillsCharacterDataComputer.pointTypes) {
            actorData.computedData.skills.maximumSkillPoints[pointType] = 0;
        }

        for (let i = 0; i < skillLevels.levels.length && i < actorData.level.value; i++) {
            let points = skillLevels.levels[i].skillPoints.split(' ');
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

        availableSkillPoints['prodigy'] -= (leftover + usedPoints.prodigy);
        availableSkillPoints['total'] = Object.values(availableSkillPoints).reduce((acc: number, cur: number) => acc + cur, 0);

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

        for (let [skillCategoryId, skillByCategories] of Object.entries(actorData.skills) as [string, {[skillId: string]: SkillValue}][]) {
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
        return usedPoints;
    }

    computeExtraSkills(actorData, actor) {
        let extraSkillIds: string[] = [];
        for (let item of actor.items) {
            if (!item.data.data.equiped)
                continue;

            if (typeof item.data.data.extraSkills === 'object') {
                for (let extraSkill of Object.values(item.data.data.extraSkills) as {id: string}[]) {
                    extraSkillIds.push(extraSkill.id);
                }
            }
        }

        if (actorData.computedData.bases.race?.extraSkillIds) {
            extraSkillIds = [...extraSkillIds].concat(actorData.computedData.bases.race?.extraSkillIds);
        }

        actorData.computedData.skills.extraSkills = extraSkillIds;
    }
}
