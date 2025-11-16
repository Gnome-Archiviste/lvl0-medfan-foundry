import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Lvl0ItemWand} from '../data-accessor/models/lvl0-item';
import {DialogDataService} from '../data-accessor/dialog-data-service';
import {WandConfigRepository} from '../../repositories';
import {Spell} from '../spell/spell';

export type WandSelectorDialogData = {
    wands: Lvl0ItemWand[];
    spell: Spell;
    availableMana: number;
}

export type WandSelectorDialogResult = {
    wand: Lvl0ItemWand
    chargeCount: number;
}

@Component({
    selector: 'lvl0-wand-selector-dialog',
    templateUrl: './wand-selector-dialog.component.html',
    styleUrls: ['./wand-selector-dialog.component.scss'],
    standalone: false
})
export class WandSelectorDialogComponent {
    @Input('dialogDataId')
    dialogDataId: string;
    @Output('close')
    close: EventEmitter<WandSelectorDialogResult> = new EventEmitter<WandSelectorDialogResult>();

    data: WandSelectorDialogData;
    maxCharge: number;
    selectedWand?: Lvl0ItemWand;
    chargeCount = 1;
    maxChargeCount = 1;

    constructor(
        private readonly dialogDataService: DialogDataService,
        private readonly wandConfigRepository: WandConfigRepository,
    ) {
    }

    ngOnInit() {
        if (this.dialogDataId) {
            this.data = this.dialogDataService.consumeData<WandSelectorDialogData>(this.dialogDataId);
            this.maxCharge = this.wandConfigRepository.getWandConfig(this.data.spell.definition.level)?.maxChargesPerWand ?? 0
        }
    }

    selectWand(wand: Lvl0ItemWand) {
        this.selectedWand = wand;
        let maxChargeCount = this.maxCharge - wand.system.charge;
        this.maxChargeCount = Math.min(maxChargeCount, Math.floor(this.data.availableMana / this.data.spell.computedData.effectiveCost))
        if (this.maxChargeCount < this.chargeCount) {
            this.chargeCount = this.maxChargeCount;
        }
    }

    confirm() {
        if (this.selectedWand)
            this.close.emit({wand: this.selectedWand, chargeCount: this.chargeCount})
    }

    createRange(count: number) {
        return new Array(count).fill(0)
            .map((n, index) => index + 1);
    }
}
