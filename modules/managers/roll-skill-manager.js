import skills from "../../data/skills.js";
import {WeaponSelector} from "../utils/weapon-selector.js";

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
        if (!token) {
            ui.notifications.error('Sélectionnez un token avant de faire cette action');
            return;
        }
        let [skillCategory, skillName] = RollSkillManager.splitSkill(skillId);
        let skillDefinition = RollSkillManager.getSkill(skillCategory, skillName);

        let weapon = undefined;
        let ammunition = undefined;

        if (skillDefinition.damageRoll && skillDefinition.damageRoll.weaponType) {
            [weapon, ammunition] = await WeaponSelector.selectWeapon(token, skillDefinition.damageRoll.weaponType);
            if (!weapon)
                return;
        }

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

        if (ammunition) {
            await ammunition.update({
                data: {
                    quantity: Math.max(0, ammunition.data.data.quantity - 1)
                }
            }, {diff: true});
        }
        await ChatMessage.create(messageData);

        if (success && weapon) {
            let damageRollStr = weapon.data.data.damage.split(' ').join();
            let weaponMessage = `Dégât: ${weapon.name}`;
            if (ammunition) {
                damageRollStr = '(' + damageRollStr + '+' + ammunition.data.data.extraDamage.split(' ').join() + ')';
                weaponMessage += '(' + ammunition.name + ')';
            }

            let damageRoll = new Roll(damageRollStr)
            damageRoll.roll();

            const messageData = roll.toMessage({}, {create: false});
            messageData.content = `<p>${weaponMessage} </p> ${await damageRoll.render()}`;
            messageData.speaker = ChatMessage.getSpeaker({token: token});
            await ChatMessage.create(messageData);
        }

    }
}
