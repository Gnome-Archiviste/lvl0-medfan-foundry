import {SkillScript} from "./skill-script.js";
import {WeaponSelector} from "../../utils/weapon-selector.js";
import {WeaponDamageRollUtil} from "../../utils/weapon-damage-roll-util.js";
import {ElementsUtil} from "../../utils/elements-util.js";
import {EffectManager} from "../effect-manager.js";

/**
 * @typedef RollDamageSkillScriptData
 * @property {'range'|'melee'} weaponType
 */

export class RollDamageSkillScript extends SkillScript {
    /**
     * @private
     * @property {Item|undefined} ammunition
     */
    ammunition;
    /**
     * @private
     * @property {Item|undefined} weapon
     */
    weapon;
    /**
     * @private
     * @property {RollDamageSkillScriptData} data
     */
    data;

    /**
     * @param {Token} token
     * @param {SkillDefinition} skillDefinition
     */
    constructor(token, skillDefinition) {
        super(token, skillDefinition);
        this.data = skillDefinition.script.data;
    }

    /**
     * @override
     */
    async prepare() {
        let [weapon, ammunition] = await WeaponSelector.selectWeapon(this.token, this.data.weaponType);
        this.weapon = weapon;
        this.ammunition = ammunition;
        return !!weapon;
    }

    /**
     * @override
     */
    async postRoll(roll, result, minSuccessValue, success) {
        let useAmmunition = false;
        if (this.ammunition) {
            if (this.ammunition.data.data.quantity <= 0) {
                ui.notifications.warn(`Vous n'avez plus assez de ${this.ammunition.name}.`)
                this.ammunition = undefined;
            } else {
                useAmmunition = true;
                // FIXME: Create an helper for this
                await this.ammunition.update({
                    data: {
                        quantity: Math.max(0, this.ammunition.data.data.quantity - 1)
                    }
                }, {diff: true});
            }
        }

        let criticalSuccess = result === 2;
        let epicFail = result === 12;

        let [weaponRollFormula, ammunitionRollFormula] = WeaponDamageRollUtil.getWeaponAndAmmunitionDamageRolls(
            this.data.weaponType,
            this.weapon,
            this.ammunition
        );

        if (this.data.charge) {
            weaponRollFormula = '(' + weaponRollFormula + ')*2'
        }

        const messageData = roll.toMessage({}, {create: false});

        if (success || epicFail) {
            let weaponRoll = await (new Roll(weaponRollFormula)).roll({async: true});
            let weaponDamage = weaponRoll._total;
            let ammunitionDamage = 0;
            let ammunitionRoll = undefined;

            if (useAmmunition) {
                ammunitionRoll = await (new Roll(ammunitionRollFormula)).roll({async: true});
                ammunitionDamage = ammunitionRoll._total;
            }

            let effectsWithBonusDamages = EffectManager.getEffectsWithBonusDamage(this.token.actor);

            messageData.content = await this.buildChatMessage(
                roll,
                result,
                minSuccessValue,
                success,
                weaponRollFormula,
                ammunitionRollFormula,
                weaponDamage,
                ammunitionDamage,
                weaponRoll,
                ammunitionRoll,
                effectsWithBonusDamages
            );

        } else {
            messageData.content = await this.buildChatMessage(
                roll,
                result,
                minSuccessValue,
                success,
                weaponRollFormula,
                ammunitionRollFormula
            );
        }

        messageData.speaker = ChatMessage.getSpeaker({token: this.token.document});
        await ChatMessage.create(messageData);

        return true;
    }

    async buildChatMessage(
        roll,
        result,
        minSuccessValue,
        success,
        weaponRollFormula,
        ammunitionRollFormula,
        weaponDamage,
        ammunitionDamage,
        weaponRoll,
        ammunitionRoll,
        effectsWithBonusDamages
    ) {
        let message = `<div class="skill-roll-damage">
            <div class="title">${this.skillDefinition.name}</div>
            <div class="test"><i class="fas fa-dice"></i> ${result} / ${minSuccessValue} (${this.getTestResultMessage(success, result)})</div>
            <div class="roll">${await roll.render()}</div>
        `;

        let weaponDamageText = weaponRollFormula;
        if (this.weapon.data.data.element) {
            weaponDamageText += ` (${ElementsUtil.getNameForWeapon(this.weapon.data.data.element)})`;
        }
        if (success) {
            weaponDamageText += ' = ' + weaponDamage;
        }
        message += `<div class="weapon item">
            <div class="name">${this.weapon.name}</div>
            <img class="img" src="${this.weapon.img}" />
            <div class="damage"><i class="fas fa-dice"></i> ${weaponDamageText}</div>`;
        if (success) {
            message += `<div class="roll">${await weaponRoll.render()}</div>`;
        }
        message += `</div>`;

        if (this.ammunition) {
            let ammunitionDamageText = ammunitionRollFormula;
            if (this.ammunition.data.data.extraDamageEffect) {
                ammunitionDamageText += ` (${ElementsUtil.getNameForWeapon(this.ammunition.data.data.extraDamageEffect)})`;
            }
            if (success) {
                ammunitionDamageText += ' = ' + ammunitionDamage;
            }
            message += `<div class="ammunition item">
                <div class="name">${this.ammunition.name}</div>
                <img class="img" src="${this.ammunition.img}" />
                <div class="damage"><i class="fas fa-dice"></i> ${ammunitionDamageText}</div>`;

            if (success) {
                message += `<div class="roll">${await ammunitionRoll.render()}</div>`;
            }
            message += '</div>';
        }

        if (success) {
            let bonusDamage = 0;
            for (let effectsWithBonusDamage of effectsWithBonusDamages) {
                message += `<div class="effect">${effectsWithBonusDamage.name}: ${effectsWithBonusDamage.value}</span></div>`;
                bonusDamage += effectsWithBonusDamage.value;
            }

            message += `<div class="result">Total: <span class="total">${weaponDamage + ammunitionDamage + bonusDamage}</span></div>`;
        }

        message += '</div>';

        return message;
    }
}
