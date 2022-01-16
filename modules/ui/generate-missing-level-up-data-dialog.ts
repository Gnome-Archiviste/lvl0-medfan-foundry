import {LevelData} from '../models/character/character';
import {Lvl0Actor} from '../lvl0-actor';
import {StatsCharacterDataComputer} from '../actor-data-computers/character/stats-character-data-computer';

export interface GenerateMissingLevelUpDataDialogData {
    levelWithMissingData: number[];
    additionalHealth: { [level: number]: { value?: number, useStatValue?: string, diceCount?: number } };
    additionalMana: { [level: number]: { value?: number, useStatValue?: string, diceCount?: number } };
    levelWithAdditionalPointInStat: number[];
    actor: Lvl0Actor;
}

export type CompleteGenerateMissingLevelUpData = (selectedSpecialityName?: { [level: number]: LevelData }) => void;

export interface GenerateMissingLevelUpDataApplicationData {
    ready: boolean
    levelsData?: { [level: number]: LevelData }
    totalNewHealth: number
    totalNewMana: number
}

export class GenerateMissingLevelUpDataDialog extends Application {
    private levelsData?: { [level: number]: LevelData };

    constructor(
        private readonly dialogData: GenerateMissingLevelUpDataDialogData,
        private readonly onComplete: CompleteGenerateMissingLevelUpData
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

    async getData(options?: Partial<Application.Options>): Promise<GenerateMissingLevelUpDataApplicationData> {
        let availableLevelUStats = StatsCharacterDataComputer.statsNames.reduce((previousValue, currentValue) => {
            previousValue[currentValue] = currentValue;
            return previousValue;
        }, {});

        await this.initIfNeeded();

        let isReady = true;
        for (let lvl of this.dialogData.levelWithAdditionalPointInStat) {
            if (!this.levelsData![lvl].additionalStat) {
                isReady = false;
            }
        }

        let totalNewHealth = 0;
        let totalNewMana = 0;
        for (let data of Object.values(this.levelsData!)) {
            totalNewHealth += data.health;
            totalNewMana += data.mana;
        }

        return {
            ...super.getData(options),
            levelWithAdditionalPointInStat: this.dialogData.levelWithAdditionalPointInStat,
            stats: availableLevelUStats,
            levelsData: this.levelsData,
            totalNewHealth,
            totalNewMana,
            ready: isReady
        } as GenerateMissingLevelUpDataApplicationData;
    }

    /** @override */
    get title() {
        return "Multiple Level Up";
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        for (let lvl of this.dialogData.levelWithAdditionalPointInStat) {
            html.find('[name="additionalStat' + lvl + '"]').on('change', ev => {
                this.levelsData![lvl].additionalStat = ev.target.value;
                this.render(true)
            });
        }
        html.find('[data-action]').on('click', ev => {
            switch (ev.target.dataset["action"]) {
                case 'cancel': {
                    this.close();
                    break;
                }
                case 'confirm': {
                    this.onComplete(this.levelsData);
                    this.close();
                    break;
                }
            }
        });
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "levelUp",
            width: 350,
            template: "systems/lvl0mf-sheet/templates/ui/generate-missing-level-up-data-dialog.hbs",
            popOut: true,
        });
    }

    private async initIfNeeded() {
        if (this.levelsData)
            return;
        this.levelsData = {};
        for (let level of this.dialogData.levelWithMissingData) {
            this.levelsData[level] = {
                health: await this.getValueOrDoRoll(this.dialogData.additionalHealth[level]),
                mana: await this.getValueOrDoRoll(this.dialogData.additionalHealth[level]),
                additionalStat: undefined,
                money: 0
            }
        }
    }

    private async getValueOrDoRoll(valueOrRoll: { value?: number, useStatValue?: string, diceCount?: number }): Promise<number> {
        if (valueOrRoll.value)
            return valueOrRoll.value;
        if (valueOrRoll.useStatValue) {
            return this.dialogData.actor.data.data.baseStats[valueOrRoll.useStatValue].value;
        }
        if (valueOrRoll.diceCount) {
            const roll = new Roll(valueOrRoll.diceCount + 'd6');
            await roll.roll({async: true});
            return roll.total!;
        }
        return 0;
    }
}
