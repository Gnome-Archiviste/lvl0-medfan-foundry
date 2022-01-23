import {foundryAssert} from './error';
import {Lvl0ItemAmmunition, Lvl0ItemWeapon} from '../models/item/lvl0-item-types';
import {ElementRepository} from '../repositories/element-repository';
import {container, singleton} from 'tsyringe';

@singleton()
export class WeaponDamageRollUtil {
    getWeaponDamageRoll(weaponType: "range" | "melee", weapon: Lvl0ItemWeapon, ammunition?: Lvl0ItemAmmunition)
        : [damageRollFormula: string, damageRollWithAmmunition: string] {
        foundryAssert(weapon.data.data.damage, `Weapon '${weapon.name}' does not have any damage configured`);

        let damageRollFormula = weapon.data.data.damage.split(' ').join();
        if (weapon.data.data.weaponType === 'melee-range') {
            if (weaponType === 'range') {
                foundryAssert(weapon.data.data.rangeDamage, `Weapon '${weapon.name}' does not have any rangeDamage configured`);
                damageRollFormula = weapon.data.data.rangeDamage.split(' ').join();
            }
        }

        let damageRollWithAmmunition = '';
        if (ammunition) {
            damageRollWithAmmunition = '(' + damageRollFormula + '+' + ammunition.data.data.extraDamage.split(' ').join() + ')';
        }
        return [damageRollFormula, damageRollWithAmmunition];
    }

    getWeaponAndAmmunitionDamageRolls(
        weaponType: 'range' | 'melee',
        weapon: Lvl0ItemWeapon,
        ammunition?: Lvl0ItemAmmunition
    ): [damageRollFormula: string, ammunitionDamageRollFormula?: string] {
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
            ammunitionDamageRollFormula = ammunition.data.data.extraDamage.split(' ').join();
        }
        return [damageRollFormula, ammunitionDamageRollFormula];
    }
}

Handlebars.registerHelper('weaponDamageFormula', (weaponType: 'range' | 'melee', weapon: Lvl0ItemWeapon) => {
    let [weaponRollFormula] = container.resolve(WeaponDamageRollUtil).getWeaponAndAmmunitionDamageRolls(weaponType, weapon);
    let element = container.resolve(ElementRepository).getElementWeaponName(weapon.data.data.element);

    if (element) {
        return `${weaponRollFormula} (${element})`;
    }
    return weaponRollFormula;
});
