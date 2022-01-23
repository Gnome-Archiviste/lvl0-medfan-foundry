import {SkillScript, SkillTestRollResult} from "./skill-script";
import {WeaponSelector} from "../../../utils/weapon-selector";
import {WeaponDamageRollUtil} from "../../../utils/weapon-damage-roll-util";
import {EffectManager} from "../../effects/effect-manager";
import {RollUtil} from '../../../utils/roll-util';
import {ElementRepository} from '../../../repositories/element-repository';
import {
    RollDamageSkillScriptData,
    RollDamageSkillScriptDefinition,
    SkillDefinition
} from '../../../repositories/data/skills';
import {Lvl0ItemAmmunition, Lvl0ItemWeapon} from '../../../models/item/lvl0-item-types';
import {foundryAssert} from '../../../utils/error';
import {Evaluated, RollFactory} from '../../../utils/roll-factory';

export class RollDamageSkillScript extends SkillScript {
    data: RollDamageSkillScriptData;
    ammunition?: Lvl0ItemAmmunition;
    weapon?: Lvl0ItemWeapon;

    constructor(
        token: Token,
        skillDefinition: SkillDefinition & { script: RollDamageSkillScriptDefinition },
        rollUtil: RollUtil,
        private readonly rollFactory: RollFactory,
        private readonly weaponDamageRollUtil: WeaponDamageRollUtil,
        private readonly weaponSelector: WeaponSelector,
        private readonly effectManager: EffectManager,
        private readonly elementRepository: ElementRepository,
    ) {
        super(token, skillDefinition, rollUtil);
        this.data = skillDefinition.script.data;
    }

    override async prepare() {
        let [weapon, ammunition] = await this.weaponSelector.selectWeapon(this.token, this.data.weaponType);
        this.weapon = weapon;
        this.ammunition = ammunition;
        return !!weapon;
    }

    async postRoll(testRoll: SkillTestRollResult): Promise<void> {
        foundryAssert(this.weapon, 'weapon should not be null in RollDamageSkillScript.postRoll');

        let useAmmunition = false;
        if (this.ammunition) {
            if (this.ammunition.data.data.quantity <= 0) {
                ui.notifications?.warn(`Vous n'avez plus assez de ${this.ammunition.name}.`)
                this.ammunition = undefined;
            } else {
                useAmmunition = true;
                // FIXME: Create an helper for this
                await this.ammunition.update({
                    data: {
                        quantity: Math.max(0, this.ammunition.data.data.quantity - 1)
                    }
                }, {diff: true});
            }
        }

        let [weaponRollFormula, ammunitionRollFormula] = this.weaponDamageRollUtil.getWeaponAndAmmunitionDamageRolls(
            this.data.weaponType,
            this.weapon,
            this.ammunition
        );

        if (this.data.charge) {
            weaponRollFormula = '(' + weaponRollFormula + ')*2'
        }

        const messageData = testRoll.roll.toMessage({}, {create: false});
        let content: string;

        let damageRolls: Evaluated<Roll>[] = [];
        if (testRoll.result !== 'fail') {
            let weaponRoll = await this.rollFactory.createRoll(weaponRollFormula);
            weaponRoll.terms.forEach(t => t.options.flavor = 'black')
            damageRolls.push(weaponRoll);
            let weaponDamage = Math.max(weaponRoll.total!, 1);
            let ammunitionDamage = 0;
            let ammunitionRoll: Evaluated<Roll> | undefined = undefined;

            if (useAmmunition && ammunitionRollFormula) {
                ammunitionRoll = await this.rollFactory.createRoll(ammunitionRollFormula);
                ammunitionRoll.terms.forEach(t => t.options.flavor = 'white')
                damageRolls.push(ammunitionRoll);
                ammunitionDamage = ammunitionRoll.total!;
            }
            if (!this.token.actor)
                throw new Error(`No actor associated with token: ${this.token.name} (${this.token.id})`)

            let effectsWithBonusDamages = this.effectManager.getEffectsWithBonusDamage(this.token.actor);

            content = await this.buildChatMessage(
                testRoll,
                weaponRollFormula,
                ammunitionRollFormula,
                weaponDamage,
                ammunitionDamage,
                weaponRoll,
                ammunitionRoll,
                effectsWithBonusDamages
            );

        } else {
            content = await this.buildChatMessage(
                testRoll,
                weaponRollFormula,
                ammunitionRollFormula
            );
        }

        const speaker = ChatMessage.getSpeaker({token: this.token.document});
        await ChatMessage.create({
            ...messageData,
            speaker,
            content,
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            // FIXME: Remove stringify: https://github.com/League-of-Foundry-Developers/foundry-vtt-types/issues/1552
            roll: JSON.stringify(this.rollUtil.mergeRolls([testRoll.roll, ...damageRolls]).toJSON())
        });
    }


    async buildChatMessage(
        testRoll: SkillTestRollResult,
        weaponRollFormula: string,
        ammunitionRollFormula?: string,
        weaponDamage?: number,
        ammunitionDamage?: number,
        weaponRoll?: Evaluated<Roll>,
        ammunitionRoll?: Evaluated<Roll>,
        effectsWithBonusDamages?: { name: string, value: number }[]
    ) {
        foundryAssert(this.weapon, 'weapon should not be null in RollDamageSkillScript.buildChatMessage');

        let message = `<div class="skill-roll-damage">
            <div class="title">${this.skillDefinition.name}</div>
            <div class="test"><i class="fas fa-dice"></i> ${testRoll.total} / ${testRoll.successValue} (${this.rollUtil.getTestResultMessage(testRoll.result)})</div>
            <div class="roll">${await this.rollUtil.renderRollSmall(testRoll.roll)}</div>
        `;

        let weaponDamageText = weaponRollFormula;
        if (this.weapon.data.data.element) {
            weaponDamageText += ` (${this.elementRepository.getElementWeaponName(this.weapon.data.data.element)})`;
        }
        if (this.rollUtil.isSuccess(testRoll.result)) {
            weaponDamageText += ' = ' + weaponDamage;
        }
        message += `<div class="weapon item">
            <div class="name">${this.weapon.name}</div>
            <img class="img" src="${this.weapon.img}" />
            <div class="damage"><i class="fas fa-dice"></i> ${weaponDamageText}</div>`;
        if (weaponRoll) {
            message += `<div class="roll">${await this.rollUtil.renderRollSmall(weaponRoll)}</div>`;
        }
        message += `</div>`;

        if (this.ammunition) {
            let ammunitionDamageText = ammunitionRollFormula;
            if (this.ammunition.data.data.extraDamageEffect) {
                ammunitionDamageText += ` (${this.elementRepository.getElementWeaponName(this.ammunition.data.data.extraDamageEffect)})`;
            }
            if (this.rollUtil.isSuccess(testRoll.result)) {
                ammunitionDamageText += ' = ' + ammunitionDamage;
            }
            message += `<div class="ammunition item">
                <div class="name">${this.ammunition.name}</div>
                <img class="img" src="${this.ammunition.img}" />
                <div class="damage"><i class="fas fa-dice"></i> ${ammunitionDamageText}</div>`;

            if (ammunitionRoll) {
                message += `<div class="roll">${await this.rollUtil.renderRollSmall(ammunitionRoll)}</div>`;
            }
            message += '</div>';
        }

        if (effectsWithBonusDamages) {
            let bonusDamage = 0;
            for (let effectsWithBonusDamage of effectsWithBonusDamages) {
                message += `<div class="effect">${effectsWithBonusDamage.name}: ${effectsWithBonusDamage.value}</span></div>`;
                bonusDamage += effectsWithBonusDamage.value;
            }

            message += `<div class="result">Total: <span class="total">${(weaponDamage || 0) + (ammunitionDamage || 0) + bonusDamage}</span></div>`;
        }

        message += '</div>';

        return message;
    }
}
