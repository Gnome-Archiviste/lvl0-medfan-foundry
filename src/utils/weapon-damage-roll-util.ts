import {foundryAssert} from './error';
import {Lvl0FoundryItemAmmunition, Lvl0FoundryItemWeapon} from '../models/item/lvl0-item-types';
import {ElementRepository} from '../repositories/element-repository';
import {container, singleton} from 'tsyringe';

@singleton()
export class WeaponDamageRollUtil {
    getWeaponAndAmmunitionDamageRolls(
        weaponType: 'range' | 'melee',
        weapon: Lvl0FoundryItemWeapon,
        ammunition?: Lvl0FoundryItemAmmunition
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

Handlebars.registerHelper('weaponDamageFormula', (weaponType: 'range' | 'melee', weapon: Lvl0FoundryItemWeapon) => {
    let [weaponRollFormula] = container.resolve(WeaponDamageRollUtil).getWeaponAndAmmunitionDamageRolls(weaponType, weapon);
    let element = container.resolve(ElementRepository).getElementWeaponName(weapon.data.data.element);

    if (element) {
        return `${weaponRollFormula} (${element})`;
    }
    return weaponRollFormula;
});
