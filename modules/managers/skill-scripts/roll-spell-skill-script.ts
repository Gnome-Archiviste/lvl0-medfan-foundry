import {SkillScript} from "./skill-script";
import {SpellSelector} from "../../utils/spell-selector";
import {RolledSpellStat, SpellManager} from "../spell/spell-manager";
import {RollMagicEpicFailManager} from "../roll-magic-epic-fail-manager";
import {EffectManager} from "../effect-manager";
import {ActorSpell} from '../spell/spell-definition.model';


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
        let spell: ActorSpell | undefined;
        let actor = this.token.actor;
        if (!actor) {
            throw new Error('Missing actor for prepare');
        }
        if (this.options?.spellId) {
            spell = await SpellManager.getComputedSpellForActorById(this.options?.spellId, actor.data.data, {});
        }
        if (!spell) {
            spell = await SpellSelector.selectSpell(this.token, this.data.spellCategory);
        }
        if (!spell) {
            return false;
        }
        if (spell.cost > actor.data.data.mana.value) {
            ui.notifications?.error('Pas assez de point de magie.');
            return false;
        }
        this.spell = spell;
        return true;

    }

    /**
     * @override
     */
    async postRoll(roll, result, minSuccessValue, success) {
        const messageData = roll.toMessage({}, {create: false});
        let actor = this.token.actor;
        if (!actor) {
            throw new Error('Missing actor for postRoll');
        }

        let criticalSuccess = result === 2;
        let epicFail = result === 12;
        let context = {
            criticalSuccess: criticalSuccess,
            epicFail: epicFail,
        };
        let spell = await SpellManager.reComputeSpellAfterRoll(this.spell, actor.data.data, context);

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
            actor.useMana(spell.cost).then();
        }

        messageData.content = message;
        messageData.speaker = ChatMessage.getSpeaker({token: this.token.document});
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

    private async _renderActions(spell: ActorSpell): Promise<string> {
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
    $(document).on('click', '[data-lvl0-global-action-roll-magic-epic-fail]', async function (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        ev.stopImmediatePropagation()
        await RollMagicEpicFailManager.roll();
    })
    $(document).on('click', '[data-lvl0-global-action-execute-spell-action]', async function (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        ev.stopImmediatePropagation()
        let token = canvas?.tokens?.controlled[0] || game.user?.character?.getActiveTokens().shift();
        if (!token) {
            ui.notifications?.error('Sélectionnez un token avant de faire cette action');
            return;
        }
        let action = JSON.parse(atob(ev.target.dataset['lvl0GlobalActionExecuteSpellAction']));
        switch (action.type) {
            case 'heal':
                if (token.actor) {
                    await token.actor.updateHealth(action.data.value);
                    ui.notifications?.info(token.name + ' a été soigné de ' + action.data.value + ' point de vies');
                }
                break;
            case 'addEffect':
                EffectManager.applyEffect(token.actor, action.data)
                break;
        }

        action.name
    })
});
