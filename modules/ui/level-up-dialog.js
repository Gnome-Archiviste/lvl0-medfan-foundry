/**
 * @typedef {Object} LevelUpDialogData
 * @property {number} toLevel
 * @property {{value: number, useStatValue: string, diceCount: number}} additionalHealth
 * @property {{value: number, useStatValue: string, diceCount: number}} additionalMana
 * @property {boolean} hasNewSpeciality
 */
/**
 * @callback CompleteLevelUpDialog
 * @param {LevelData} selectedSpecialityName
 */

export class LevelUpDialog extends Application {
    /**
     * @param {LevelUpDialogData} levelUpData
     * @param {Statistics} actorStats
     * @param {CompleteLevelUpDialog} onComplete
     */
    constructor(levelUpData, actorStats, onComplete) {
        super();

        this.levelUpData = levelUpData;
        this.actorStats = actorStats;
        this.onComplete = onComplete;
        this.diceData = {};
    }

    getData(options = {}) {
        let data = super.getData(options);
        data = {...data, ...this.levelUpData, diceData: {...this.diceData}};

        if (this.levelUpData?.additionalHealth?.useStatValue) {
            data.additionalHealth.value = (data.additionalHealth.value || 0) + this.actorStats[data.additionalHealth.useStatValue].value;
            delete data.additionalHealth.useStatValue;
        }

        if (this.levelUpData?.additionalMana?.useStatValue) {
            data.additionalMana.value = (data.additionalMana.value || 0) + this.actorStats[data.additionalMana.useStatValue].value;
            delete data.additionalMana.useStatValue;
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

    getCompleteData() {
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
            money: money
        }
    }

    /** @override */
    get title() {
        return "Level Up !";
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Update Inventory Item
        html.find('[data-action]').click(ev => {
            switch (ev.target.dataset["action"]) {
                case 'cancel': {
                    this.close();
                    break;
                }
                case 'rollHealthDice': {
                    this.rollDice(this.getData().additionalHealth.diceCount ,'health');
                    break;
                }
                case 'rollMoneyDice': {
                    this.rollDice(2 ,'money');
                    break;
                }
                case 'rollManaDice': {
                    this.rollDice(this.getData().additionalMana.diceCount ,'mana');
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
            template: "systems/lvl0mf-sheet/templates/ui/level-up.hbs",
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
        if (type === 'money')
            messageData.content = `<p>Oricaux initiaux: ${roll.total} !</p> ${await roll.render()}`;
        else
            messageData.content = `<p><strong>LevelUp</strong> Gain de ${roll.total} point de ${type === 'health' ? 'vie' : 'mana'} !</p> ${await roll.render()}`;
        messageData.speaker = ChatMessage.getSpeaker({token: game.token});
        await ChatMessage.create(messageData);

        this.render(true);
    }
}
