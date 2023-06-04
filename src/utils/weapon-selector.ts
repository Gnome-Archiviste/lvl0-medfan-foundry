import {inject, singleton} from 'tsyringe';
import {DialogAwaiter, WeaponSelectorDialog, WeaponSelectorDialogData} from "../ui/dialog";
import {Lvl0FoundryItemAmmunition, Lvl0FoundryItemWeapon, WeaponItemProperties, WeaponType} from '../models/item';

@singleton()
export class WeaponSelector {

    constructor(
        @inject(DialogAwaiter) private readonly dialogAwaiter: DialogAwaiter
    ) {
    }

    async selectWeapon(token: Token, weaponType: 'range' | 'melee'): Promise<[weapon?: Lvl0FoundryItemWeapon, ammunition?: Lvl0FoundryItemAmmunition]> {
        if (!token.actor)
            throw new Error(`No actor associated with token: ${token.name} (${token.id})`)
        let itemsByType = token.actor.itemTypes;

        let weapons = itemsByType['weapon']
            .filter(w => w.data.data.equiped)
            .filter(w => (w.data as WeaponItemProperties).data.weaponType === weaponType || (w.data as WeaponItemProperties).data.weaponType === WeaponType.MeleeRange);
        if (weapons.length === 0) {
            if (weaponType === 'melee')
                ui.notifications?.error("Vous devez équiper une arme de mêlée pour effectuer cette action");
            else
                ui.notifications?.error("Vous devez équiper une arme pour attaquer a distance pour effectuer cette action");
            return [];
        }

        let useAmmunitionType = new Set(weapons.map(f => (f.data as WeaponItemProperties).data.usedAmmunitionType));
        let ammunition = itemsByType['ammunition']
            .filter(a => useAmmunitionType.has(a.data.data.ammunitionType));

        let weaponSelectorData: WeaponSelectorDialogData = {
            weapons: weapons,
            ammunition: ammunition,
            weaponType: weaponType
        };

        if (weapons.length === 1 && (!(weapons[0].data as WeaponItemProperties).data.usedAmmunitionType || ammunition.length === 0)) {
            return [weapons[0]];
        }

        return (await this.dialogAwaiter.openAndWaitResult(WeaponSelectorDialog, weaponSelectorData)) || []
    }
}
