import {RollSkillManager} from "../skill/roll-skill-manager";
import {WeaponSelector} from "../../utils/weapon-selector";
import {WeaponDamageRollUtil} from "../../utils/weapon-damage-roll-util";
import {RollHelper} from '../../utils/roll-helper';
import {WeaponType} from '../../models/item/properties/weapon-item-properties';
import {AmmunitionItemProperties} from '../../models/item/properties/ammunition-item-properties';
import {SpecialityDefinition} from '../../repositories/data/specialities';
import {SpecialityRepository} from '../../repositories/speciality-repository';
import {ElementRepository} from '../../repositories/element-repository';
import {assertIsCharacter} from '../../models/actor/properties/character-properties';

type ArrowResult = {
    result: 'fail' | 'epicFail';
    testRoll: Roll;
    testRollResult: number;
    arrowNumber: number;
} | {
    result: 'success' | 'criticalSuccess';
    testRollResult: number;
    testRoll: Roll;
    arrowNumber: number;
    damageRollFormula: string;
    damage: number;
    element: string;
    damageRoll: Roll;
    ammunition?: Item;
};

export class RollSpecialityManager {

    static needRoll(specialityId: string): boolean {
        if (specialityId === 'arrow_volley')
            return true;
        return false;
    }

    static async rollSpeciality(token: Token, specialityId: string): Promise<boolean> {
        if (specialityId === 'arrow_volley') {
            return await RollSpecialityManager.rollArrowVolley(token, SpecialityRepository.getSpecialityFromId(specialityId));
        }
        return true;
    }

    static async rollArrowVolley(token: Token, specialityDefinition: SpecialityDefinition): Promise<boolean> {
        if (!token) {
            ui.notifications?.error('Sélectionnez un token avant de faire cette action');
            return false;
        }

        return new Promise(async resolve => {
            if (!token.actor)
                return;
            assertIsCharacter(token.actor);
            let successRollValue = RollSkillManager.getSkillSuccessValue(token.actor.data.data, 'combat.throw_shoot');
            let [weapon, ammunition] = await WeaponSelector.selectWeapon(token, WeaponType.Range);
            if (!weapon) {
                resolve(false);
                return;
            }
            let weaponElement = weapon.data.data.element;

            let ammunitionElement: string | undefined;
            if (ammunition) {
                ammunitionElement = ammunition.data.data.extraDamageEffect;
            }

            let [weaponDamageRollFormula, weaponDamageWithAmmunitionRollFormula] = WeaponDamageRollUtil.getWeaponDamageRoll('range', weapon, ammunition);
            let availableAmmunitionQuantity = 0;
            if (ammunition) {
                availableAmmunitionQuantity = ammunition.data.data.quantity;
            }

            let arrows: ArrowResult[] = [];
            let ammunitionUsed = 0;

            for (let i = 0; i < 4; i++) {
                let testRoll = new Roll('2d6');
                await testRoll.roll({async: true});
                let rollResult = RollHelper.getRollResult(testRoll.total!, successRollValue);
                if (rollResult == 'epicFail') {
                    arrows.push({
                        testRoll: testRoll,
                        testRollResult: testRoll.total!,
                        result: rollResult,
                        arrowNumber: i + 1
                    })
                    break;
                }
                if (rollResult == 'fail') {
                    arrows.push({
                        testRoll: testRoll,
                        testRollResult: testRoll.total!,
                        result: rollResult,
                        arrowNumber: i + 1
                    })
                    continue;
                }

                let arrowElement = weaponElement;
                let damageRollFormula = weaponDamageRollFormula;
                let isAmmunitionUsedForArrow = false;
                if (ammunition && availableAmmunitionQuantity > ammunitionUsed) {
                    ammunitionUsed++;
                    isAmmunitionUsedForArrow = true;
                    arrowElement = ammunitionElement || weaponElement;
                    damageRollFormula = weaponDamageWithAmmunitionRollFormula;
                }

                let damageRoll = new Roll(damageRollFormula);
                await damageRoll.roll({async: true});
                arrows.push({
                    testRoll: testRoll,
                    testRollResult: testRoll.total!,
                    result: rollResult,
                    arrowNumber: i + 1,
                    damage: Math.ceil(Math.max(damageRoll.total!, 1)),
                    element: arrowElement,
                    damageRollFormula: damageRollFormula,
                    damageRoll,
                    ammunition: isAmmunitionUsedForArrow ? ammunition : undefined
                })
            }

            let message = `<div class="skill-roll-arrow-volley">
                <div class="title">${specialityDefinition.name}</div>`;

            message += `<div class="weapon">`;
            message += `<span class="name">${weapon.name}</span>`;
            message += `<span class="damage"><i class="fas fa-dice"></i> ${weaponDamageRollFormula}</span>`;
            message += `<img class="img" src="${weapon.img}" />`;
            message += `</div>`;

            for (const arrow of arrows) {
                message += `<div class="arrow">`;
                message += `<span class="label"><span class="arrow-number">Flèche ${arrow.arrowNumber}</span>`;

                if (arrow.result === 'success' || arrow.result === 'criticalSuccess') {
                    if (arrow.ammunition) {
                        let ammunitionData = arrow.ammunition.data as AmmunitionItemProperties;
                        message += `<span class="ammunition">
                            <span class="ammunition-name">${arrow.ammunition.name} - ${ammunitionData.data.extraDamage}</span>
                            <img class="ammunition-img" src="${arrow.ammunition.img}" />
                        </span>`;
                    }
                }
                message += `</span>`;
                message += `<span class="test-result"><i class="fas fa-dice"></i> ${arrow.testRollResult} / ${successRollValue} (${RollHelper.getTestResultMessage(arrow.result)})</span>`;
                message += `<span class="test-roll">${await RollHelper.renderRollSmall(arrow.testRoll)}</span>`;
                if (arrow.result === 'success' || arrow.result === 'criticalSuccess') {
                    message += `<span class="damage-result">Dégâts: ${arrow.damage} ${arrow.element ? '(' + ElementRepository.getElementWeaponName(arrow.element) + ')' : ''}</span>`;
                    message += `<span class="damage-roll">${await RollHelper.renderRollSmall(arrow.damageRoll)}</span>`;
                }
                message += `</div>`;
            }
            message += `</div>`;

            let content = message;
            let speaker = ChatMessage.getSpeaker({actor: token.actor!});
            await ChatMessage.create({speaker, content});

            if (ammunition) {
                await ammunition.update({
                    data: {
                        quantity: Math.max(0, ammunition.data.data.quantity - ammunitionUsed)
                    }
                }, {diff: true});
            }

            resolve(true);
        })
    }
}
