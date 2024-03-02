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
    elements: Record<string, string>;

    constructor(
        private readonly weaponDamageRollUtil: WeaponDamageRollUtil,
        private readonly elementRepository: ElementRepository,
    ) {
        this.elements = this.elementRepository.getElementWeaponNameByElementsIds()
    }

    getWeaponDamage(weapon: Lvl0ItemWeapon): string {
        let [rollFormula] = this.weaponDamageRollUtil.getWeaponAndAmmunitionDamageRolls(this.mode, weapon);
        return rollFormula;
    }
}
