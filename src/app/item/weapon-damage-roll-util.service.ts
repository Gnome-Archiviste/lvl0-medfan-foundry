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
        foundryAssert(weapon.system.damage, `Weapon '${weapon.name}' does not have any damage configured`);

        let damageRollFormula = weapon.system.damage.split(' ').join();
        if (weapon.system.weaponType === 'melee-range') {
            if (weaponType === 'range') {
                foundryAssert(weapon.system.rangeDamage, `Weapon '${weapon.name}' does not have any rangeDamage configured`);
                damageRollFormula = weapon.system.rangeDamage.split(' ').join();
            }
        }

        let damageRollWithAmmunition = '';
        if (ammunition) {
            let extraDamageRoll = ammunition.system.extraDamage.split(' ').join();
            if (extraDamageRoll) {
                damageRollWithAmmunition = '(' + damageRollFormula + '+' + extraDamageRoll + ')';
            }
        }
        return [damageRollFormula, damageRollWithAmmunition];
    }

    getWeaponAndAmmunitionDamageRolls(
        weaponType: 'range' | 'melee',
        weapon: Lvl0ItemWeapon,
        ammunition?: Lvl0ItemAmmunition
    ): [damageRollFormula: string, ammunitionDamageRollFormula?: string] {
        if (!weapon.system.damage)
            throw new Error('No damage configured for the weapon ' + weapon.name);
        let damageRollFormula = weapon.system.damage.split(' ').join();
        if (weapon.system.weaponType === 'melee-range') {
            if (weaponType === 'range') {
                if (!weapon.system.rangeDamage)
                    throw new Error('No rangeDamage configured for the weapon ' + weapon.name);
                damageRollFormula = weapon.system.rangeDamage.split(' ').join();
            }
        }

        let ammunitionDamageRollFormula: string | undefined = undefined;
        if (ammunition) {
            ammunitionDamageRollFormula = ammunition.system.extraDamage.split(' ').join();
        }
        return [damageRollFormula, ammunitionDamageRollFormula];
    }
}
