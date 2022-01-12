import {SkillScript} from "./skill-script.js";
import {EffectManager} from "../effect-manager.js";

export class RollShieldDamageSkillScript extends SkillScript {
    /**
     * @property {Item} shield
     */
    shield;

    /**
     * @param {Token} token
     * @param {SkillDefinition} skillDefinition
     */
    constructor(token, skillDefinition) {
        super(token, skillDefinition);
    }

    /**
     * @override
     */
    async prepare() {
        let actor = this.token.actor;
        if (!actor)
            throw new Error("Missing actor during prepare");
        let shield = actor.items.find(x => x.data.data.equiped && x.type === 'shield');
        if (!shield) {
            ui.notifications?.error("Vous devez équiper un bouclier pour cette action", {permanent: true});
            return false;
        }
        if (shield.data.type !== 'shield')
            throw new Error(`Expected item to be a shield but it was ${shield.data.type}`);
        if (!shield.data.data.damage) {
            ui.notifications?.error("Aucun dégâts configuré sur ce bouclier", {permanent: true});
            return false;
        }
        this.shield = shield;

        return true;
    }

    /**
     * @override
     */
    async postRoll(roll, result, minSuccessValue, success) {
        let actor = this.token.actor;
        if (!actor)
            throw new Error("Missing actor during postRoll");
        if (actor.type !== 'character')
            throw new Error("Invalid actor type");
        let actorData = actor.data.data;

        let damageRollFormula = this.shield.data.data.damage.replace('phy', actorData.computedData.stats.baseStats.phy.value.toString());
        let damageRoll = await (new Roll(damageRollFormula)).roll({async: true});

        const messageData = roll.toMessage({}, {create: false});

        let message = `<div class="skill-shield-damage-roll-chat">
            <div class="title">${this.skillDefinition.name}</div>
            <div class="test"><i class="fas fa-dice"></i> ${result} / ${minSuccessValue} (${this.getTestResultMessage(success, result)})</div>
            <div class="roll">${await roll.render()}</div>
            <div class="shield">
                <div class="name">${this.shield.name}</div>
                <div class="img"><img src="${this.shield.img}" /></div>
                <div class="danage"><span class="label">Dégâts</span> ${this.shield.data.data.damage}</div>
        `;

        if (success && damageRollFormula.indexOf('d') !== -1)
            message += `<div class="roll">${await damageRoll.render()}</div>`;
        else
            message += `<div class="roll"></div>`;

        message += '</div>';
        let shieldDamage = damageRoll.total;
        if (success) {
            message += `<div class="damage"><i class="fas fa-dice"></i> <span class="label">Dégâts</span> ${damageRollFormula} = ${shieldDamage}</div>`;
        }


        let bonusDamage = 0;
        let effectsWithBonusDamages = EffectManager.getEffectsWithBonusDamage(this.token.actor);
        for (let effectsWithBonusDamage of effectsWithBonusDamages) {
            message += `<div class="effect">${effectsWithBonusDamage.name}: ${effectsWithBonusDamage.value}</span></div>`;
            bonusDamage += effectsWithBonusDamage.value;
        }

        if (success && bonusDamage) {
            message += `<div class="result">Total: <span class="total">${success + shieldDamage}</span></div>`
        }

        message += `</div>`;

        messageData.content = message;
        messageData.speaker = ChatMessage.getSpeaker({token: this.token.document});
        await ChatMessage.create(messageData);
    }
}