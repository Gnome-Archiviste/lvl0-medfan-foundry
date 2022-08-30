import {container, singleton} from 'tsyringe';
import {SkillScript, SkillTestRollResult} from "./skill-script";
import {SpellSelector} from "utils/spell-selector";
import {ActorSpell, RollMagicEpicFailManager, ScrollUtil, SpellChat, SpellManager, WandUtil} from "managers/spell";
import {EffectManager} from "managers/effects";
import {SpellCastAction} from 'ui/dialog';
import {RollUtil} from 'utils/roll-util';
import {assertIsCharacter} from 'models/actor';
import {CastSpellSkillScriptData, CastSpellSkillScriptDefinition, SkillDefinition} from 'repositories/data';
import {ItemSelector} from 'utils/item-selector';

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
        private readonly wandUtil: WandUtil,
        private readonly itemSelector: ItemSelector,
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
            ui.notifications?.error('Pas assez de point de mana.');
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
            let wands = this.wandUtil.getAvailableWandsForSpell(actor, spell.id, spell.dependsOnArcaneLevel ? actor.data.data.computedData.magic.arcaneLevel : 0);
            if (!wands) {
                ui.notifications?.warn('Aucune baguette disponible');
                return;
            }
            let wand = await this.itemSelector.openItemSelector(wands, "Choisir la baguette à remplir");
            if (!wand) {
                return;
            }
            await this.wandUtil.fillWandWithSpell(testRoll.result, wand, spell, actor);
            message = `<div class="skill-roll-spell-chat">
                <div class="title"><i class="fa fa-scroll"></i>Remplissage d'une baguette</div>
                <div class="subtitle"><img src="${spell.icon}"> ${spell.name}</div>
                <div class="test"><i class="fas fa-dice"></i> ${testRoll.total} / ${testRoll.successValue} (${this.rollUtil.getTestResultMessage(testRoll.result)})</div>
                <div class="roll">${await this.rollUtil.renderRollSmall(testRoll.roll)}</div>`;
            if (testRoll.result == 'epicFail') {
                message += `<div class="epic-fail">La baguette est désormais bloqué et ne peux plus être rempli</div>`;
            }
            message += `</div>`;
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
