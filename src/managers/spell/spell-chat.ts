import {inject, singleton} from 'tsyringe';
import * as marked from 'marked';
import {RollResult, RollUtil} from '../../utils/roll-util';
import {RolledSpell, RolledSpellValue} from '../../app/spell/spell';

@singleton()
export class SpellChat {

    constructor(
        @inject(RollUtil) private readonly rollUtil: RollUtil,
    ) {
    }

    async renderSpellChat(spell: RolledSpell, result: RollResult): Promise<string> {
        let message = `<div class="spell">
        <div class="header">
            <img class="icon" src="${spell.definition.icon}">
            <div class="name">${spell.definition.name}</div>
        </div>
        <div class="description">${marked.parse(spell.data.description)}</div>
        <div class="stats">
        <div class="cost"><span class="label">Coût</span> ${spell.data.effectiveCost} point de mana</div>
        <div class="distance"><span class="label">Distance</span> ${spell.data.distance}</div>`;
        message += await this.renderSpellStat('duration', spell.data.duration)
        message += await this.renderSpellStat('area', spell.data.area)
        message += `
        </div>`;

        message += await this.renderSpellStat('bonus', spell.data.bonus)
        message += await this.renderSpellStat('resilience', spell.data.resilience)
        message += await this.renderSpellStat('damage', spell.data.damage)
        message += await this.renderSpellStat('heal', spell.data.heal)
        if (result === 'criticalSuccess')
            message += await this.renderSpellStat('criticalSuccess', spell.data.criticalSuccess)
        if (this.rollUtil.isSuccess(result))
            message += await this.renderActions(spell);

        if (result === 'epicFail')
            message += ` <div class="epic-fail"><button data-lvl0-global-action-roll-magic-epic-fail><i class="fas fa-dice"></i> Échec critique</button></div>`;

        message += `</div>`
        return message;
    }

    private async renderSpellStat(name, value?: RolledSpellValue) {
        if (!value)
            return '';
        if ('text' in value)
            return `<div class="${name}"><span class="label">${game.i18n.localize('LVL0MF.Spell.Label.' + name)}</span>&nbsp;${value.text}</div>`;
        if ('roll' in value)
            return `<div>
                <div class="${name}">
                    <span class="label"><i class="fas fa-dice"></i> ${game.i18n.localize('LVL0MF.Spell.Label.' + name)}</span>&nbsp;${this.formatRoll(value)}
                </div>
                <div class="roll">FIXME</div>
            </div>`;
        return '';
    }


    private formatRoll(value: any) {
        let result = value.roll.total.toString();
        if (value.unit)
            result += ' ' + value.unit
        if (value.suffix)
            result += ' (' + value.suffix + ')'
        return result;
    }

    private async renderActions(spell: RolledSpell): Promise<string> {
        if (!spell.data.actions)
            return "";

/*        let actionsContent = '';
        for (let action of Object.values(spell.actions)) {
            actionsContent += `<button data-lvl0-global-action-execute-spell-action="${btoa(JSON.stringify(action))}">${action.name}</button>`;
        }

        return actionsContent;*/
        return "";
    }
}
