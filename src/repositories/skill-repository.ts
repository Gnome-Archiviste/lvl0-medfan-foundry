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
    private getSkillsByCategoryIdsCache?: Record<string, SkillDefinition[]>;
    private skillCategoriesCache?: Record<string, Record<string, SkillDefinition>>;

    getSkillsByCategories(): Record<string, Record<string, SkillDefinition>> {
        if (this.skillCategoriesCache)
            return this.skillCategoriesCache;

        let skillCategories = {};
        for (let [skillCategoryId, categorySkills] of Object.entries(skills)) {
            skillCategories[skillCategoryId] = {};
            for (let skill of categorySkills) {
                skillCategories[skillCategoryId][skill.id] = {
                    ...skill,
                    categoryId: skillCategoryId,
                    skillId: skillCategoryId + '.' + skill.id
                };
            }
        }

        this.skillCategoriesCache = skillCategories;
        return skillCategories;
    }

    getSkillsByCategoryIds(): Record<string, SkillDefinition[]> {
        if (this.getSkillsByCategoryIdsCache)
            return this.getSkillsByCategoryIdsCache;

        let getSkillsByCategoryIds = {};
        for (let [skillCategoryId, categorySkills] of Object.entries(skills)) {
            getSkillsByCategoryIds[skillCategoryId] = categorySkills.map(skill => ({
                ...skill,
                categoryId: skillCategoryId,
                skillId: skillCategoryId + '.' + skill.id
            }));
        }

        this.getSkillsByCategoryIdsCache = getSkillsByCategoryIds;
        return getSkillsByCategoryIds;
    }

    getSkillsByIds(): Record<string, SkillDefinition> {
        if (this.skillsByIdsCache)
            return this.skillsByIdsCache;

        let skillsByIds: Record<string, SkillDefinition> = {};
        for (let [skillCategoryId, categorySkills] of Object.entries(skills)) {
            for (let skill of categorySkills) {
                skillsByIds[skillCategoryId + '.' + skill.id] = {
                    ...skill,
                    categoryId: skillCategoryId,
                    skillId: skillCategoryId + '.' + skill.id
                };
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
        let getSkillsByCategories = this.getSkillsByCategories();
        return getSkillsByCategories[skillCategory][skillName];
    }

    getSkillFromId(skillId: string): SkillDefinition {
        let getSkillsByCategories = this.getSkillsByCategories();
        let [skillCategory, skillName] = this.splitSkill(skillId);
        return getSkillsByCategories[skillCategory][skillName];
    }

    getSkillLevels(): { skillPoints: string }[] {
        return skillsLevel.levels;
    }
}
