import {Injectable} from '@angular/core';
import {foundryAssert} from '../../utils/error';
import {Lvl0ItemAmmunition, Lvl0ItemWeapon} from '../data-accessor/models/lvl0-item';

@Injectable({
    providedIn: 'root'
})
export class WeaponDamageRollUtil {
    getWeaponDamageRoll(
        weaponType: "range" | "melee",
        weapon: Lvl0ItemWeapon,
        ammunition?: Lvl0ItemAmmunition)
        : [damageRollFormula: string, damageRollWithAmmunition: string] {
        foundryAssert(weapon.data.damage, `Weapon '${weapon.name}' does not have any damage configured`);

        let damageRollFormula = weapon.data.damage.split(' ').join();
        if (weapon.data.weaponType === 'melee-range') {
            if (weaponType === 'range') {
                foundryAssert(weapon.data.rangeDamage, `Weapon '${weapon.name}' does not have any rangeDamage configured`);
                damageRollFormula = weapon.data.rangeDamage.split(' ').join();
            }
        }

        let damageRollWithAmmunition = '';
        if (ammunition) {
            damageRollWithAmmunition = '(' + damageRollFormula + '+' + ammunition.data.extraDamage.split(' ').join() + ')';
        }
        return [damageRollFormula, damageRollWithAmmunition];
    }

    getWeaponAndAmmunitionDamageRolls(
        weaponType: 'range' | 'melee',
        weapon: Lvl0ItemWeapon,
        ammunition?: Lvl0ItemAmmunition
    ): [damageRollFormula: string, ammunitionDamageRollFormula?: string] {
        if (!weapon.data.damage)
            throw new Error('No damage configured for the weapon ' + weapon.name);
        let damageRollFormula = weapon.data.damage.split(' ').join();
        if (weapon.data.weaponType === 'melee-range') {
            if (weaponType === 'range') {
                if (!weapon.data.rangeDamage)
                    throw new Error('No rangeDamage configured for the weapon ' + weapon.name);
                damageRollFormula = weapon.data.rangeDamage.split(' ').join();
            }
        }

        let ammunitionDamageRollFormula: string | undefined = undefined;
        if (ammunition) {
            ammunitionDamageRollFormula = ammunition.data.extraDamage.split(' ').join();
        }
        return [damageRollFormula, ammunitionDamageRollFormula];
    }
}
