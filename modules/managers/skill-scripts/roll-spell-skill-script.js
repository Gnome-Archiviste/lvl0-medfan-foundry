import {SkillScript} from "./skill-script.js";
import {SpellSelector} from "../../utils/spell-selector.js";
import {RolledSpellStat, SpellManager} from "../spell-manager.js";
import {RollMagicEpicFailManager} from "../roll-magic-epic-fail-manager.js";
import {EffectManager} from "../effect-manager.js";

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
     * @private
     * @property {Object} options
     */
    options;

    /**
     * @param {Token} token
     * @param {SkillDefinition} skillDefinition
     * @param {Object} options
     */
    constructor(token, skillDefinition, options) {
        super(token, skillDefinition);
        this.data = skillDefinition.script.data;
        this.options = options;
    }

    /**
     * @override
     */
    async prepare() {
        let spell = undefined;
        if (this.options?.spellId) {
            spell = SpellManager.getComputedSpellForActorById(this.options?.spellId, this.token.actor.data.data, {});
        }
        if (!spell) {
            spell = await SpellSelector.selectSpell(this.token, this.data.spellCategory);
        }
        if (spell?.cost > this.token.actor.data.data.mana.value) {
            ui.notifications.error('Pas assez de point de magie.');
            return false;
        }
        this.spell = spell;
        return !!this.spell;

    }

    /**
     * @override
     */
    async postRoll(roll, result, minSuccessValue, success) {
        const messageData = roll.toMessage({}, {create: false});

        let criticalSuccess = result === 2;
        let epicFail = result === 12;
        let context = {
            criticalSuccess: criticalSuccess,
            epicFail: epicFail,
        };
        let spell = SpellManager.reComputeSpellAfterRoll(this.spell, this.token.actor.data.data, context);

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

        message += await this._renderSpellStat('bonus', spell.bonus)
        message += await this._renderSpellStat('resilience', spell.resilience)
        message += await this._renderSpellStat('damage', spell.damage)
        message += await this._renderSpellStat('heal', spell.heal)
        if (criticalSuccess)
            message += await this._renderSpellStat('criticalSuccess', spell.criticalSuccess)
        if (success)
            message += await this._renderActions(spell);

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

    /**
     * @param {ActorSpell} spell
     * @return {Promise<string>}
     * @private
     */
    async _renderActions(spell) {
        if (!spell.actions)
            return "";

        let actionsContent = '';
        for (let action of Object.values(spell.actions)) {
            actionsContent += `<button data-lvl0-global-action-execute-spell-action="${btoa(JSON.stringify(action))}">${action.name}</button>`;
        }

        return actionsContent;
    }
}

Hooks.on('init', () => {
    $(document).on('click', '[data-lvl0-global-action-roll-magic-epic-fail]', async function () {
        await RollMagicEpicFailManager.roll();
    })
    $(document).on('click', '[data-lvl0-global-action-execute-spell-action]', async function (ev) {
        let token = canvas.tokens.controlled[0] || game.user.character?.getActiveTokens().shift();
        if (!token) {
            ui.notifications.error('Sélectionnez un token avant de faire cette action');
            return;
        }
        let action = JSON.parse(atob(ev.target.dataset['lvl0GlobalActionExecuteSpellAction']));
        switch (action.type) {
            case 'heal':
                await token.actor.updateHealth(action.data.value);
                ui.notifications.info(token.name + ' a été soigné de ' + action.data.value + ' point de vies');
                break;
            case 'addEffect':
                EffectManager.applyEffect(token.actor, action.data)
                break;
        }

        action.name
    })
});
