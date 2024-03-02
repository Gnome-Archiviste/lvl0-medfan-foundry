import {Injectable} from '@angular/core';
import {WeaponDamageRollUtil} from '../item/weapon-damage-roll-util.service';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {selectCharacterActiveSkillValue} from '../data-accessor/selectors/character-active-skill-value-selector';
import {combineLatest, take} from 'rxjs';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {RollFactory} from '../shared/roll-factory';
import {SavedRoll} from '../shared/roll';
import {SkillRollUtil} from '../skill/skill-roll-util';
import {WeaponSelectorService} from '../item/weapon-selector.service';
import {selectCharacterEffects} from '../data-accessor/selectors/character-effects-selector';

type ArrowResult = {
    result: 'fail' | 'epicFail';
    testRoll: SavedRoll;
    arrowNumber: number;
} | {
    result: 'success' | 'criticalSuccess';
    testRoll: SavedRoll;
    arrowNumber: number;
    damageRollFormula: string;
    damage: number;
    element: string;
    damageRoll: SavedRoll;
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
                availableAmmunitionQuantity = ammunition.data.quantity;
                ammunitionElement = ammunition.data.extraDamageEffect;
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
                    let testRoll = await this.rollFactory.createSavedRoll(`2d6`);
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

                    let weaponElement = weapon.data.element;
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

                    let damageRoll = await this.rollFactory.createSavedRoll(damageRollFormula);
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
                                extraDamage: ammunition!.data.extraDamage
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
}

/*
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
        })*/
