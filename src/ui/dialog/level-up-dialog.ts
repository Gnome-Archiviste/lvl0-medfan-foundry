import {LevelData, Statistics} from '../../models/character/character';
import {Lvl0Actor} from '../../lvl0-actor';
import {StatsCharacterDataComputer} from '../../actor-data-computers/character/stats-character-data-computer';

export interface LevelUpDialogData {
    toLevel: number;
    additionalHealth: { value?: number, useStatValue?: string, diceCount?: number };
    additionalMana: { value?: number, useStatValue?: string, diceCount?: number };
    hasAdditionalPointInStat: boolean;
    hasNewSpeciality: boolean;
    actor: Lvl0Actor;
}

export type CompleteLevelUpDialog = (selectedSpecialityName?: LevelData) => void;

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

export class LevelUpDialog extends Application {
    public diceData = {};
    public additionalStat?: string;

    constructor(
        private readonly levelUpData: LevelUpDialogData,
        private readonly actorStats: Statistics,
        private readonly onComplete: CompleteLevelUpDialog
    ) {
        super();
    }

    _onKeyDown(event) {
        // Close dialog
        if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            return this.close();
        }
    }

    getData(options?: Partial<Application.Options>): LevelUpDialogApplicationData {
        // FIXME: We should remove from this list stats already at max value, and handle special case when character is already maxed on every stat
        let availableLevelUStats = StatsCharacterDataComputer.statsNames.reduce((previousValue, currentValue) => {
            previousValue[currentValue] = currentValue;
            return previousValue;
        }, {});

        let data = <LevelUpDialogApplicationData>{
            ...super.getData(options),
            ...this.levelUpData,
            additionalStat: this.additionalStat,
            stats: availableLevelUStats,
            diceData: {...this.diceData},
            ready: false
        };

        if (this.levelUpData?.additionalHealth?.useStatValue) {
            data.additionalHealth.value = (data.additionalHealth.value || 0) + this.actorStats[this.levelUpData?.additionalHealth?.useStatValue].value;
        }

        if (this.levelUpData?.additionalMana?.useStatValue) {
            data.additionalMana.value = (data.additionalMana.value || 0) + this.actorStats[this.levelUpData?.additionalMana?.useStatValue].value;
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

    /**
     * @param {jQuery} html
     */
    updateDiceData(html) {
        let data = this.getData();
        if (data.additionalHealth.diceCount) {
            for (let i = 0; i < data.additionalHealth.diceCount; i++) {
                this.diceData['health-' + i] = +html.find(`[data-dice-health='${i}']`)[0].value;
            }
        }
        if (data.additionalMana.diceCount) {
            for (let i = 0; i < data.additionalMana.diceCount; i++) {
                this.diceData['mana-' + i] = +html.find(`[data-dice-mana='${i}']`)[0].value;
            }
        }
        if (this.levelUpData.toLevel === 1) {
            for (let i = 0; i < 2; i++) {
                this.diceData['money-' + i] = +html.find(`[data-dice-money='${i}']`)[0].value;
            }
        }
    }

    getCompleteData(): LevelData {
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

        if (this.levelUpData.toLevel === 1) {
            money = (this.diceData['money-0'] || 0) + (this.diceData['money-1'] || 0);
        }

        return {
            health: health,
            mana: mana,
            money: money,
            additionalStat: this.additionalStat
        }
    }

    /** @override */
    get title() {
        return "Level Up !";
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        html.find('[data-dice-money]').on('change', ev => {
            this.updateDiceData(html);
            this.render(true)
        });
        html.find('[data-dice-health]').on('change', ev => {
            this.updateDiceData(html);
            this.render(true)
        });
        html.find('[data-dice-mana]').on('change', ev => {
            this.updateDiceData(html);
            this.render(true)
        });
        html.find('[name="additionalStat"]').on('change', ev => {
            this.additionalStat = ev.target.value;
            this.render(true)
        });

        html.find('[data-action]').on('click', ev => {
            switch (ev.target.dataset["action"]) {
                case 'cancel': {
                    this.close();
                    break;
                }
                case 'rollHealthDice': {
                    this.rollDice(this.getData().additionalHealth.diceCount, 'health');
                    break;
                }
                case 'rollMoneyDice': {
                    this.rollDice(2, 'money');
                    break;
                }
                case 'rollManaDice': {
                    this.rollDice(this.getData().additionalMana.diceCount, 'mana');
                    break;
                }
                case 'confirm': {
                    this.updateDiceData(html);
                    this.onComplete(this.getCompleteData());
                    this.close();
                    break;
                }
            }
        });
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "levelUp",
            template: "systems/lvl0mf-sheet/ui/dialog/level-up-dialog.hbs",
            popOut: true,
        });
    }

    async rollDice(count, type) {
        let roll = new Roll(count + 'd6');
        await roll.roll({async: true})

        for (let i = 0; i < roll.terms[0].results.length; i++) {
            this.diceData[type + '-' + i] = roll.terms[0].results[i].result;
        }

        const messageData = roll.toMessage({}, {create: false});
        let content: string;
        if (type === 'money')
            content = `<p>Oricaux initiaux: ${roll.total} !</p> ${await roll.render()}`;
        else
            content = `<p><strong>LevelUp</strong> Gain de ${roll.total} point de ${type === 'health' ? 'vie' : 'mana'} !</p> ${await roll.render()}`;

        const speaker = ChatMessage.getSpeaker({actor: this.levelUpData.actor});
        await ChatMessage.create({...messageData, content, speaker});

        this.render(true);
    }
}
