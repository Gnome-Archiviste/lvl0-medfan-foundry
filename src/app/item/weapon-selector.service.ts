import {Injectable} from '@angular/core';
import {combineLatest, take} from 'rxjs';
import {Lvl0ItemAmmunition, Lvl0ItemWeapon} from '../data-accessor/models/lvl0-item';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {DialogService} from '../data-accessor/dialog-service';
import {selectCharacterItemsOfType} from '../data-accessor/selectors/character-selectors';
import {WeaponSelectorDialogData, WeaponSelectorDialogResult} from './weapon-selector-dialog.component';
import {WeaponType} from '../../models/item';

type WeaponSelectionResult = {
    selectedWeapon: Lvl0ItemWeapon;
    selectedAmmo?: Lvl0ItemAmmunition;
};

@Injectable({
    providedIn: 'root'
})
export class WeaponSelectorService {

    constructor(
        protected readonly characterAccessorService: CharacterAccessorService,
        protected readonly dialogService: DialogService,
    ) {
    }

    public selectWeapon(characterId: string, weaponType: 'range' | 'melee'): Promise<WeaponSelectionResult | undefined> {
        return new Promise<WeaponSelectionResult | undefined>(resolve => {
            let character$ = this.characterAccessorService.selectCharacter(characterId);
            combineLatest([
                character$.pipe(selectCharacterItemsOfType('weapon')),
                character$.pipe(selectCharacterItemsOfType('ammunition')),
            ]).pipe(take(1)).subscribe(async ([availableWeapons, availableAmmunition]: [Lvl0ItemWeapon[], Lvl0ItemAmmunition[]]) => {
                availableWeapons = availableWeapons
                    .filter(x => x.data.equiped)
                    .filter(w => w.data.weaponType == weaponType || w.data.weaponType === WeaponType.MeleeRange);

                if (availableWeapons.length == 0) {
                    resolve(undefined);
                    // FIXME: Show warning no weapon available
                    return;
                }

                if (weaponType == 'melee' && availableWeapons.length) {
                    resolve({selectedWeapon: availableWeapons[0]});
                    return;
                }

                this.dialogService.openDialog<WeaponSelectorDialogData, WeaponSelectorDialogResult>(
                    'lvl0-weapon-selector-dialog',
                    {weapons: availableWeapons, weaponType: weaponType, ammunition: availableAmmunition},
                    {title: 'Select weapon'}
                ).subscribe({
                    next: (result) => {
                        resolve(result);
                    },
                    complete: () => {
                        resolve(undefined);
                    }
                });
            });
        })
    }
}
