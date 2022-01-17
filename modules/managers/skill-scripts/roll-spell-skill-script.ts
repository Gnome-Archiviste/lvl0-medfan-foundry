import {SkillScript} from "./skill-script";
import {SpellSelector} from "../../utils/spell-selector";
import {SpellManager} from "../spell/spell-manager";
import {RollMagicEpicFailManager} from "../roll-magic-epic-fail-manager";
import {EffectManager} from "../effect-manager";
import {ActorSpell} from '../spell/spell-definition.model';
import {SpellCastAction} from '../../ui/spell-selector-dialog';
import {RollHelper} from '../roll-helper';
import {ScrollItemPropertiesData} from '../../models/item/scroll-item-properties-data';
import {SpellChat} from '../spell/spell-chat';


export interface RollSpellSkillScriptData {
    spellCategory: 'mage' | 'champion';
}

export class RollSpellSkillScript extends SkillScript {
    data : RollSpellSkillScriptData;
    spell: ActorSpell;
    options: any;
    action: SpellCastAction = 'cast';

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
        let action: SpellCastAction = 'cast';
        let actor = this.token.actor;
        if (!actor) {
            throw new Error('Missing actor for prepare');
        }
        if (this.options?.spellId) {
            spell = await SpellManager.getComputedSpellForActorById(this.options?.spellId, actor.data.data, {});
        }
        if (!spell) {
            const result = await SpellSelector.selectSpell(this.token, this.data.spellCategory);
            if (result) {
                spell = result.spell;
                action = result.action;
            }
        }
        if (!spell) {
            return false;
        }
        if (spell.cost > actor.data.data.mana.value) {
            ui.notifications?.error('Pas assez de point de magie.');
            return false;
        }
        this.spell = spell;
        this.action = action;
        return true;
    }

    /**
     * @override
     */
    async postRoll(roll, rollValue, minSuccessValue, success) {
        const messageData = roll.toMessage({}, {create: false});
        let actor = this.token.actor;
        if (!actor) {
            throw new Error('Missing actor for postRoll');
        }

        let result = RollHelper.getRollResult(rollValue, minSuccessValue);
        let context = {
            criticalSuccess: result === 'criticalSuccess',
            epicFail: result === 'epicFail',
        };
        let spell = await SpellManager.reComputeSpellAfterRoll(this.spell, actor.data.data, context);

        let message: string;
        if (this.action === 'cast') {
            message = `<div class="skill-roll-spell-chat">
                <div class="title">${this.skillDefinition.name}</div>
                <div class="test"><i class="fas fa-dice"></i> ${rollValue} / ${minSuccessValue} (${RollHelper.getTestResultMessage(result)})</div>
                <div class="roll">${await roll.render()}</div>
                ${await SpellChat.renderSpellChat(spell, result)}
            </div>
            `;
        }
        else if (this.action === 'fillWand') {
            ui.notifications?.error('Non supporté pour le moment');
            message =``;
            // Critical = la baguette est bloqué
            // Aussi max 10 sorts pour des arcanes 1-5, 5 sorts pour arcanes 6-10 et 2 pour arcanes finale
        }
        else if (this.action === 'createScroll') {
            message = `<div class="skill-roll-spell-chat">
                <div class="title"><i class="fa fa-scroll"></i>Création d'un parchemin</div>
                <div class="subtitle"><img src="${spell.icon}"> ${spell.name}</div>
                <div class="test"><i class="fas fa-dice"></i> ${rollValue} / ${minSuccessValue} (${RollHelper.getTestResultMessage(result)})</div>
                <div class="roll">${await roll.render()}</div>`;

            if (success) {
                let emptyScroll = actor.getFirstEmptyScroll();
                if (!emptyScroll) {
                    ui.notifications?.error('Aucun parchemin vierge disponible')
                    return;
                }
                let scrollData = {
                    ...emptyScroll.toObject(),
                    name: 'Parchemin: ' + spell.name,
                    img: spell.icon,
                    data: {
                        quantifiable: false,
                        quantity: 0,
                        spell: spell.id,
                        arcane: actor.data.data.computedData.magic.arcaneLevel
                    } as ScrollItemPropertiesData
                };
                await actor.createEmbeddedDocuments('Item', [scrollData]);
                if (emptyScroll.data.data.quantity === 1) {
                    await emptyScroll.delete();
                }
                else {
                    await emptyScroll.update({
                        data: {
                            quantity: emptyScroll.data.data.quantity - 1
                        }
                    })
                }
            }
            message += `</div>`;
        }
        else {
            throw new Error('Unsupported spell cast action: ' + this.action);
        }

        if (success || result === 'epicFail') {
            actor.useMana(spell.cost).then();
        }

        messageData.content = message;
        messageData.speaker = ChatMessage.getSpeaker({token: this.token.document});
        await ChatMessage.create(messageData);
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
