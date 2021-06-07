import {RollSkillManager} from "./roll-skill-manager.js";
import {WeaponSelector} from "../utils/weapon-selector.js";
import {WeaponDamageRollUtil} from "../utils/weapon-damage-roll-util.js";
import specialitiesDefinitions from "../../data/specialities.js";

/**
 * @typedef SpecialityDefinition
 * @property {string} name
 * @property {string} description
 */

export class RollSpecialityManager {
    /**
     * @param {string} specialityId
     * @return {SpecialityDefinition}
     */
    static getSpecialityFromId(specialityId) {
        return specialitiesDefinitions[specialityId];
    }

    /**
     * @param {Token} token
     * @param {string} specialityId
     * @return {Promise<boolean>}
     */
    static async rollSpeciality(token, specialityId) {
        if (specialityId === 'arrow_volley') {
            return await RollSpecialityManager.rollArrowVolley(token);
        }
        return false;
    }

    /**
     * @param {Token} token
     * @return {Promise<boolean>}
     */
    static async rollArrowVolley(token) {
        if (!token) {
            ui.notifications.error('Sélectionnez un token avant de faire cette action');
            return false;
        }

        return new Promise(async resolve => {
            let successRollValue = RollSkillManager.getSkillSuccessValue(token, 'combat.throw_shoot');
            let [weapon, ammunition] = await WeaponSelector.selectWeapon(token, 'range');
            if (!weapon) {
                resolve(false);
                return;
            }

            const roll = new Roll(`{2d6,2d6,2d6,2d6`);
            roll.roll();

            let successCount = 0;
            let rollsResult = [];
            let message = '<p><h3>Volée de flèche</h3></p>';
            for (let i = 0; i < 4; i++) {
                let result = roll.terms[0].results[i].result;
                if (result === 12) {
                    rollsResult.push('epicFail');
                    message += `<p>Flèche ${i + 1}: <strong><span style="color: darkred;">Échec critique</span></strong></p>`
                    break;
                } else {
                    if (result > successRollValue) {
                        rollsResult.push('fail');
                        message += `<p>Flèche ${i + 1}: Échec <span style="color: darkred">✕</span> (${result})</p>`;
                    } else {
                        successCount++;
                        rollsResult.push('success');
                        if (result === 2) {
                            message += `<p>Flèche ${i + 1}: <strong><span style="color: green">Succès critique</span></strong></p>`;
                        } else {
                            message += `<p>Flèche ${i + 1}: Succès <span style="color: forestgreen">✓</span> (${result})</p>`;
                        }
                    }
                }
            }

            const messageData = roll.toMessage({}, {create: false});
            messageData.content = `${message} ${await roll.render()}`
            await ChatMessage.create(messageData);

            let [damageRoll, damageRollWithAmmunition] = WeaponDamageRollUtil.getWeaponDamageRoll('range', weapon, ammunition);
            let availableAmmunitionQuantity = 0;
            if (ammunition) {
                availableAmmunitionQuantity = ammunition.data.data.quantity;
            }

            if (successCount) {
                let rolls = [];
                for (let i = 0; i < successCount; i++) {
                    if (availableAmmunitionQuantity > i)
                        rolls.push(damageRollWithAmmunition);
                    else
                        rolls.push(damageRoll);
                }

                const rollDamage = new Roll(`{${rolls.join(',')}}`);
                rollDamage.roll();
                let rollIndex = 0;
                let damageMessage = '';
                let total = 0;

                for (let i = 0; i < rollsResult.length; i++) {
                    if (rollsResult[i] !== 'success')
                        continue;
                    let result = rollDamage.terms[0].results[rollIndex].result;
                    damageMessage += `<p>Flèche ${i + 1}: ${result} dégâts</p>`;
                    total += result;
                    rollIndex++;
                }
                const damageMessageData = rollDamage.toMessage({}, {create: false});
                damageMessageData.content = `${damageMessage} ${await rollDamage.render()}`
                await ChatMessage.create(damageMessageData);

                if (ammunition) {
                    await ammunition.update({
                        data: {
                            quantity: Math.max(0, ammunition.data.data.quantity - successCount)
                        }
                    }, {diff: true});
                }
            }

            resolve(true);
        })
    }
}

