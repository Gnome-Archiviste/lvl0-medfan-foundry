import skills from "../../data/skills.js";

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

    static getSkillSuccessValue(token, skillId) {
        let [skillCategory, skillName] = RollSkillManager.splitSkill(skillId);
        let skillDefinition = RollSkillManager.getSkill(skillCategory, skillName);
        let stat = skillDefinition.stat;
        /** @type {Lvl0CharacterData} */
        let actorData = token.actor.data.data;

        let skillValue = actorData.skills[skillCategory][skillName].value || 0;
        let actorStatValue = actorData.computedData.stats.baseStats[stat].value || 0;

        return +skillValue + +actorStatValue;
    }

    /**
     *
     * @param {Token} token
     * @param {String} skillId
     */
    static async rollSkill(token, skillId) {
        let [skillCategory, skillName] = RollSkillManager.splitSkill(skillId);
        let skillDefinition = RollSkillManager.getSkill(skillCategory, skillName);

        let test = RollSkillManager.getSkillSuccessValue(token, skillId);
        let roll = new Roll('2d6');
        roll.roll();
        let result = +roll.result;
        let success = result !== 12 && (result === 2 || result <= test);

        const messageData = roll.toMessage({}, {create: false});
        let message = '';
        if (success) {
            message = `${skillDefinition.name} (${result} / ${test}): <span style="color: green; font-weight: bold">Succès${result === 2 ? ' critique' : ''}</span>`;
        } else {
            message = `${skillDefinition.name} (${result} / ${test}): <span style="color: darkred; font-weight: bold">Echec${result === 12 ? ' critique' : ''}</span>`;
        }
        messageData.content = `<p>${message} </p> ${await roll.render()}`;
        messageData.speaker = ChatMessage.getSpeaker({token: token});
        await ChatMessage.create(messageData);
    }
}
