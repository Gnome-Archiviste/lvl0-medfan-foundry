import {singleton} from 'tsyringe';
import skills, {SkillDefinition} from './data/skills';
import skillsLevel from './data/skills-level';
import {Injectable} from '@angular/core';

@singleton()
@Injectable({
    providedIn: 'root'
})
export class SkillRepository {
    private skillsByIdsCache?: Record<string, SkillDefinition>;

    getSkillsByCategories(): Record<string, Record<string, SkillDefinition>> {
        return skills;
    }

    getSkillsByIds(): Record<string, SkillDefinition> {
        if (this.skillsByIdsCache)
            return this.skillsByIdsCache;

        let skillsByIds: Record<string, SkillDefinition> = {};
        for (let [skillCategoryId, categorySkills] of Object.entries(skills)) {
            for (let [skillId, skill] of Object.entries(categorySkills)) {
                skillsByIds[skillCategoryId + '.' + skillId] = skill;
            }
        }

        this.skillsByIdsCache = skillsByIds;
        return skillsByIds;
    }

    getSkillsNamesByIds(): Record<string, string> {
        let skillsNamesById = {};
        for (let [id, skill] of Object.entries(this.getSkillsByIds())) {
            skillsNamesById[id] = skill.name;
        }
        return skillsNamesById;
    }

    splitSkill(skillId: string): [skillCategory: string, skillName: string] {
        let [skillCategory, skillName] = skillId.split('.', 2);
        return [skillCategory, skillName];
    }

    getSkill(skillCategory: string, skillName: string): SkillDefinition {
        return skills[skillCategory][skillName];
    }

    getSkillFromId(skillId: string): SkillDefinition {
        let [skillCategory, skillName] = this.splitSkill(skillId);
        return skills[skillCategory][skillName];
    }

    getSkillLevels(): { skillPoints: string }[] {
        return skillsLevel.levels;
    }
}
