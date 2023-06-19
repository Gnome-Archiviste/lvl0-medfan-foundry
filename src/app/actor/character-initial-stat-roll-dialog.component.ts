import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogDataService} from '../data-accessor/dialog-data-service';
import {LevelUpDialogData} from './level-up-dialog.component';
import {RollFactory} from '../shared/roll-factory';
import {ActorBasicStatNames, ActorBasicStatNamesList} from '../../models/shared';
import {ActorBasicStatValues} from '../data-accessor/selectors/character-basic-stats-selector';

@Component({
    selector: 'lvl0-character-initial-stat-roll-dialog',
    templateUrl: './character-initial-stat-roll-dialog.component.html',
    styleUrls: ['./character-initial-stat-roll-dialog.component.scss']
})
export class CharacterInitialStatRollDialogComponent implements OnInit {
    @Input('dialogDataId')
    dialogDataId: string;
    @Output('close')
    close: EventEmitter<ActorBasicStatValues> = new EventEmitter<ActorBasicStatValues>();

    state: 'modeSelection' | 'selectColumn' | 'selectValues' = 'modeSelection';
    rolls: number[][] = [];
    selectedValues: number[] = [0, 0, 0, 0, 0];
    statNames = ActorBasicStatNamesList;
    statForValue: string[] = [...ActorBasicStatNamesList];

    constructor(
        private dialogDataService: DialogDataService,
        private rollFactory: RollFactory,
    ) {
    }

    ngOnInit(): void {
        if (this.dialogDataId)
            this.dialogDataService.consumeData<LevelUpDialogData>(this.dialogDataId);
    }

    async selectMode(mode: 'random-1' | 'random-3') {
        if (mode === 'random-1') {
            let values: number[] = [];
            while (values.length < 5) {
                let random = await this.rollFactory.createRoll('1d6');
                if (random.total !== 1)
                    values.push(random.total);
            }
            this.selectValues(values);
        } else {
            this.rolls = [];
            while (this.rolls.length < 3) {
                let values: number[] = [];
                while (values.length < 5) {
                    let random = await this.rollFactory.createRoll('1d6');
                    values.push(random.total)
                }
                this.rolls.push(values);
            }
            this.state = 'selectColumn'
        }
    }

    selectRoll(index: number) {
        this.selectValues(this.rolls[index]);
    }

    private selectValues(values: number[]) {
        this.state = 'selectValues'
        this.selectedValues = values;
    }

    selectStat(index: number, stat: ActorBasicStatNames) {
        let indexForStat = this.statForValue.indexOf(stat);
        this.statForValue[indexForStat] = this.statForValue[index]
        this.statForValue[index] = stat;
    }

    valid() {
        this.close.emit({
            phy: this.getValueForStat('phy'),
            dex: this.getValueForStat('dex'),
            int: this.getValueForStat('int'),
            cha: this.getValueForStat('cha'),
            per: this.getValueForStat('per'),
        })
    }

    private getValueForStat(stat: ActorBasicStatNames): number {
        let indexForStat = this.statForValue.indexOf(stat);
        return this.selectedValues[indexForStat];
    }
}
