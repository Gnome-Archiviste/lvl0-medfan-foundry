import {ElementsUtil} from "./elements-util.js";

export class WeaponDamageRollUtil {
    /**
     *
     * @param {'range'|'melee'} weaponType
     * @param {Item} weapon
     * @param {Item?} ammunition
     * @return {string[]}
     */
    static getWeaponDamageRoll(weaponType, weapon, ammunition) {
        let damageRollFormula = weapon.data.data.damage.split(' ').join();
        if (weapon.data.data.weaponType === 'melee-range') {
            if (weaponType === 'range') {
                damageRollFormula = weapon.data.data.rangeDamage.split(' ').join();
            }
        }

        let damageRollWithAmmunition = '';
        if (ammunition) {
            damageRollWithAmmunition =  '(' + damageRollFormula + '+' + ammunition.data.data.extraDamage.split(' ').join() + ')';
        }
        return [damageRollFormula, damageRollWithAmmunition];
    }

    /**
     * @param {'range'|'melee'} weaponType
     * @param {Item} weapon
     * @param {Item?} ammunition
     * @param {boolean} charge
     * @return {string[]}
     */
    static getWeaponAndAmmunitionDamageRolls(weaponType, weapon, ammunition) {
        let damageRollFormula = weapon.data.data.damage.split(' ').join();
        if (weapon.data.data.weaponType === 'melee-range') {
            if (weaponType === 'range') {
                damageRollFormula = weapon.data.data.rangeDamage.split(' ').join();
            }
        }

        let ammunitionDamageRollFormula = undefined;
        if (ammunition) {
            ammunitionDamageRollFormula = ammunition.data.data.extraDamage.split(' ').join();
        }
        return [damageRollFormula, ammunitionDamageRollFormula];
    }
}

Handlebars.registerHelper('weaponDamageFormula', (weaponType, /** @type {Item} */ weapon) => {
    let [weaponRollFormula] = WeaponDamageRollUtil.getWeaponAndAmmunitionDamageRolls(weaponType, weapon);
    let element = ElementsUtil.getNameForWeapon(weapon.data.data.element);

    if (element) {
        return `${weaponRollFormula} (${element})`;
    }
    return weaponRollFormula;
});
