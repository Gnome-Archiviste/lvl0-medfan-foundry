import {inject, singleton} from 'tsyringe';
import * as marked from 'marked';
import {ActorSpell} from './actor-spell.model';
import {RollResult, RollUtil} from '../../utils/roll-util';
import {RolledSpellStat} from './spell-manager';

@singleton()
export class SpellChat {

    constructor(
        @inject(RollUtil) private readonly rollUtil: RollUtil,
    ) {
    }

    async renderSpellChat(spell: ActorSpell, result: RollResult): Promise<string> {
        let message = `<div class="spell">
        <div class="header">
            <img class="icon" src="${spell.icon}">
            <div class="name">${spell.name}</div>
        </div>
        <div class="description">${marked.parse(spell.description)}</div>
        <div class="stats">
        <div class="cost"><span class="label">Coût</span> ${spell.cost} point de mana</div>
        <div class="distance"><span class="label">Distance</span> ${spell.distance}</div>`;
        message += await this.renderSpellStat('duration', spell.duration)
        message += await this.renderSpellStat('area', spell.area)
        message += `
        </div>`;

        message += await this.renderSpellStat('bonus', spell.bonus)
        message += await this.renderSpellStat('resilience', spell.resilience)
        message += await this.renderSpellStat('damage', spell.damage)
        message += await this.renderSpellStat('heal', spell.heal)
        if (result === 'criticalSuccess')
            message += await this.renderSpellStat('criticalSuccess', spell.criticalSuccess)
        if (this.rollUtil.isSuccess(result))
            message += await this.renderActions(spell);

        if (result === 'epicFail')
            message += ` <div class="epic-fail"><button data-lvl0-global-action-roll-magic-epic-fail><i class="fas fa-dice"></i> Échec critique</button></div>`;

        message += `</div>`
        return message;
    }

    private async renderSpellStat(name, value) {
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

    private async renderActions(spell: ActorSpell): Promise<string> {
        if (!spell.actions)
            return "";

        let actionsContent = '';
        for (let action of Object.values(spell.actions)) {
            actionsContent += `<button data-lvl0-global-action-execute-spell-action="${btoa(JSON.stringify(action))}">${action.name}</button>`;
        }

        return actionsContent;
    }
}
