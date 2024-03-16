import {Component, Input} from '@angular/core';
import {Lvl0ItemWeapon} from '../data-accessor/models/lvl0-item';
import {WeaponDamageRollUtil} from './weapon-damage-roll-util.service';
import {ElementRepository} from '../../repositories';

@Component({
    selector: 'lvl0-weapon-damage',
    templateUrl: './weapon-damage.component.html',
    styleUrls: ['./weapon-damage.component.scss']
})
export class WeaponDamageComponent {
    @Input('weapon')
    weapon: Lvl0ItemWeapon;
    @Input('mode')
    mode: 'melee' | 'range';

    constructor(
        private readonly weaponDamageRollUtil: WeaponDamageRollUtil,
    ) {
    }

    getWeaponDamage(weapon: Lvl0ItemWeapon): string {
        let [rollFormula] = this.weaponDamageRollUtil.getWeaponAndAmmunitionDamageRolls(this.mode, weapon);
        return rollFormula;
    }
}
