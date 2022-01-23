import {container, singleton} from 'tsyringe';
import {SkillScript, SkillTestRollResult} from "./skill-script";
import {SpellSelector} from "utils/spell-selector";
import {ActorSpell, RollMagicEpicFailManager, ScrollUtil, SpellChat, SpellManager} from "managers/spell";
import {EffectManager} from "managers/effects";
import {SpellCastAction} from 'ui/dialog';
import {RollUtil} from 'utils/roll-util';
import {assertIsCharacter} from 'models/actor';
import {CastSpellSkillScriptData, CastSpellSkillScriptDefinition, SkillDefinition} from 'repositories/data';

@singleton()
export class RollSpellSkillScript extends SkillScript {
    data: CastSpellSkillScriptData;
    spell: ActorSpell;
    action: SpellCastAction = 'cast';

    constructor(
        token,
        skillDefinition: SkillDefinition & { script: CastSpellSkillScriptDefinition },
        rollUtil: RollUtil,
        private readonly options: { spellId?: string } | undefined,
        private readonly spellChat: SpellChat,
        private readonly scrollUtil: ScrollUtil,
        private readonly spellManager: SpellManager,
        private readonly spellSelector: SpellSelector,
    ) {
        super(token, skillDefinition, rollUtil);
        this.data = skillDefinition.script.data;
    }

    override async prepare(): Promise<boolean> {
        let spell: ActorSpell | undefined;
        let action: SpellCastAction = 'cast';
        let actor = this.token.actor;
        if (!actor) {
            throw new Error('Missing actor for prepare');
        }

        assertIsCharacter(actor);

        if (this.options?.spellId) {
            spell = await this.spellManager.getComputedSpellForActorById(this.options.spellId, {arcaneLevel: actor.data.data.computedData.magic.arcaneLevel});
        }
        if (!spell) {
            const result = await this.spellSelector.selectSpell(this.token, this.data.spellClass);
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

    override async postRoll(testRoll: SkillTestRollResult) {
        const messageData = testRoll.roll.toMessage({}, {create: false});
        let actor = this.token.actor;
        assertIsCharacter(actor);

        let context = {
            arcaneLevel: actor.data.data.computedData.magic.arcaneLevel,
            criticalSuccess: testRoll.result === 'criticalSuccess',
            epicFail: testRoll.result === 'epicFail',
        };
        let spell = await this.spellManager.reComputeSpellAfterRoll(this.spell, context);

        let message: string;
        if (this.action === 'cast') {
            message = `<div class="skill-roll-spell-chat">
                <div class="title">${this.skillDefinition.name}</div>
                <div class="test"><i class="fas fa-dice"></i> ${testRoll.total} / ${testRoll.successValue} (${this.rollUtil.getTestResultMessage(testRoll.result)})</div>
                <div class="roll">${await this.rollUtil.renderRollSmall(testRoll.roll)}</div>
                ${await this.spellChat.renderSpellChat(spell, testRoll.result)}
            </div>
            `;
        } else if (this.action === 'fillWand') {
            ui.notifications?.error('Non supporté pour le moment');
            message = ``;
            // Critical = la baguette est bloqué
            // Aussi max 10 sorts pour des arcanes 1-5, 5 sorts pour arcanes 6-10 et 2 pour arcanes finale
        } else if (this.action === 'createScroll') {
            message = `<div class="skill-roll-spell-chat">
                <div class="title"><i class="fa fa-scroll"></i>Création d'un parchemin</div>
                <div class="subtitle"><img src="${spell.icon}"> ${spell.name}</div>
                <div class="test"><i class="fas fa-dice"></i> ${testRoll.total} / ${testRoll.successValue} (${this.rollUtil.getTestResultMessage(testRoll.result)})</div>
                <div class="roll">${await this.rollUtil.renderRollSmall(testRoll.roll)}</div>`;

            if (this.rollUtil.isSuccess(testRoll.result)) {
                await this.scrollUtil.createScroll(actor, spell);
            }
            message += `</div>`;
        } else {
            throw new Error('Unsupported spell cast action: ' + this.action);
        }

        if (testRoll.result !== 'fail') {
            actor.useMana(spell.cost).then();
        }

        let content = message;
        let speaker = ChatMessage.getSpeaker({token: this.token.document});
        await ChatMessage.create({
            ...messageData,
            content,
            speaker,
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            // FIXME: Remove stringify: https://github.com/League-of-Foundry-Developers/foundry-vtt-types/issues/1552
            roll: JSON.stringify(this.rollUtil.mergeRolls([testRoll.roll, ...this.spellManager.getRollsInSpell(spell)]).toJSON())
        });
    }
}

Hooks.on('init', () => {
    $(document).on('click', '[data-lvl0-global-action-roll-magic-epic-fail]', async function (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        ev.stopImmediatePropagation()
        await container.resolve(RollMagicEpicFailManager).roll();
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
                if (!token.actor)
                    throw new Error('no actor available on the token')
                await container.resolve(EffectManager).applyEffect(token.actor, action.data)
                break;
        }

        action.name
    })
});
