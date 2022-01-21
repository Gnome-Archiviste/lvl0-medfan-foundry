import {WeaponSelectorDialog, WeaponSelectorDialogData} from "../ui/dialog/weapon-selector-dialog";
import {DialogAwaiter} from './dialog-awaiter';
import {WeaponItemProperties, WeaponType} from '../models/item/properties/weapon-item-properties';
import {AmmunitionItemProperties} from '../models/item/properties/ammunition-item-properties';

export class WeaponSelector {
    static async selectWeapon(token: Token, weaponType: 'range' | 'melee'): Promise<[weapon?: Item, ammunition?: Item]> {
        let itemsByType = token.actor!.itemTypes;

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
        let ammunition = itemsByType['ammunition'].filter(a => useAmmunitionType.has((a.data as AmmunitionItemProperties).data.ammunitionType));

        let weaponSelectorData: WeaponSelectorDialogData = {
            weapons: weapons,
            ammunition: ammunition,
            weaponType: weaponType
        };

        if (weapons.length === 1 && (!(weapons[0].data as WeaponItemProperties).data.usedAmmunitionType || ammunition.length === 0)) {
            return [weapons[0]];
        }

        return (await DialogAwaiter.openAndWaitResult(WeaponSelectorDialog, weaponSelectorData)) || []
    }
}
