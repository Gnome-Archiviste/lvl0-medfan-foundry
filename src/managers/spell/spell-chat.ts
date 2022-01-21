import {ActorSpell} from './actor-spell.model';
import {RollHelper, RollResult} from '../../utils/roll-helper';
import {RolledSpellStat} from './spell-manager';

export class SpellChat {
    static async renderSpellChat(spell: ActorSpell, result: RollResult): Promise<string> {
        let message = `<div class="spell">
        <div class="header">
            <img class="icon" src="${spell.icon}">
            <div class="name">${spell.name}</div>
        </div>
        <div class="description">${spell.description}</div>
        <div class="stats">
        <div class="cost"><span class="label">Coût</span> ${spell.cost} point de magie</div>
        <div class="distance"><span class="label">Distance</span> ${spell.distance}</div>`;
        message += await SpellChat.renderSpellStat('duration', spell.duration)
        message += await SpellChat.renderSpellStat('area', spell.area)
        message += `
        </div>`;

        message += await SpellChat.renderSpellStat('bonus', spell.bonus)
        message += await SpellChat.renderSpellStat('resilience', spell.resilience)
        message += await SpellChat.renderSpellStat('damage', spell.damage)
        message += await SpellChat.renderSpellStat('heal', spell.heal)
        if (result === 'criticalSuccess')
            message += await SpellChat.renderSpellStat('criticalSuccess', spell.criticalSuccess)
        if (RollHelper.isSuccess(result))
            message += await SpellChat.renderActions(spell);

        if (result === 'epicFail')
            message += ` <div class="epic-fail"><button data-lvl0-global-action-roll-magic-epic-fail><i class="fas fa-dice"></i> Échec critique</button></div>`;

        message += `</div>`
        return message;
    }

    private static async renderSpellStat(name, value) {
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

    private static async renderActions(spell: ActorSpell): Promise<string> {
        if (!spell.actions)
            return "";

        let actionsContent = '';
        for (let action of Object.values(spell.actions)) {
            actionsContent += `<button data-lvl0-global-action-execute-spell-action="${btoa(JSON.stringify(action))}">${action.name}</button>`;
        }

        return actionsContent;
    }
}
