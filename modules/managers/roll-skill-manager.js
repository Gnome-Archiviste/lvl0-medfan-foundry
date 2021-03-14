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

    /**
     *
     * @param {Token} token
     * @param {String} skillId
     */
    static async rollSkill(token, skillId) {
        let [skillCategory, skillName] = RollSkillManager.splitSkill(skillId);
        let skillDefinition = RollSkillManager.getSkill(skillCategory, skillName);
        let stat = skillDefinition.stat;
        /** @type {Lvl0CharacterData} */
        let actorData = token.actor.data.data;

        let skillValue = actorData.skills[skillCategory][skillName].value || 0;
        let actorStatValue = actorData.computedData.stats.baseStats[stat].value || 0;

        let test = +skillValue + +actorStatValue;
        let roll = new Roll('2d6');
        roll.roll();
        let success = roll.result <= test;

        const messageData = roll.toMessage({}, {create: false});
        let message = '';
        if (success) {
            message = `${skillDefinition.name}: <span style="color: green; font-weight: bold">Succès</span>`;
        } else {
            message = `${skillDefinition.name}: <span style="color: darkred; font-weight: bold">Echec</span>`;
        }
        messageData.content = `<p>${message} </p> ${await roll.render()}`;
        messageData.speaker = ChatMessage.getSpeaker({token: token});
        await ChatMessage.create(messageData);
    }
}
