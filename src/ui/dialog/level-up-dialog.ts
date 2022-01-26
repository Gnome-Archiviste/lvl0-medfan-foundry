import {inject, injectable} from 'tsyringe';
import {DialogBase, DialogResultCallback} from './dialog-base';
import {Lvl0Actor} from 'models/actor/lvl0-actor';
import {Statistics} from 'models/actor/properties-data/shared-properties-data';
import {LevelData} from 'models/actor/properties-data/lvl0-actor-character-data';
import {StatsCharacterDataComputer} from 'models/actor/actor-data-computers/character';
import {RollFactory} from 'utils/roll-factory';

export interface LevelUpDialogData {
    toLevel: number;
    additionalHealth: { value?: number, useStatValue?: string, diceCount?: number };
    additionalMana: { value?: number, useStatValue?: string, diceCount?: number };
    hasAdditionalPointInStat: boolean;
    hasNewSpeciality: boolean;
    actor: Lvl0Actor;
    actorStats: Statistics;
}

export interface LevelUpDialogApplicationData {
    toLevel: number;
    hasAdditionalPointInStat: boolean;
    additionalStat?: string;
    additionalHealth: { value?: number, diceCount?: number };
    additionalMana: { value?: number, diceCount?: number };
    hasNewSpeciality: boolean;
    ready: boolean;
    diceData: object;
    stats: {[statName: string]: string}
}

@injectable()
export class LevelUpDialog extends DialogBase<LevelUpDialogData, LevelData> {
    public diceData = {};
    public additionalStat?: string;

    constructor(
        @inject("DIALOG_DATA") dialogData: LevelUpDialogData,
        @inject("DIALOG_RESULT") result: DialogResultCallback<LevelData>,
        @inject(RollFactory) private readonly rollFactory: RollFactory
    ) {
        super(dialogData, result);
    }

    override getData(options?: Partial<ApplicationOptions>): LevelUpDialogApplicationData {
        // FIXME: We should remove from this list stats already at max value, and handle special case when character is already maxed on every stat
        let availableLevelUStats = StatsCharacterDataComputer.statsNames.reduce((previousValue, currentValue) => {
            previousValue[currentValue] = currentValue;
            return previousValue;
        }, {});

        let data = <LevelUpDialogApplicationData>{
            ...super.getData(options),
            ...this.dialogData,
            additionalStat: this.additionalStat,
            stats: availableLevelUStats,
            diceData: {...this.diceData},
            ready: false
        };

        if (this.dialogData?.additionalHealth?.useStatValue) {
            data.additionalHealth.value = (data.additionalHealth.value || 0) + this.dialogData.actorStats[this.dialogData?.additionalHealth?.useStatValue].value;
        }

        if (this.dialogData?.additionalMana?.useStatValue) {
            data.additionalMana.value = (data.additionalMana.value || 0) + this.dialogData.actorStats[this.dialogData?.additionalMana?.useStatValue].value;
        }

        let ready = true;
        if (data.additionalHealth.diceCount) {
            for (let i = 0; i < data.additionalHealth.diceCount; i++) {
                if (!this.diceData['health-' + i])
                    ready = false;
            }
        }
        if (data.additionalMana.diceCount) {
            for (let i = 0; i < data.additionalMana.diceCount; i++) {
                if (!this.diceData['mana-' + i])
                    ready = false;
            }
        }
        if (data.hasAdditionalPointInStat && !data.additionalStat) {
            ready = false;
        }

        data.ready = ready;

        return data;
    }

    updateDiceData(html: JQuery) {
        let data = this.getData();
        if (data.additionalHealth.diceCount) {
            for (let i = 0; i < data.additionalHealth.diceCount; i++) {
                this.diceData['health-' + i] = +(html.find(`[data-dice-health='${i}']`)[0] as HTMLInputElement).value;
            }
        }
        if (data.additionalMana.diceCount) {
            for (let i = 0; i < data.additionalMana.diceCount; i++) {
                this.diceData['mana-' + i] = +(html.find(`[data-dice-mana='${i}']`)[0] as HTMLInputElement).value;
            }
        }
        if (this.dialogData.toLevel === 1) {
            for (let i = 0; i < 2; i++) {
                this.diceData['money-' + i] = +(html.find(`[data-dice-money='${i}']`)[0] as HTMLInputElement).value;
            }
        }
    }

    protected getResult(): LevelData | undefined {
        let data = this.getData();
        let health = data.additionalHealth.value || 0;
        let mana = data.additionalMana.value || 0;
        let money = 0;

        if (data.additionalHealth.diceCount) {
            for (let i = 0; i < data.additionalHealth.diceCount; i++) {
                health += this.diceData['health-' + i];
            }
        }

        if (data.additionalMana.diceCount) {
            for (let i = 0; i < data.additionalMana.diceCount; i++) {
                mana += this.diceData['mana-' + i];
            }
        }

        if (this.dialogData.toLevel === 1) {
            money = (this.diceData['money-0'] || 0) + (this.diceData['money-1'] || 0);
        }

        return {
            health: health,
            mana: mana,
            money: money,
            additionalStat: this.additionalStat
        }
    }

    override activateListeners(html: JQuery) {
        super.activateListeners(html);

        html.find('[data-dice-money]').on('change', _ev => {
            this.updateDiceData(html);
            this.render(true)
        });
        html.find('[data-dice-health]').on('change', _ev => {
            this.updateDiceData(html);
            this.render(true)
        });
        html.find('[data-dice-mana]').on('change', _ev => {
            this.updateDiceData(html);
            this.render(true)
        });
        html.find('[name="additionalStat"]').on('change', ev => {
            this.additionalStat = (ev.target as HTMLInputElement).value;
            this.render(true)
        });

        html.find('[data-action]').on('click', async ev => {
            switch (ev.target.dataset["action"]) {
                case 'rollHealthDice': {
                    await this.rollDice(this.getData().additionalHealth.diceCount, 'health');
                    break;
                }
                case 'rollMoneyDice': {
                    await this.rollDice(2, 'money');
                    break;
                }
                case 'rollManaDice': {
                    await this.rollDice(this.getData().additionalMana.diceCount, 'mana');
                    break;
                }
            }
        });
    }

    static get defaultOptions(): ApplicationOptions {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "levelUp",
            title: 'Level Up !',
            template: "systems/lvl0mf-sheet/ui/dialog/level-up-dialog.hbs",
            popOut: true,
        });
    }

    async rollDice(count, type) {
        let roll = await this.rollFactory.createRoll(count + 'd6');

        for (let i = 0; i < roll.terms[0].results.length; i++) {
            this.diceData[type + '-' + i] = roll.terms[0].results[i].result;
        }

        const messageData = roll.toMessage({}, {create: false});
        let content: string;
        if (type === 'money')
            content = `<p>Oricaux initiaux: ${roll.total} !</p> ${await roll.render()}`;
        else
            content = `<p><strong>LevelUp</strong> Gain de ${roll.total} point de ${type === 'health' ? 'vie' : 'mana'} !</p> ${await roll.render()}`;

        const speaker = ChatMessage.getSpeaker({actor: this.dialogData.actor});
        await ChatMessage.create({...messageData, content, speaker});

        this.render(true);
    }
}
