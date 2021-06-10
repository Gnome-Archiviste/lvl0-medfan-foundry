import {SkillScript} from "./skill-script.js";
import {SpellSelector} from "../../utils/spell-selector.js";
import {SpellManager} from "../spell-manager.js";
import {ElementsUtil} from "../../utils/elements-util.js";

/**
 * @typedef RollSpellSkillScriptData
 * @property {'mage'|'champion'} spellCategory
 */
export class RollSpellSkillScript extends SkillScript {

    /**
     * @private
     * @property {RollSpellSkillScriptData} data
     */
    data;

    /**
     * @private
     * @property {ActorSpell} data
     */
    spell;

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
        this.spell = await SpellSelector.selectSpell(this.token, this.data.spellCategory);
        return !!this.spell;

    }

    /**
     * @override
     */
    async postRoll(roll, result, minSuccessValue, success) {
        // Roll damage or other spell related stuff
        // Send message
        // Critical failure

        const messageData = roll.toMessage({}, {create: false});

        let context = {
            criticalSuccess: result === 2,
            epicFail: result === 2,
        };
        let spell = SpellManager.reComputeSpellAfterRoll(this.spell, this.token.actor.data.data, context);

        let damageRoll = undefined;
        let damageResult = '';
        if (spell.damageFormula) {
            damageRoll = new Roll(spell.damageFormula).roll();
            if (success)
                damageResult = ` = ${damageRoll._total}`;
        }

        let message = `<div class="skill-roll-spell-chat">
            <div class="title">${this.skillDefinition.name}</div>
            <div class="test"><i class="fas fa-dice-d20"></i> ${result} / ${minSuccessValue} (${this.getTestResultMessage(success, result)})</div>
            <div class="roll">${await roll.render()}</div>
            <div class="spell">
                <div class="name">${spell.name}</div>
                <div class="description">${spell.description}</div>
                <div class="stats">
                    <div class="cost"><span class="label">Coût</span> ${spell.cost} point de magie</div>
                    <div class="distance"><span class="label">Distance</span> ${spell.distance}</div>`;
        if (spell.duration)
            message += `<div class="duration"><span class="label">Durée</span> ${spell.duration}</div>`;
        if (spell.duration)
            message += `<div class="area"><span class="label">Rayon</span> ${spell.area}</div>`;
        message += `
                </div>`;

                if (spell.criticalSuccess && result === 2)
                    message += `<div class="criticalSuccess"><span class="label">Succès remarquable</span> ${spell.criticalSuccess}</div>`;
                if (spell.resilience)
                    message += `<div class="resilience"><span class="label">Résilience</span> ${spell.resilience}</div>`;
        if (spell.damageFormula)
            message += `<div class="damage"><i class="fas fa-dice"></i> <span class="label">Dégâts</span> ${spell.damageFormula} (${ElementsUtil.getName(spell.damageElement)})${damageResult}</div>`;
        if (spell.damageFormula)
            message += ` <div class="roll">${await damageRoll.render()}</div>`;
        message += `
            </div>
        </div>
        `;

        if (success || result === 12) {
            this.token.actor.useMana(spell.cost);
        }

        messageData.content = message;
        messageData.speaker = ChatMessage.getSpeaker({token: this.token});
        await ChatMessage.create(messageData);
    }
}
