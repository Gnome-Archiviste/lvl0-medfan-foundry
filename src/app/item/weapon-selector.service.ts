import {Injectable} from '@angular/core';
import {combineLatest, firstValueFrom} from 'rxjs';
import {Lvl0ItemAmmunition, Lvl0ItemWeapon} from '../data-accessor/models/lvl0-item';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {DialogService} from '../data-accessor/dialog-service';
import {selectCharacterItemsOfType} from '../data-accessor/selectors/character-selectors';
import {WeaponSelectorDialogData, WeaponSelectorDialogResult} from './weapon-selector-dialog.component';
import {WeaponType} from '../../models/item';
import {PlayerNotificationService} from '../shared/player-notification.service';

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
        private readonly playerNotificationService: PlayerNotificationService,
    ) {
    }

    public async selectWeapon(characterId: string, weaponType: 'range' | 'melee'): Promise<WeaponSelectionResult | undefined> {
        let character$ = this.characterAccessorService.selectCharacter(characterId);
        let [availableWeapons, availableAmmunition] = await firstValueFrom(combineLatest([
            character$.pipe(selectCharacterItemsOfType<Lvl0ItemWeapon>('weapon')),
            character$.pipe(selectCharacterItemsOfType<Lvl0ItemAmmunition>('ammunition')),
        ]))
        availableWeapons = availableWeapons
            .filter(x => x.data.equiped)
            .filter(w => w.data.weaponType == weaponType || w.data.weaponType === WeaponType.MeleeRange);

        if (availableWeapons.length == 0) {
            this.playerNotificationService.showWarning('no_weapon_available')
            return;
        }

        if (weaponType == 'melee' && availableWeapons.length) {
            return {selectedWeapon: availableWeapons[0]};
        }

        if (weaponType == 'range' && availableWeapons.length && availableAmmunition.length === 0) {
            return {selectedWeapon: availableWeapons[0]};
        }

        return await firstValueFrom(this.dialogService.openDialog<WeaponSelectorDialogData, WeaponSelectorDialogResult>(
            'lvl0-weapon-selector-dialog',
            {weapons: availableWeapons, weaponType: weaponType, ammunition: availableAmmunition},
            {title: 'Select weapon'}
        ), {defaultValue: undefined})
    }
}
