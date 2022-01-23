import {inject, singleton} from 'tsyringe';
import {RollSkillManager} from "../skill";
import {WeaponSelector} from "utils/weapon-selector";
import {WeaponDamageRollUtil} from "utils/weapon-damage-roll-util";
import {RollUtil} from 'utils/roll-util';
import {AmmunitionItemProperties, WeaponType} from 'models/item';
import {SpecialityDefinition} from 'repositories/data';
import {ElementRepository, SpecialityRepository} from 'repositories';
import {assertIsCharacter} from 'models/actor';
import {Evaluated, RollFactory} from 'utils/roll-factory';

type ArrowResult = {
    result: 'fail' | 'epicFail';
    testRoll: Evaluated<Roll>;
    testRollResult: number;
    arrowNumber: number;
} | {
    result: 'success' | 'criticalSuccess';
    testRollResult: number;
    testRoll: Evaluated<Roll>;
    arrowNumber: number;
    damageRollFormula: string;
    damage: number;
    element: string;
    damageRoll: Evaluated<Roll>;
    ammunition?: Item;
};

@singleton()
export class RollSpecialityManager {

    constructor(
        @inject(RollFactory) private readonly rollFactory: RollFactory,
        @inject(RollUtil) private readonly rollUtil: RollUtil,
        @inject(SpecialityRepository) private readonly specialityRepository: SpecialityRepository,
        @inject(RollSkillManager) private readonly rollSkillManager: RollSkillManager,
        @inject(WeaponDamageRollUtil) private readonly weaponDamageRollUtil: WeaponDamageRollUtil,
        @inject(WeaponSelector) private readonly weaponSelector: WeaponSelector,
        @inject(ElementRepository) private readonly elementRepository: ElementRepository,
    ) {
    }

    needRoll(specialityId: string): boolean {
        if (specialityId === 'arrow_volley')
            return true;
        return false;
    }

    async rollSpeciality(token: Token, specialityId: string): Promise<boolean> {
        if (specialityId === 'arrow_volley') {
            return await this.rollArrowVolley(token, this.specialityRepository.getSpecialityFromId(specialityId));
        }
        return true;
    }

    async rollArrowVolley(token: Token, specialityDefinition: SpecialityDefinition): Promise<boolean> {
        if (!token) {
            ui.notifications?.error('Sélectionnez un token avant de faire cette action');
            return false;
        }

        return new Promise(async resolve => {
            if (!token.actor)
                return;
            assertIsCharacter(token.actor);
            let successRollValue = this.rollSkillManager.getSkillSuccessValue(token.actor.data.data, 'combat.throw_shoot');
            let [weapon, ammunition] = await this.weaponSelector.selectWeapon(token, WeaponType.Range);
            if (!weapon) {
                resolve(false);
                return;
            }
            let weaponElement = weapon.data.data.element;

            let ammunitionElement: string | undefined;
            if (ammunition) {
                ammunitionElement = ammunition.data.data.extraDamageEffect;
            }

            let [weaponDamageRollFormula, weaponDamageWithAmmunitionRollFormula] = this.weaponDamageRollUtil.getWeaponDamageRoll('range', weapon, ammunition);
            let availableAmmunitionQuantity = 0;
            if (ammunition) {
                availableAmmunitionQuantity = ammunition.data.data.quantity;
            }

            let arrows: ArrowResult[] = [];
            let ammunitionUsed = 0;

            for (let i = 0; i < 4; i++) {
                let testRoll = await this.rollFactory.createRoll(`2d6`);
                testRoll.terms[0].options.flavor = `arrowTest${i}`;
                let rollResult = this.rollUtil.getRollResult(testRoll.total, successRollValue);
                if (rollResult == 'epicFail') {
                    arrows.push({
                        testRoll: testRoll,
                        testRollResult: testRoll.total,
                        result: rollResult,
                        arrowNumber: i + 1
                    })
                    break;
                }
                if (rollResult == 'fail') {
                    arrows.push({
                        testRoll: testRoll,
                        testRollResult: testRoll.total,
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

                let damageRoll = await this.rollFactory.createRoll(damageRollFormula);
                damageRoll.terms[0].options.flavor = `arrowDamage${i}`;
                arrows.push({
                    testRoll: testRoll,
                    testRollResult: testRoll.total,
                    result: rollResult,
                    arrowNumber: i + 1,
                    damage: Math.ceil(Math.max(damageRoll.total, 1)),
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
                message += `<span class="test-result"><i class="fas fa-dice"></i> ${arrow.testRollResult} / ${successRollValue} (${this.rollUtil.getTestResultMessage(arrow.result)})</span>`;
                message += `<span class="test-roll">${await this.rollUtil.renderRollSmall(arrow.testRoll)}</span>`;
                if (arrow.result === 'success' || arrow.result === 'criticalSuccess') {
                    message += `<span class="damage-result">Dégâts: ${arrow.damage} ${arrow.element ? '(' + this.elementRepository.getElementWeaponName(arrow.element) + ')' : ''}</span>`;
                    message += `<span class="damage-roll">${await this.rollUtil.renderRollSmall(arrow.damageRoll)}</span>`;
                }
                message += `</div>`;
            }
            message += `</div>`;

            let content = message;
            let speaker = ChatMessage.getSpeaker({actor: token.actor});
            let damageRolls = arrows.filter(a => this.rollUtil.isSuccess(a.result)).map(a => a as {damageRoll: Roll}).map(x => x.damageRoll);
            let allRolls = [...arrows.map(a => a.testRoll), ...damageRolls];
            // @ts-ignore
            await ChatMessage.create({speaker, content, type: CONST.CHAT_MESSAGE_TYPES.ROLL, roll: this.rollUtil.mergeRolls(allRolls)});

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

    registerDiceSoNiceColors(dice3d: Dice3d) {
        dice3d.addColorset({name: 'arrowTest0', category: 'macro', background: '#004bb4', edge: '#02214e', foreground: '#ffefef' }, 'default')
        dice3d.addColorset({name: 'arrowTest1', category: 'macro', background: '#890101', edge: '#550000', foreground: '#ffb0b0' }, 'default')
        dice3d.addColorset({name: 'arrowTest2', category: 'macro', background: '#00783c', edge: '#004523', foreground: '#c1ffeb' }, 'default')
        dice3d.addColorset({name: 'arrowTest3', category: 'macro', background: '#bd9f25', edge: '#5f5b12', foreground: '#3b361c' }, 'default')

        dice3d.addColorset({name: 'arrowDamage0', category: 'macro', background: '#7c00ff', edge: '#4c0096', foreground: '#ffefef' }, 'default')
        dice3d.addColorset({name: 'arrowDamage1', category: 'macro', background: '#a15c00', edge: '#a64c00', foreground: '#ffb0b0' }, 'default')
        dice3d.addColorset({name: 'arrowDamage2', category: 'macro', background: '#008c7a', edge: '#008142', foreground: '#c1ffeb' }, 'default')
        dice3d.addColorset({name: 'arrowDamage3', category: 'macro', background: '#79a900', edge: '#526401', foreground: '#3b361c' }, 'default')
    }
}

