import {Injectable} from '@angular/core';
import {WeaponDamageRollUtil} from '../item/weapon-damage-roll-util.service';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {selectCharacterActiveSkillValue} from '../data-accessor/selectors/character-active-skill-value-selector';
import {combineLatest, take} from 'rxjs';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {RollFactory} from '../shared/roll-factory';
import {IRoll} from '../shared/roll';
import {SkillRollUtil} from '../skill/skill-roll-util';
import {WeaponSelectorService} from '../item/weapon-selector.service';
import {selectCharacterEffects} from '../data-accessor/selectors/character-effects-selector';

type ArrowResult = {
    result: 'fail' | 'epicFail';
    testRoll: IRoll;
    arrowNumber: number;
} | {
    result: 'success' | 'criticalSuccess';
    testRoll: IRoll;
    arrowNumber: number;
    damageRollFormula: string;
    damage: number;
    element: string;
    damageRoll: IRoll;
    ammunition?: {
        name: string;
        extraDamage: string;
        icon?: string;
    };
};

export type ArrowVolleyResult = {
    arrows: ArrowResult[];
    skillSuccessValue: number;
    weapon: {
        name: string;
        icon?: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class SpecialityArrowVolleyUtil {

    constructor(
        protected readonly weaponSelectorService: WeaponSelectorService,
        protected readonly weaponDamageRollUtil: WeaponDamageRollUtil,
        protected readonly characterAccessorService: CharacterAccessorService,
        protected readonly systemDataDatabaseService: SystemDataDatabaseService,
        protected readonly rollFactory: RollFactory,
        protected readonly skillRollUtil: SkillRollUtil,
    ) {
    }

    async rollArrowVolley(characterId: string): Promise<ArrowVolleyResult | undefined> {
        return new Promise(async resolve => {
            let character$ = this.characterAccessorService.selectCharacter(characterId);

            let weaponSelectionResult = await this.weaponSelectorService.selectWeapon(characterId, 'range')
            if (!weaponSelectionResult) {
                resolve(undefined);
                return;
            }

            let weapon = weaponSelectionResult.selectedWeapon;
            let ammunition = weaponSelectionResult.selectedAmmo;

            let ammunitionElement: string | undefined;
            let availableAmmunitionQuantity = 0;
            if (ammunition) {
                availableAmmunitionQuantity = ammunition.system.quantity;
                ammunitionElement = ammunition.system.extraDamageEffect;
            }

            let [weaponDamageRollFormula, weaponDamageWithAmmunitionRollFormula] = this.weaponDamageRollUtil.getWeaponDamageRoll('range', weapon, ammunition);

            combineLatest([
                character$.pipe(selectCharacterActiveSkillValue('combat', 'throw_shoot', this.systemDataDatabaseService)),
                character$.pipe(selectCharacterEffects(this.systemDataDatabaseService))
            ]).pipe(take(1))
                .subscribe(async ([activeSkillValue, characterEffects]) => {
                let arrows: ArrowResult[] = [];
                let ammunitionUsed = 0;

                for (let i = 0; i < 4; i++) {
                    let testRoll = await this.rollFactory.createRoll(`2d6`);
                    let rollResult = this.skillRollUtil.getRollResult(testRoll, activeSkillValue);
                    if (rollResult == 'epicFail') {
                        arrows.push({
                            testRoll: testRoll,
                            result: rollResult,
                            arrowNumber: i + 1
                        })
                        break;
                    }
                    if (rollResult == 'fail') {
                        arrows.push({
                            testRoll: testRoll,
                            result: rollResult,
                            arrowNumber: i + 1
                        })
                        continue;
                    }

                    let weaponElement = weapon.system.element;
                    let arrowElement = weaponElement;
                    let damageRollFormula = weaponDamageRollFormula;
                    let isAmmunitionUsedForArrow = false;
                    if (ammunition && availableAmmunitionQuantity > ammunitionUsed) {
                        ammunitionUsed++;
                        isAmmunitionUsedForArrow = true;
                        arrowElement = ammunitionElement || weaponElement;
                        damageRollFormula = weaponDamageWithAmmunitionRollFormula;
                    }

                    let damageBonus = 0;
                    for (let characterEffect of characterEffects) {
                        for (let modifier of characterEffect.modifiers) {
                            if (modifier.stat === 'damage')
                                damageBonus += +modifier.value;
                        }
                    }

                    if (damageBonus) {
                        damageRollFormula += `+${damageBonus}`;
                    }

                    let damageRoll = await this.rollFactory.createRoll(damageRollFormula);
                    arrows.push({
                        testRoll: testRoll,
                        result: rollResult,
                        arrowNumber: i + 1,
                        damage: Math.ceil(Math.max(damageRoll.total, 1)),
                        element: arrowElement,
                        damageRollFormula: damageRollFormula,
                        damageRoll: damageRoll,
                        ammunition: isAmmunitionUsedForArrow
                            ? {
                                name: ammunition!.name,
                                icon: ammunition!.img,
                                extraDamage: ammunition!.system.extraDamage
                            } : undefined
                    })
                }
                resolve({
                    arrows: arrows,
                    skillSuccessValue: activeSkillValue.successValue,
                    weapon: {
                        name: weapon.name,
                        icon: weapon.img
                    }
                })
            });
        });
    }

    getAllRolls(result: ArrowVolleyResult): IRoll[] {
        let rolls: IRoll[] = [];

        for (let arrow of result.arrows) {
            rolls.push(arrow.testRoll);
            if (arrow.result === 'criticalSuccess' || arrow.result === 'success') {
                rolls.push(arrow.damageRoll)
            }
        }
        return rolls;
    }
}
