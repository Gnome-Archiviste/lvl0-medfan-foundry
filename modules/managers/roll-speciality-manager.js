import {RollSkillManager} from "./roll-skill-manager.js";

export class RollSpecialityManager {
    static async rollSpeciality(token, specialityId) {
        if (specialityId === 'arrow_volley') {
            await RollSpecialityManager.rollArrowVolley(token);
        }
    }

    /**
     * @param {Token} token
     * @return {Promise<void>}
     */
    static async rollArrowVolley(token) {
        /** @type {Lvl0CharacterData} */
        let actorData = token.actor.data.data;

        let successRollValue = RollSkillManager.getSkillSuccessValue(token, 'combat.throw_shoot');
        let damageRoll = '1d6+2'; // FIXME: Open dialog and ask which weapon to use

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
                    message += `<p>Flèche ${i + 1}: Échec <span style="color: darkred">✕</span> (${result})</p>`
                } else {
                    successCount++;
                    rollsResult.push('success');
                    if (result === 2) {
                        message += `<p>Flèche ${i + 1}: <strong><span style="color: green">Succès critique</span></strong></p>`
                    } else {
                        message += `<p>Flèche ${i + 1}: Succès <span style="color: forestgreen">✓</span> (${result})</p>`
                    }
                }
            }
        }

        const messageData = roll.toMessage({}, {create: false});
        messageData.content = `${message} ${await roll.render()}`
        await ChatMessage.create(messageData);

        if (successCount) {
            const rollFreeze = new Roll(`{${Array(successCount).fill('1d6[ice]').join(',')}`);
            rollFreeze.roll();
            let freezingArrows = [];
            let rollIndex = 0;
            for (let i = 0; i < rollsResult.length; i++) {
                if (rollsResult[i] !== 'success')
                    continue;
                let result = rollFreeze.terms[0].results[rollIndex].result;
                if (result <= 2) {
                    freezingArrows.push(i + 1);
                }
                rollIndex++;
            }
            const freezeMessageData = rollFreeze.toMessage({}, {create: false});
            let freezeMessage = '';
            if (freezingArrows.length > 1) {
                freezeMessage = `Les flèches ${freezingArrows.join(',')} gèlent leur cible (résilience possible)`
            } else if (freezingArrows.length === 1) {
                freezeMessage = `La flèche ${freezingArrows.join(',')} gèle sa cible (résilience possible)`
            } else {
                freezeMessage = `Aucune flèche ne gèlent leur cible`
            }
            freezeMessageData.content = `<p>${freezeMessage}</p> ${await rollFreeze.render()}`
            await ChatMessage.create(freezeMessageData);
        }

        if (successCount) {
            const rollDamage = new Roll(`{${Array(successCount).fill(damageRoll).join(',')}`);
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
        }
    }
}

