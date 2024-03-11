import {Injectable} from '@angular/core';
import {SkillRepository} from '../../repositories';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {RollFactory} from '../shared/roll-factory';
import {firstValueFrom} from 'rxjs';
import {ChatService} from '../chat/chat.service';
import {selectCharacterActiveSkillValue} from '../data-accessor/selectors/character-active-skill-value-selector';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {MacroService} from '../shared/macro.service';
import {SkillRollUtil} from './skill-roll-util';
import {SkillScriptFactory} from './scripts/skill-script-factory';
import {SkillRollChatExtraDataMessageData} from '../chat/skill-roll-chat-message.component';

@Injectable({
    providedIn: 'root'
})
export class SkillService {

    constructor(
        private readonly skillRepository: SkillRepository,
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly rollFactory: RollFactory,
        private readonly chatService: ChatService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly skillScriptFactory: SkillScriptFactory,
        private readonly macroService: MacroService,
        private readonly skillRollUtil: SkillRollUtil,
    ) {
    }

    async rollActorSkill(actorId: string, skillId: string, options: {} = {}): Promise<void> {
        let [categoryId, id] = skillId.split('.');

        let activeSkillValue = await firstValueFrom(this.characterAccessorService.selectCharacter(actorId)
            .pipe(selectCharacterActiveSkillValue(categoryId, id, this.systemDataDatabaseService)));

        let skillDefinition = this.skillRepository.getSkill(categoryId, id);
        let skillScript = this.skillScriptFactory.createScript(skillDefinition);
        if (skillScript) {
            if (!await skillScript.prepare(actorId, options))
                return;
        }

        let skillRoll = await this.rollFactory.createRoll('2d6');
        let rolls = [skillRoll];
        let skillRollOutcome = this.skillRollUtil.getRollResult(skillRoll, activeSkillValue);
        let extraData: SkillRollChatExtraDataMessageData | undefined = undefined;
        if (skillScript) {
            let scriptResult = await skillScript.postRoll(skillRollOutcome);
            extraData = skillScript.getChatData(scriptResult);
            rolls.push(...skillScript.getRolls(scriptResult));
        }

        await this.chatService.sendLvl0MessageFrom(
            actorId,
            {
                type: 'skill-roll',
                data: {
                    skillId: skillDefinition.skillId,
                    testRoll: this.rollFactory.convertToRollChat(skillRoll),
                    result: skillRollOutcome,
                    successValue: activeSkillValue.successValue,
                    extraData: extraData
                }
            },
            rolls
        )
    }

    createSkillMacro(skillId: string) {
        let skillDefinition = this.skillRepository.getSkillFromId(skillId);
        this.macroService.createRollSkillMacro(skillDefinition);
    }
}
