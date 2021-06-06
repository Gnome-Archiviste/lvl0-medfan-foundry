import {WeaponSelectorDialog} from "../ui/weapon-selector-dialog.js";

/**
 * @callback selectWeaponCallback
 * @param {Item[]} selectedWeapons
 */
export class WeaponSelector {
    /**
     * @param {Token} token
     * @param {'melee'|'range'} weaponType
     * @param {selectWeaponCallback} onSelect
     */
    static selectWeapon(token, weaponType, onSelect) {
        let itemsByType = token.actor.itemTypes;
        console.log(itemsByType['weapon']);

        let weaponSelectorData = {
            weapons: itemsByType['weapon'].filter(w => w.data.data.weaponType === weaponType),
            ammunition: itemsByType['ammunition']
        };

        let weaponSelectorDialog = new WeaponSelectorDialog(weaponSelectorData, async (weapons) => {
            onSelect(weapons);
        });
        weaponSelectorDialog.render(true);
    }
}
