import skills, {SkillDefinition} from './data/skills';
import skillsLevel from './data/skills-level';

export class SkillRepository {
    private static skillsByIdsCache?: Record<string, SkillDefinition>;

    static getSkillsByCategories(): Record<string, Record<string, SkillDefinition>> {
        return skills;
    }

    static getSkillsByIds(): Record<string, SkillDefinition> {
        if (SkillRepository.skillsByIdsCache)
            return SkillRepository.skillsByIdsCache;

        let skillsByIds: Record<string, SkillDefinition> = {};
        for (let [skillCategoryId, categorySkills] of Object.entries(skills)) {
            for (let [skillId, skill] of Object.entries(categorySkills)) {
                skillsByIds[skillCategoryId + '.' + skillId] = skill;
            }
        }

        SkillRepository.skillsByIdsCache = skillsByIds;
        return skillsByIds;
    }


    static splitSkill(skillId: string): [skillCategory: string, skillName: string] {
        let [skillCategory, skillName] = skillId.split('.', 2);
        return [skillCategory, skillName];
    }

    static getSkill(skillCategory: string, skillName: string): SkillDefinition {
        return skills[skillCategory][skillName];
    }

    static getSkillFromId(skillId: string): SkillDefinition {
        let [skillCategory, skillName] = SkillRepository.splitSkill(skillId);
        return skills[skillCategory][skillName];
    }

    static getSkillLevels(): { skillPoints: string }[] {
        return skillsLevel.levels;
    }
}
