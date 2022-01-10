import {WeaponSelectorDialog, WeaponSelectorDialogData} from "../ui/weapon-selector-dialog.js";
import {WeaponItemProperties, WeaponType} from '../models/item/weapon-item-properties';
import {AmmunitionItemProperties} from '../models/item/ammunition-item-properties';

export class WeaponSelector {
    static selectWeapon(token: Token, weaponType: 'range' | 'melee'): Promise<[weapon?: Item, ammunition?: Item]> {
        return new Promise<[weapon?: Item, ammunition?: Item]>((resolve, reject) => {
            let itemsByType = token.actor!.itemTypes;

            let weapons = itemsByType['weapon']
                .filter(w => w.data.data.equiped)
                .filter(w => (w.data as WeaponItemProperties).data.weaponType === weaponType || (w.data as WeaponItemProperties).data.weaponType === WeaponType.MeleeRange);
            if (weapons.length === 0) {
                if (weaponType === 'melee')
                    ui.notifications?.error("Vous devez équiper une arme de mêlée pour effectuer cette action");
                else
                    ui.notifications?.error("Vous devez équiper une arme pour attaquer a distance pour effectuer cette action");
                resolve([undefined, undefined]);
                return;
            }

            let useAmmunitionType = new Set(weapons.map(f => (f.data as WeaponItemProperties).data.usedAmmunitionType));
            let ammunition = itemsByType['ammunition'].filter(a => useAmmunitionType.has((a.data as AmmunitionItemProperties).data.ammunitionType));

            let weaponSelectorData: WeaponSelectorDialogData = {
                weapons: weapons,
                ammunition: ammunition,
                weaponType: weaponType
            };

            if (weapons.length === 1 && (!(weapons[0].data as WeaponItemProperties).data.usedAmmunitionType || ammunition.length === 0)) {
                resolve([weapons[0], undefined])
                return;
            }

            let weaponSelectorDialog = new WeaponSelectorDialog(weaponSelectorData, async (weapons) => {
                resolve(weapons);
            });
            weaponSelectorDialog.render(true);
        });
    }
}
