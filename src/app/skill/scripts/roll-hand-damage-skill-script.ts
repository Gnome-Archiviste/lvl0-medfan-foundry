import {SkillScript} from "./skill-script";
import {Lvl0ItemHandWeapon} from '../../data-accessor/models/lvl0-item';
import {IRoll} from '../../shared/roll';
import {RollFactory} from '../../shared/roll-factory';
import {SkillRollChatExtraDataMessageData} from "app/chat/skill-roll-chat-message.component";
import {SkillRollOutcome} from '../skill-roll-util';
import {firstValueFrom} from 'rxjs';
import {selectCharacterItemsOfType} from '../../data-accessor/selectors/character-selectors';
import {CharacterAccessorService} from '../../data-accessor/character-accessor.service';
import {selectCharacterBasicStats} from '../../data-accessor/selectors/character-basic-stats-selector';
import {selectCharacterEffects} from '../../data-accessor/selectors/character-effects-selector';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';

export type RollHandDamageSkillResult = {
    damageRollFormula: string;
    damageRoll?: IRoll;
    damageElement?: string;
    weapon?: RollHandDamageSkillItemInfoResult;
}

export type RollHandDamageSkillItemInfoResult = {
    name: string;
    icon?: string;
    damageRollFormula: string;
    element?: string;
};

export class RollHandDamageSkillScript extends SkillScript<RollHandDamageSkillResult> {
    actorId: string;
    handWeapon?: Lvl0ItemHandWeapon;

    constructor(
        private readonly rollFactory: RollFactory,
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
    ) {
        super();
    }

    override async prepare(actorId: string): Promise<number> {
        this.actorId = actorId;

        let handWeapons = await firstValueFrom(this.characterAccessorService.selectCharacter(actorId).pipe(selectCharacterItemsOfType<Lvl0ItemHandWeapon>('handWeapon')), {defaultValue: [] as Lvl0ItemHandWeapon[]});
        let equipedHandWeapons = handWeapons.filter(x => x.system.equiped);
        if (equipedHandWeapons.length === 0) {
            return 1;
        }

        this.handWeapon = equipedHandWeapons[0];
        return 1;
    }

    async postRoll(rollResult: SkillRollOutcome): Promise<RollHandDamageSkillResult> {
        let actorBasicStatValues = await firstValueFrom(this.characterAccessorService.selectCharacter(this.actorId).pipe(selectCharacterBasicStats()));
        let baseDamageRollFormula = Math.ceil(actorBasicStatValues.phy / 2).toString();
        if (this.handWeapon) {
            baseDamageRollFormula = this.handWeapon.system.damage.replace('phy', actorBasicStatValues.phy.toString())
        }

        let characterEffects = await firstValueFrom(this.characterAccessorService.selectCharacter(this.actorId).pipe(selectCharacterEffects(this.systemDataDatabaseService)));
        let damageBonus = 0;
        for (let characterEffect of characterEffects) {
            for (let modifier of characterEffect.modifiers) {
                if (modifier.stat === 'damage')
                    damageBonus += +modifier.value;
            }
        }
        let damageRollFormula = baseDamageRollFormula;
        if (damageBonus) {
            damageRollFormula += `+${damageBonus}`;
        }

        if (rollResult === 'success' || rollResult === 'criticalSuccess') {
            let damageRoll = await this.rollFactory.createRoll(damageRollFormula);
            return {
                damageRollFormula: damageRollFormula,
                damageRoll: damageRoll,
                weapon: this.handWeapon ? {
                    name: this.handWeapon.name,
                    icon: this.handWeapon.img,
                    damageRollFormula: damageRollFormula,
                } : undefined
            }
        }

        return {
            damageRollFormula: damageRollFormula,
            weapon: this.handWeapon ? {
                name: this.handWeapon.name,
                icon: this.handWeapon.img,
                damageRollFormula: damageRollFormula,
            } : undefined
        }
    }

    postRolls(skillRollOutcomes: SkillRollOutcome[]): Promise<RollHandDamageSkillResult[]> {
        throw new Error("Not supported.");
    }

    getRolls(data: RollHandDamageSkillResult): IRoll[] {
        let rolls: IRoll[] = [];

        if (data.damageRoll)
            rolls.push(data.damageRoll)

        return rolls;
    }

    getChatData(data: RollHandDamageSkillResult): SkillRollChatExtraDataMessageData {
        return {
            kind: 'hand-damage',
            data: {
                damageRollFormula: data.damageRollFormula,
                weapon: data.weapon,
                damageRoll: data.damageRoll ? this.rollFactory.convertToRollChat(data.damageRoll) : undefined
            }
        }
    }

}
