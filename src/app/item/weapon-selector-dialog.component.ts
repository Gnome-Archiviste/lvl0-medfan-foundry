import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogDataService} from '../data-accessor/dialog-data-service';
import {Lvl0ItemAmmunition, Lvl0ItemWeapon} from '../data-accessor/models/lvl0-item';

export type WeaponSelectorDialogData = {
    weapons: Lvl0ItemWeapon[],
    weaponType: 'range' | 'melee',
    ammunition: Lvl0ItemAmmunition[]
}

export type WeaponSelectorDialogResult = {
    selectedWeapon: Lvl0ItemWeapon;
    selectedAmmo?: Lvl0ItemAmmunition;
}

@Component({
    selector: 'lvl0-weapon-selector-dialog',
    templateUrl: './weapon-selector-dialog.component.html',
    styleUrls: ['./weapon-selector-dialog.component.scss'],
    standalone: false
})
export class WeaponSelectorDialogComponent {
    @Input('dialogDataId')
    dialogDataId: string;
    @Output('close')
    close: EventEmitter<WeaponSelectorDialogResult> = new EventEmitter<WeaponSelectorDialogResult>();
    data: WeaponSelectorDialogData;

    selectedWeapon: Lvl0ItemWeapon;
    selectedAmmo?: Lvl0ItemAmmunition;

    constructor(
        private readonly dialogDataService: DialogDataService
    ) {
    }

    ngOnInit(): void {
        if (this.dialogDataId) {
            this.data = this.dialogDataService.consumeData<WeaponSelectorDialogData>(this.dialogDataId);
            this.selectedWeapon = this.data.weapons[0];
        }
    }

    cancel() {
        this.close.emit(undefined);
    }

    select() {
        this.close.emit({
            selectedWeapon: this.selectedWeapon,
            selectedAmmo: this.selectedAmmo
        });

    }

    selectWeapon(item: Lvl0ItemWeapon) {
        this.selectedWeapon = item;
    }

    selectAmmo(item: Lvl0ItemAmmunition | undefined) {
        this.selectedAmmo = item;
    }
}
