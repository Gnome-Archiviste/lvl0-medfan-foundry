import skills from "../../data/skills.js";
import {SkillScriptFactory} from "./skill-scripts/skill-script-factory.js";

export class RollSkillManager {
    /**
     * @param {String} skillId
     * @return [string, string]
     */
    static splitSkill(skillId) {
        return skillId.split('.');
    }

    /**
     * @param {string} skillCategory
     * @param {string} skillName
     * @return {SkillDefinition}
     */
    static getSkill(skillCategory, skillName) {
        return skills[skillCategory][skillName];
    }

    static getSkillFromId(skillId) {
        let [skillCategory, skillName] = RollSkillManager.splitSkill(skillId);
        return skills[skillCategory][skillName];
    }

    /**
     * @param {Lvl0CharacterData} actorData
     * @param {string} skillId
     * @return {number}
     */
    static getSkillSuccessValue(actorData, skillId) {
        let [skillCategory, skillName] = RollSkillManager.splitSkill(skillId);
        let skillDefinition = RollSkillManager.getSkill(skillCategory, skillName);
        let stat = skillDefinition.stat;

        let skillValue = actorData.skills[skillCategory]?.[skillName]?.value || 0;
        let actorStatValue = actorData.computedData.stats.baseStats[stat].value || 0;
        let extraSkillPoint = actorData.computedData.skills.extraSkills.indexOf(skillId) !== -1;
        let skillModifier = (skillId in actorData.computedData.skills.skillModifiers)
            ? actorData.computedData.skills.skillModifiers[skillId]
            : 0;

        return +skillValue + +actorStatValue + (extraSkillPoint ? 1 : 0) + skillModifier;
    }

    static async rollSkill(token: Token, skillId: string, options = {}): Promise<boolean> {
        if (!token) {
            ui.notifications?.error('Sélectionnez un token avant de faire cette action');
            return false;
        }

        let [skillCategory, skillName] = RollSkillManager.splitSkill(skillId);
        let skillDefinition = RollSkillManager.getSkill(skillCategory, skillName);

        let skillScript = new SkillScriptFactory().createScript(token, skillDefinition, options);

        if (!await skillScript.prepare())
            return false;

        let actor = token.actor;
        if (!actor)
            throw new Error('Missing actor on token');
        let minSuccessValue = RollSkillManager.getSkillSuccessValue(actor.data.data, skillId);
        let roll = new Roll('2d6');
        await roll.roll({async: true});
        let result = +roll.result;
        let success = result !== 12 && (result === 2 || result <= minSuccessValue);

        await skillScript.postRoll(roll, result, minSuccessValue, success);

        return success;
    }
}
