import {ElementsUtil} from "./elements-util.js";

export class WeaponDamageRollUtil {
    /**
     *
     * @param {'range'|'melee'} weaponType
     * @param {Item} weapon
     * @param {Item?} ammunition
     * @return {string[]}
     */
    static getWeaponDamageRoll(weaponType, weapon, ammunition): [damageRollFormula: string, damageRollWithAmmunition: string] {
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

    static getWeaponAndAmmunitionDamageRolls(
        weaponType: 'range'|'melee',
        weapon: Item,
        ammunition?: Item
    ):[damageRollFormula: string, ammunitionDamageRollFormula?: string] {
        if (weapon.data.type !== 'weapon')
            throw new Error('Expected to receive a weapon here, but received: ' + weapon.data.name + ' ' + weapon.data.type);
        if (!weapon.data.data.damage)
            throw new Error('No damage configured for the weapon ' + weapon.name);
        let damageRollFormula = weapon.data.data.damage.split(' ').join();
        if (weapon.data.data.weaponType === 'melee-range') {
            if (weaponType === 'range') {
                if (!weapon.data.data.rangeDamage)
                    throw new Error('No rangeDamage configured for the weapon ' + weapon.name);
                damageRollFormula = weapon.data.data.rangeDamage.split(' ').join();
            }
        }

        let ammunitionDamageRollFormula: string | undefined = undefined;
        if (ammunition) {
            if (ammunition.data.type !== 'ammunition')
                throw new Error('Expected to receive a ammunition here, but received: ' + weapon.data.name + ' ' + weapon.data.type);
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
