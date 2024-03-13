import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LevelData} from '../data-accessor/models/lvl0-character';
import {DialogDataService} from '../data-accessor/dialog-data-service';
import {RollFactory} from '../shared/roll-factory';
import {ActorBasicStatValues} from '../data-accessor/selectors/character-basic-stats-selector';

export interface GenerateMissingLevelUpDataDialogData {
    basicStats: ActorBasicStatValues
    levelWithMissingData: number[];
    additionalHealth: { [level: number]: { value?: number, useStatValue?: string, diceCount?: number } };
    additionalMana: { [level: number]: { value?: number, useStatValue?: string, diceCount?: number } };
    levelWithAdditionalPointInStat: number[];
}

export interface GenerateMissingLevelUpDataDialogResult {
    levelUpData: Record<number, LevelData>
}

@Component({
    selector: 'lvl0-generate-missing-level-up-data-dialog',
    templateUrl: './generate-missing-level-up-data-dialog.component.html',
    styleUrls: ['./generate-missing-level-up-data-dialog.component.scss']
})
export class GenerateMissingLevelUpDataDialogComponent implements OnInit {
    @Input('dialogDataId')
    dialogDataId: string;
    @Output('close')
    close: EventEmitter<GenerateMissingLevelUpDataDialogResult> = new EventEmitter<GenerateMissingLevelUpDataDialogResult>();

    data: GenerateMissingLevelUpDataDialogData;
    levelsData: Record<number, LevelData> = {};
    totalNewHealth: number = 0;
    totalNewMana: number = 0;
    stats = ['phy', 'dex', 'int', 'cha', 'per'];

    constructor(
        private dialogDataService: DialogDataService,
        private rollFactory: RollFactory,
    ) {
    }

    ngOnInit(): void {
        if (!this.dialogDataId)
            return;
        this.data = this.dialogDataService.consumeData<GenerateMissingLevelUpDataDialogData>(this.dialogDataId);
        this.levelsData = {};
        this.initLevelUpData()
    }

    get ready() {
        for (let lvl of this.data.levelWithAdditionalPointInStat) {
            if (!this.levelsData![lvl].additionalStat) {
                return false;
            }
        }

        return true;
    }

    private async getValueOrDoRoll(valueOrRoll: {
        value?: number,
        useStatValue?: string,
        diceCount?: number
    }): Promise<number> {
        if (valueOrRoll.value)
            return valueOrRoll.value;
        if (valueOrRoll.useStatValue) {
            return this.data.basicStats[valueOrRoll.useStatValue].value;
        }
        if (valueOrRoll.diceCount) {
            const roll = await this.rollFactory.createRoll(valueOrRoll.diceCount + 'd6');
            return roll.total;
        }
        return 0;
    }

    private async initLevelUpData() {
        let levelsData: Record<number, LevelData> = {};
        for (let level of this.data.levelWithMissingData) {
            levelsData[level] = {
                health: 0,
                mana: 0,
                additionalStat: undefined,
                money: 0
            }
        }
        this.levelsData = levelsData;

        for (let level of this.data.levelWithMissingData) {
            this.levelsData[level].health = await this.getValueOrDoRoll(this.data.additionalHealth[level]);
            this.levelsData[level].mana = await this.getValueOrDoRoll(this.data.additionalMana[level]);
        }

        let totalNewHealth = 0;
        let totalNewMana = 0;
        for (let data of Object.values(this.levelsData!)) {
            totalNewHealth += data.health;
            totalNewMana += data.mana;
        }
        this.totalNewHealth = totalNewHealth;
        this.totalNewMana = totalNewMana;
    }

    cancel() {
        this.close.emit(undefined);
    }

    confirm() {
        this.close.emit({
            levelUpData: this.levelsData
        })
    }
}
