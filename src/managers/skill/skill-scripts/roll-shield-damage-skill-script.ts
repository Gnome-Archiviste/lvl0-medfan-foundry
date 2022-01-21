import {SkillScript, SkillTestRollResult} from "./skill-script";
import {EffectManager} from "../../effects/effect-manager";
import {assertIsCharacter} from '../../../models/actor/properties/character-properties';
import {ShieldRollDamageSkillScriptDefinition, SkillDefinition} from '../../../repositories/data/skills';
import {Lvl0ItemShield} from '../../../models/item/lvl0-item-types';
import {RollHelper} from '../../../utils/roll-helper';

export class RollShieldDamageSkillScript extends SkillScript {
    shield?: Lvl0ItemShield;

    constructor(token, skillDefinition: SkillDefinition & { script: ShieldRollDamageSkillScriptDefinition }) {
        super(token, skillDefinition);
    }

    override async prepare() {
        let actor = this.token.actor;
        if (!actor)
            throw new Error("Missing actor during prepare");
        let shield = actor.itemTypes['shield'].map(s => s as Lvl0ItemShield).find(x => x.data.data.equiped);
        if (!shield) {
            ui.notifications?.error("Vous devez équiper un bouclier pour cette action", {permanent: true});
            return false;
        }
        if (!shield.data.data.damage) {
            ui.notifications?.error("Aucun dégâts configuré sur ce bouclier", {permanent: true});
            return false;
        }
        this.shield = shield;

        return true;
    }

    override async postRoll(testRoll: SkillTestRollResult) {
        let actor = this.token.actor;
        assertIsCharacter(actor);
        if (!this.shield)
            throw new Error('Missing shield during postRoll');
        let actorData = actor.data.data;

        let damageRollFormula = this.shield.data.data.damage.replace('phy', actorData.computedData.stats.baseStats.phy.value.toString());
        let damageRoll = await (new Roll(damageRollFormula)).roll({async: true});
        let shieldDamage = damageRoll.total!;

        const messageData = testRoll.roll.toMessage({}, {create: false});

        let message = `<div class="skill-shield-damage-roll-chat">
            <div class="title">${this.skillDefinition.name}</div>
            <div class="test"><i class="fas fa-dice"></i> ${testRoll.total} / ${testRoll.successValue} (${RollHelper.getTestResultMessage(testRoll.result)})</div>
            <div class="roll">${await RollHelper.renderRollSmall(testRoll.roll)}</div>
            <div class="shield">
                <div class="name">${this.shield.name}</div>
                <div class="img"><img src="${this.shield.img}" /></div>
                <div class="danage"><span class="label">Dégâts</span> ${this.shield.data.data.damage}</div>
        `;

        if (RollHelper.isSuccess(testRoll.result) && damageRollFormula.indexOf('d') !== -1)
            message += `<div class="roll">${await damageRoll.render()}</div>`;
        else
            message += `<div class="roll"></div>`;

        message += '</div>';
        if (RollHelper.isSuccess(testRoll.result)) {
            message += `<div class="damage"><i class="fas fa-dice"></i> <span class="label">Dégâts</span> ${damageRollFormula} = ${shieldDamage}</div>`;
        }


        let bonusDamage = 0;
        let effectsWithBonusDamages = EffectManager.getEffectsWithBonusDamage(actor);
        for (let effectsWithBonusDamage of effectsWithBonusDamages) {
            message += `<div class="effect">${effectsWithBonusDamage.name}: ${effectsWithBonusDamage.value}</span></div>`;
            bonusDamage += effectsWithBonusDamage.value;
        }

        if (RollHelper.isSuccess(testRoll.result) && bonusDamage) {
            message += `<div class="result">Total: <span class="total">${shieldDamage + bonusDamage}</span></div>`
        }

        message += `</div>`;

        await ChatMessage.create({
            ...messageData,
            content: message,
            speaker: ChatMessage.getSpeaker({token: this.token.document})
        });
    }
}