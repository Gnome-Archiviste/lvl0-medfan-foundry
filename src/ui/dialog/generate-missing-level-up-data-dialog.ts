import {DialogBase} from './dialog-base';
import {Lvl0Actor} from '../../models/actor/lvl0-actor';
import {LevelData} from '../../models/actor/properties-data/lvl0-actor-character-data';
import {
    StatsCharacterDataComputer
} from '../../models/actor/actor-data-computers/character/stats-character-data-computer';

export interface GenerateMissingLevelUpDataDialogData {
    levelWithMissingData: number[];
    additionalHealth: { [level: number]: { value?: number, useStatValue?: string, diceCount?: number } };
    additionalMana: { [level: number]: { value?: number, useStatValue?: string, diceCount?: number } };
    levelWithAdditionalPointInStat: number[];
    actor: Lvl0Actor;
}

export interface GenerateMissingLevelUpDataApplicationData {
    ready: boolean
    levelsData?: { [level: number]: LevelData }
    totalNewHealth: number
    totalNewMana: number
}

export class GenerateMissingLevelUpDataDialog extends DialogBase<GenerateMissingLevelUpDataDialogData,  { [level: number]: LevelData }> {
    private levelsData?: { [level: number]: LevelData };

    override async getData(options?: Partial<Application.Options>): Promise<GenerateMissingLevelUpDataApplicationData> {
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

    protected getResult(): { [p: number]: LevelData } | undefined {
        return this.levelsData;
    }

    override activateListeners(html: JQuery) {
        super.activateListeners(html);

        for (let lvl of this.dialogData.levelWithAdditionalPointInStat) {
            html.find('[name="additionalStat' + lvl + '"]').on('change', ev => {
                this.levelsData![lvl].additionalStat = (ev.target as HTMLInputElement).value;
                this.render(true)
            });
        }
    }

    private async initIfNeeded() {
        if (this.levelsData)
            return;
        this.levelsData = {};
        for (let level of this.dialogData.levelWithMissingData) {
            this.levelsData[level] = {
                health: await this.getValueOrDoRoll(this.dialogData.additionalHealth[level]),
                mana: await this.getValueOrDoRoll(this.dialogData.additionalMana[level]),
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

    static get defaultOptions(): Application.Options {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "levelUp",
            width: 350,
            title: 'Multiple Level Up',
            template: "systems/lvl0mf-sheet/ui/dialog/generate-missing-level-up-data-dialog.hbs",
            popOut: true,
        });
    }
}