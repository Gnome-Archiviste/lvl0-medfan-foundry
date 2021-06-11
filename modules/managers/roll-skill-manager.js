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
     * @param skillId
     * @return {*}
     */
    static getSkillSuccessValue(actorData, skillId) {
        let [skillCategory, skillName] = RollSkillManager.splitSkill(skillId);
        let skillDefinition = RollSkillManager.getSkill(skillCategory, skillName);
        let stat = skillDefinition.stat;

        let skillValue = actorData.skills[skillCategory][skillName].value || 0;
        let actorStatValue = actorData.computedData.stats.baseStats[stat].value || 0;
        let extraSkillPoint = actorData.computedData.skills.extraSkills.indexOf(skillId) !== -1;

        return +skillValue + +actorStatValue + (extraSkillPoint ? 1 : 0);
    }

    /**
     * @param {Token} token
     * @param {String} skillId
     * @return boolean
     */
    static async rollSkill(token, skillId) {
        if (!token) {
            ui.notifications.error('Sélectionnez un token avant de faire cette action');
            return false;
        }

        let [skillCategory, skillName] = RollSkillManager.splitSkill(skillId);
        let skillDefinition = RollSkillManager.getSkill(skillCategory, skillName);

        let skillScript = new SkillScriptFactory().getScriptByName(token, skillDefinition);

        if (!await skillScript.prepare())
            return false;

        let minSuccessValue = RollSkillManager.getSkillSuccessValue(token.actor.data.data, skillId);
        let roll = new Roll('2d6');
        roll.roll();
        let result = +roll.result;
        let success = result !== 12 && (result === 2 || result <= minSuccessValue);

        await skillScript.postRoll(roll, result, minSuccessValue, success);

        return success;
    }
}
