import {SkillScript} from "./skill-script.js";
import {SpellSelector} from "../../utils/spell-selector.js";
import {RolledSpellStat, SpellManager} from "../spell-manager.js";
import {ElementsUtil} from "../../utils/elements-util.js";
import {RollMagicEpicFailManager} from "../roll-magic-epic-fail-manager.js";

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

        let criticalSuccess = result === 2;
        let epicFail = result === 12;
        let context = {
            criticalSuccess: criticalSuccess,
            epicFail: epicFail,
        };
        let spell = SpellManager.reComputeSpellAfterRoll(this.spell, this.token.actor.data.data, context);

        let damageRoll = undefined;
        let damageResult = '';
        if (spell.damageFormula) {
            damageRoll = new Roll(spell.damageFormula).roll();
            if (success || epicFail)
                damageResult = ` = ${damageRoll._total}`;
        }

        let healRoll = undefined;
        let healResult = '';
        if (spell.healFormula) {
            healRoll = new Roll(spell.healFormula).roll();
            if (success || epicFail)
                healResult = ` = ${healRoll._total}`;
        }

        let message = `<div class="skill-roll-spell-chat">
            <div class="title">${this.skillDefinition.name}</div>
            <div class="test"><i class="fas fa-dice"></i> ${result} / ${minSuccessValue} (${this.getTestResultMessage(success, result)})</div>
            <div class="roll">${await roll.render()}</div>
            <div class="spell">
                <div class="name">${spell.name}</div>
                <div class="description">${spell.description}</div>
                <div class="stats">
                    <div class="cost"><span class="label">Coût</span> ${spell.cost} point de magie</div>
                    <div class="distance"><span class="label">Distance</span> ${spell.distance}</div>`;
        message += await this._renderSpellStat('duration', spell.duration)
        message += await this._renderSpellStat('area', spell.area)
        message += `
                </div>`;

        if (criticalSuccess)
            message += await this._renderSpellStat('criticalSuccess', spell.criticalSuccess)
        message += await this._renderSpellStat('resilience', spell.resilience)
        message += await this._renderSpellStat('bonus', spell.bonus)
        message += await this._renderSpellStat('damage', spell.damage)
        message += await this._renderSpellStat('heal', spell.heal)

        if (epicFail)
            message += ` <div class="epic-fail"><button data-lvl0-global-action-roll-magic-epic-fail><i class="fas fa-dice"></i> Échec critique</button></div>`;

        message += `
            </div>
        </div>
        `;

        if (success || epicFail) {
            this.token.actor.useMana(spell.cost);
        }

        messageData.content = message;
        messageData.speaker = ChatMessage.getSpeaker({token: this.token});
        await ChatMessage.create(messageData);
    }

    async _renderSpellStat(name, value) {
        if (!value)
            return '';
        if (typeof value === 'string')
            return `<div class="${name}"><span class="label">${game.i18n.localize('LVL0MF.Spell.Label.' + name)}</span>&nbsp;${value}</div>`;
        if (typeof value === 'object' && value instanceof RolledSpellStat)
            return `<div>
                <div class="${name}">
                    <span class="label"><i class="fas fa-dice"></i> ${game.i18n.localize('LVL0MF.Spell.Label.' + name)}</span>&nbsp;${value.toDisplayString()}
                </div>
                <div class="roll">${await value.roll.render()}</div>
            </div>`;
    }
}



Hooks.on('init', () => {
    $(document).on('click', '[data-lvl0-global-action-roll-magic-epic-fail]', async function () {
        await RollMagicEpicFailManager.roll();
    })
});
