import {SkillScript} from "./skill-script";
import {RollDamageSkillScriptData} from 'repositories/data/skills';
import {Lvl0ItemAmmunition, Lvl0ItemWeapon} from '../../data-accessor/models/lvl0-item';
import {WeaponSelectorService} from '../../item/weapon-selector.service';
import {WeaponDamageRollUtil} from '../../item/weapon-damage-roll-util.service';
import {IRoll} from '../../shared/roll';
import {ItemUpdaterService} from '../../data-accessor/item-updater.service';
import {RollFactory} from '../../shared/roll-factory';
import {SkillRollChatExtraDataMessageData} from "app/chat/skill-roll-chat-message.component";
import {SkillRollOutcome} from '../skill-roll-util';
import {RollShieldDamageScriptResult} from './roll-shield-damage-skill-script';

export type RollDamageSkillResult = {
    damageRollFormula: string;
    damageRoll?: IRoll;
    damageElement?: string;
    weapon: RollDamageSkillItemInfoResult;
    ammunition?: RollDamageSkillItemInfoResult;
}

export type RollDamageSkillItemInfoResult = {
    name: string;
    icon?: string;
    damageRollFormula: string;
    element?: string;
};

export class RollDamageSkillScript extends SkillScript<RollDamageSkillResult> {
    ammunition?: Lvl0ItemAmmunition;
    weapon?: Lvl0ItemWeapon;

    constructor(
        private readonly data: RollDamageSkillScriptData,
        private readonly rollFactory: RollFactory,
        private readonly weaponSelectorService: WeaponSelectorService,
        private readonly weaponDamageRollUtil: WeaponDamageRollUtil,
        private readonly itemUpdaterService: ItemUpdaterService
    ) {
        super();
    }

    override async prepare(actorId: string): Promise<number> {
        let weaponSelectionResult = await this.weaponSelectorService.selectWeapon(actorId, this.data.weaponType)
        if (!weaponSelectionResult) {
            return 0;
        }

        if (!weaponSelectionResult.selectedWeapon) {
            return 0;
        }
        let weapon = weaponSelectionResult.selectedWeapon;
        let ammunition = weaponSelectionResult.selectedAmmo;

        this.weapon = weapon;
        this.ammunition = ammunition;
        return 1;
    }

    async postRoll(rollResult: SkillRollOutcome): Promise<RollDamageSkillResult> {
        if (!this.weapon)
            throw new Error('weapon is not set');


        if (this.ammunition) {
            if (this.ammunition.system.quantity <= 0) {
                ui.notifications?.warn(`Vous n'avez plus assez de ${this.ammunition.name}.`)
                this.ammunition = undefined;
            } else {
                await this.itemUpdaterService.changeQuantity(this.ammunition, -1);
            }
        }

        let [weaponRollFormula, ammunitionRollFormula] = this.weaponDamageRollUtil.getWeaponAndAmmunitionDamageRolls(
            this.data.weaponType,
            this.weapon,
            this.ammunition
        );

        let ammunitionElement: string | undefined;
        let weaponElement = this.weapon.system.element;
        let damageElement = weaponElement;
        let damageRollFormula = weaponRollFormula;
        if (this.ammunition) {
            ammunitionElement = this.ammunition.system.extraDamageEffect;
            damageElement = ammunitionElement || weaponElement;
            damageRollFormula = '(' + damageRollFormula + '+' + this.ammunition.system.extraDamage.split(' ').join() + ')'
        }

        if (this.data.charge) {
            weaponRollFormula = '(' + weaponRollFormula + ')*2'
        }

        let weaponInfo = {
            name: this.weapon.name,
            icon: this.weapon.img,
            damageRollFormula: weaponRollFormula,
            element: weaponElement
        };

        let ammunitionInfo: RollDamageSkillItemInfoResult | undefined = undefined;
        if (this.ammunition) {
            ammunitionInfo = {
                name: this.ammunition.name,
                icon: this.ammunition.img,
                damageRollFormula: ammunitionRollFormula!,
                element: ammunitionElement
            };
        }

        if (rollResult === 'epicFail' || rollResult === 'fail') {
            return {
                damageRollFormula: damageRollFormula,
                ammunition: ammunitionInfo,
                weapon: weaponInfo
            }
        }

        let damageRoll = await this.rollFactory.createRoll(damageRollFormula);

        return {
            damageRoll: damageRoll,
            damageRollFormula: damageRollFormula,
            damageElement: damageElement,
            ammunition: ammunitionInfo,
            weapon: weaponInfo
        }
    }

    postRolls(skillRollOutcomes: SkillRollOutcome[]): Promise<RollDamageSkillResult[]> {
        throw new Error("Not supported.");
    }

    getRolls(data: RollDamageSkillResult): IRoll[] {
        let rolls: IRoll[] = [];

        if (data.damageRoll)
            rolls.push(data.damageRoll)

        return rolls;
    }

    getChatData(data: RollDamageSkillResult): SkillRollChatExtraDataMessageData {
        return {
            kind: 'damage',
            data: {
                ...data,
                damageRoll: data.damageRoll ? this.rollFactory.convertToRollChat(data.damageRoll) : undefined
            }
        }
    }

}
