import {SkillScript} from "./skill-script.js";

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
        let shield = this.token.actor.items.find(x => x.data.data.equiped && x.type === 'shield');
        if (!shield) {
            ui.notifications.error("Vous devez équiper un bouclier pour cette action", {permanent: true});
            return false;
        }
        if (!shield.data.data.damage) {
            ui.notifications.error("Aucun dégâts configuré sur ce bouclier", {permanent: true});
            return false;
        }
        this.shield = shield;

        return true;
    }

    /**
     * @override
     */
    async postRoll(roll, result, minSuccessValue, success) {
        /** @type {Lvl0CharacterData} */
        let actorData = this.token.actor.data.data;

        let damageRollFormula = this.shield.data.data.damage.replace('phy', actorData.computedData.stats.baseStats.phy.value.toString());
        let damageRoll = new Roll(damageRollFormula).roll();

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
        if (success) {
            message += `<div class="damage"><i class="fas fa-dice"></i> <span class="label">Dégâts</span> ${damageRollFormula} = ${damageRoll._total}</div>`;
        }
        message += `</div>`;

        messageData.content = message;
        messageData.speaker = ChatMessage.getSpeaker({token: this.token});
        await ChatMessage.create(messageData);
    }
}
