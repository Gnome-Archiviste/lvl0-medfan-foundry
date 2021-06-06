import {WeaponSelectorDialog} from "../ui/weapon-selector-dialog.js";

export class WeaponSelector {
    /**
     * @param {Token} token
     * @param {'melee'|'range'} weaponType
     * @return Promise<Item[]>
     */
    static selectWeapon(token, weaponType) {
        return new Promise((resolve, reject) => {
            let itemsByType = token.actor.itemTypes;
            console.log(itemsByType['weapon']);

            let weapons = itemsByType['weapon'].filter(w => w.data.data.weaponType === weaponType && w.data.data.equiped);
            if (weapons.length === 0) {
                if (weaponType === 'melee')
                    ui.notifications.error("Vous devez équiper une arme de mêlée pour effectuer cette action");
                else
                    ui.notifications.error("Vous devez équiper une arme pour attaquer a distance pour effectuer cette action");
                resolve([undefined, undefined]);
                return;
            }

            let weaponSelectorData = {
                weapons: weapons,
                ammunition: itemsByType['ammunition']
            };

            if (weapons.length === 1 && !weapons[0].data.data.usedAmmunitionType) {
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
