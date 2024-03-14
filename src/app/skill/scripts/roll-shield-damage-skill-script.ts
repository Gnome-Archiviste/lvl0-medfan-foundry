import {SkillScript} from "./skill-script";
import {RollFactory} from '../../shared/roll-factory';
import {CharacterAccessorService} from '../../data-accessor/character-accessor.service';
import {firstValueFrom} from 'rxjs';
import {selectCharacterItemsOfType} from '../../data-accessor/selectors/character-selectors';
import {Lvl0ItemShield} from '../../data-accessor/models/lvl0-item';
import {PlayerNotificationService} from '../../shared/player-notification.service';
import {IRoll} from '../../shared/roll';
import {selectCharacterBasicStats} from '../../data-accessor/selectors/character-basic-stats-selector';
import {selectCharacterEffects} from '../../data-accessor/selectors/character-effects-selector';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {SkillRollChatExtraDataMessageData} from "app/chat/skill-roll-chat-message.component";
import {SkillRollOutcome} from '../skill-roll-util';

export type RollShieldDamageScriptResult = {
    damageRoll?: IRoll
    damageRollFormula: string;
    shield: {
        name: string;
        icon?: string;
        damageRollFormula: string;
    }
}

export class RollShieldDamageSkillScript extends SkillScript<RollShieldDamageScriptResult> {
    shield?: Lvl0ItemShield;
    actorId: string;

    constructor(
        private readonly rollFactory: RollFactory,
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly playerNotificationService: PlayerNotificationService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
    ) {
        super()
    }

    override async prepare(actorId: string) {
        let shields = await firstValueFrom(this.characterAccessorService.selectCharacter(actorId).pipe(selectCharacterItemsOfType<Lvl0ItemShield>('shield')), {defaultValue: [] as Lvl0ItemShield[]});
        let equipedShields = shields.filter(x => x.system.equiped);
        if (equipedShields.length === 0) {
            this.playerNotificationService.showWarning('no_shield_equiped')
            return false;
        }
        let shield = equipedShields[0];
        if (!shield.system.damage) {
            this.playerNotificationService.showWarning('no_shield_damage')
            ui.notifications?.error("Aucun dégâts configuré sur ce bouclier", {permanent: true});
            return false;
        }
        this.shield = shield;
        this.actorId = actorId;

        return true;
    }

    override async postRoll(rollResult: SkillRollOutcome): Promise<RollShieldDamageScriptResult> {
        if (!this.shield)
            throw new Error('Missing shield during postRoll');

        let actorBasicStatValues = await firstValueFrom(this.characterAccessorService.selectCharacter(this.actorId).pipe(selectCharacterBasicStats()));
        let shieldDamageRollFormula = this.shield.system.damage.replace('phy', actorBasicStatValues.phy.toString());

        let characterEffects = await firstValueFrom(this.characterAccessorService.selectCharacter(this.actorId).pipe(selectCharacterEffects(this.systemDataDatabaseService)));
        let damageBonus = 0;
        for (let characterEffect of characterEffects) {
            for (let modifier of characterEffect.modifiers) {
                if (modifier.stat === 'damage')
                    damageBonus += +modifier.value;
            }
        }
        let damageRollFormula = shieldDamageRollFormula;
        if (damageBonus) {
            damageRollFormula += `+${damageBonus}`;
        }

        if (rollResult === 'success' || rollResult === 'criticalSuccess') {
            let damageRoll = await this.rollFactory.createRoll(damageRollFormula);
            return {
                damageRollFormula: damageRollFormula,
                damageRoll: damageRoll,
                shield: {
                    name: this.shield.name,
                    icon: this.shield.img,
                    damageRollFormula: shieldDamageRollFormula,
                }
            }
        }

        return {
            damageRollFormula: damageRollFormula,
            shield: {
                name: this.shield.name,
                icon: this.shield.img,
                damageRollFormula: damageRollFormula,
            }
        }
    }

    getRolls(data: RollShieldDamageScriptResult): IRoll[] {
        let rolls: IRoll[] = [];

        if (data.damageRoll)
            rolls.push(data.damageRoll)

        return rolls;
    }

    getChatData(data: RollShieldDamageScriptResult): SkillRollChatExtraDataMessageData {
        return {
            kind: 'shield-damage',
            data: {
                ...data,
                damageRoll: data.damageRoll ? this.rollFactory.convertToRollChat(data.damageRoll) : undefined
            }
        }
    }
}
