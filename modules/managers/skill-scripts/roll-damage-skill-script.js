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

        await super.postRoll(roll, result, minSuccessValue, success);

        if (success) {
            let [damageRollFormula, damageRollWithAmmunitionFormula] = WeaponDamageRollUtil.getWeaponDamageRoll(
                this.data.weaponType,
                this.weapon,
                this.ammunition
            );

            let weaponMessage = `Dégât: ${this.weapon.name}`;
            if (useAmmunition) {
                weaponMessage += '(' + this.ammunition.name + ')';
                damageRollFormula = damageRollWithAmmunitionFormula;
            }

            let damageRoll = new Roll(damageRollFormula)
            damageRoll.roll();

            const messageData = roll.toMessage({}, {create: false});
            messageData.content = `<p>${weaponMessage} </p> ${await damageRoll.render()}`;
            messageData.speaker = ChatMessage.getSpeaker({token: this.token});
            await ChatMessage.create(messageData);
        }

        return true;
    }
}
