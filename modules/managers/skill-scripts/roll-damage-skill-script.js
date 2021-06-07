import {SkillScript} from "./skill-script.js";
import {WeaponSelector} from "../../utils/weapon-selector.js";
import {WeaponDamageRollUtil} from "../../utils/weapon-damage-roll-util.js";

/**
 * @typedef RollDamageSkillScript
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
     * @property {RollDamageSkillScript} data
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

        let [weaponRollFormula, ammunitionRollFormula] = WeaponDamageRollUtil.getWeaponAndAmmunitionDamageRolls(
            this.data.weaponType,
            this.weapon,
            this.ammunition
        );


        const messageData = roll.toMessage({}, {create: false});

        if (success) {
            let damageRoll = new Roll(weaponRollFormula).roll();
            let weaponDamage = damageRoll._total;
            let ammunitionDamage = 0;

            if (useAmmunition) {
                let ammunitionRoll = new Roll(ammunitionRollFormula).roll();
                ammunitionDamage = ammunitionRoll._total;
            }

            let message = this.buildChatMessage(
                result,
                minSuccessValue,
                success,
                weaponRollFormula,
                ammunitionRollFormula,
                weaponDamage,
                ammunitionDamage
            );
            messageData.content = `${message}
                <p>${await roll.render()}</p>
                <p>${await damageRoll.render()}</p>`;

        } else {

            let message = this.buildChatMessage(result, minSuccessValue, success, weaponRollFormula, ammunitionRollFormula);
            messageData.content = `${message}<p>${await roll.render()}</p>`;
        }

        messageData.speaker = ChatMessage.getSpeaker({token: this.token});
        await ChatMessage.create(messageData);

        return true;
    }

    buildChatMessage(result, minSuccessValue, success, weaponRollFormula, ammunitionRollFormula, weaponDamage, ammunitionDamage) {
        let message = `<div class="skill-roll-damage">
            <div class="title">${this.skillDefinition.name}</div>
            <div class="test"><i class="fas fa-dice-d20"></i> ${result} / ${minSuccessValue} (${this.getTestResultMessage(success, result)})</div>`;

        let weaponDamageText = weaponRollFormula;
        if (this.weapon.data.data.element) {
            weaponDamageText += ` (${this.weapon.data.data.element})`
        }
        if (success) {
            weaponDamageText += ' = ' + weaponDamage;
        }
        message += `<div class="weapon item">
            <div class="name">${this.weapon.name}</div>
            <img class="img" src="${this.weapon.img}" />
            <div class="damage"><i class="fas fa-dice-d20"></i> ${weaponDamageText}</div>
        </div>`;

        if (this.ammunition) {
            let ammunitionDamageText = ammunitionRollFormula;
            if (this.ammunition.data.data.extraDamageEffect) {
                ammunitionDamageText += ` (${this.ammunition.data.data.extraDamageEffect})`;
            }
            if (success) {
                ammunitionDamageText += ' = ' + ammunitionDamage;
            }
            message += `<div class="ammunition item">
                <div class="name">${this.ammunition.name}</div>
                <img class="img" src="${this.ammunition.img}" />
                <div class="damage"><i class="fas fa-dice-d20"></i> ${ammunitionDamageText}</div>
            </div>`;
        }

        if (success) {
            message += `<div class="result">Total: <span class="total">${weaponDamage + ammunitionDamage}</span></div>`;
        }

        message += '</div>';

        return message;
    }

    /**
     * @param {boolean} success
     * @param {number} result
     * @return {string}
     */
    getTestResultMessage(success, result) {
        if (success)
            return `<span style="color: green; font-weight: bold">Succès${result === 2 ? ' critique' : ''}</span>`;
        else
            return `<span style="color: darkred; font-weight: bold">Echec${result === 12 ? ' critique' : ''}</span>`;
    }
}
