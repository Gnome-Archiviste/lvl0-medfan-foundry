import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogDataService} from '../data-accessor/dialog-data-service';
import {RollFactory} from '../shared/roll-factory';
import {ActorBasicStatNames, ActorBasicStatNamesList} from '../../models/shared';

export type LevelUpDialogData = {
    readonly toLevel: number;
    readonly additionalHealth?: { value?: number, diceCount?: number };
    readonly additionalMana?: { value?: number, diceCount?: number };
    readonly hasAdditionalPointInStat: boolean;
    readonly hasNewSpeciality: boolean;
    readonly characterId: string;
}

export type LevelUpDialogResult = {
    readonly toLevel: number;
    readonly additionalHealth?: number;
    readonly additionalMana?: number;
    readonly additionalPointInStat?: ActorBasicStatNames;
    readonly money?: number;
}

@Component({
    selector: 'lvl0-level-up-dialog',
    templateUrl: './level-up-dialog.component.html',
    styleUrls: ['./level-up-dialog.component.scss'],
    standalone: false
})
export class LevelUpDialogComponent implements OnInit {
    @Input('dialogDataId')
    dialogDataId: string;
    @Output('close')
    close: EventEmitter<LevelUpDialogResult> = new EventEmitter<LevelUpDialogResult>();

    data: LevelUpDialogData;

    basicStats = ActorBasicStatNamesList;
    moneyDices?: number[];
    additionalHealthDices?: number[];
    additionalManaDices?: number[];
    additionalStat?: ActorBasicStatNames;

    constructor(
        private readonly dialogDataService: DialogDataService,
        private readonly rollFactory: RollFactory,
    ) {
    }

    ngOnInit(): void {
        if (this.dialogDataId) {
            this.data = this.dialogDataService.consumeData<LevelUpDialogData>(this.dialogDataId);
            if (this.data.toLevel === 1)
                this.moneyDices = this.generateArray(2);
            if (this.data.additionalHealth?.diceCount)
                this.additionalHealthDices = this.generateArray(this.data.additionalHealth.diceCount);
            if (this.data.additionalMana?.diceCount)
                this.additionalManaDices = this.generateArray(this.data.additionalMana.diceCount);
            if (this.data.hasAdditionalPointInStat)
                this.additionalStat = 'phy';
        }
    }

    async rollMoneyDices() {
        if (!this.moneyDices) {
            return;
        }
        let moneyRoll = await this.rollFactory.createRoll('2d6', (r) => ({
            message: `<p>Oricaux initiaux: ${r.total} !</p>`,
            actorId: this.data.characterId
        }));
        this.moneyDices[0] = moneyRoll.terms[0].results[0].result;
        this.moneyDices[1] = moneyRoll.terms[0].results[1].result;
    }

    generateArray(size: number): number[] {
        return new Array(size).fill(0);
    }

    async rollHealthDice() {
        if (this.additionalHealthDices) {
            let diceCount = this.additionalHealthDices.length;
            let roll = await this.rollFactory.createRoll(diceCount + 'd6', (r) => ({
                message: `<p><strong>LevelUp</strong> Gain de ${r.total} point de vie !</p>`,
                actorId: this.data.characterId
            }));
            for (let i = 0; i < diceCount; i++) {
                this.additionalHealthDices[i] = roll.terms[0].results[i].result;
            }
        }
    }

    async rollManaDice() {
        if (this.additionalManaDices) {
            let diceCount = this.additionalManaDices.length;
            let roll = await this.rollFactory.createRoll(diceCount + 'd6', (r) => ({
                message: `<p><strong>LevelUp</strong> Gain de ${r.total} point de mana !</p>`,
                actorId: this.data.characterId
            }));
            for (let i = 0; i < diceCount; i++) {
                this.additionalManaDices[i] = roll.terms[0].results[i].result;
            }
        }
    }

    isValid(): boolean {
        if (!this.isArraySet(this.additionalHealthDices)) {
            return false;
        }
        if (!this.isArraySet(this.additionalManaDices)) {
            return false;
        }
        if (!this.isArraySet(this.moneyDices)) {
            return false;
        }
        // FIXME: Check additional stats does not select maximum stats
        return true;
    }

    cancel() {
        this.close.emit();
    }

    valid() {
        this.close.emit({
            additionalHealth: this.sumArray(this.additionalHealthDices) || this.data.additionalHealth?.value,
            additionalMana: this.sumArray(this.additionalManaDices) || this.data.additionalMana?.value,
            toLevel: this.data.toLevel,
            additionalPointInStat: this.additionalStat,
            money: this.sumArray(this.moneyDices)
        });
    }

    private isArraySet(array: number[] | undefined) {
        if (!array) {
            return true;
        }
        for (let number of array) {
            if (number === 0)
                return false;
        }
        return true;
    }

    private sumArray(array: number[] | undefined) {
        if (!array)
            return undefined;

        return array.reduce((previousValue, currentValue) => currentValue + previousValue, 0);
    }
}
