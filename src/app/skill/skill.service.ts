import {Injectable} from '@angular/core';
import {SkillRepository} from '../../repositories';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {RollFactory} from '../shared/roll-factory';
import {take} from 'rxjs';
import {ChatService} from '../shared/chat.service';
import {SkillRollResultData} from './skill-roll-result.component';
import {selectCharacterActiveSkillValue} from '../data-accessor/selectors/character-active-skill-value-selector';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {FoundryLvl0IdResolver} from '../foundry/foundry-lvl0-id-resolver';
import {RollSkillManager} from '../../managers/skill';
import {MacroService} from '../shared/macro.service';

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
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver,
        private readonly macroService: MacroService,
    ) {
    }

    rollSkill(actorId: string, skillId: string) {
        let [categoryId, id] = skillId.split('.');

        // TOD: Might rework later

        let activeToken = this.foundryLvl0IdResolver.getActorFromLvl0Id(actorId)?.getActiveTokens()[0];
        (window['rollSkillManager'] as RollSkillManager).rollSkill(activeToken, skillId)
      /*  this.characterAccessorService.selectCharacter(actorId)
            .pipe(selectCharacterActiveSkillValue(categoryId, id, this.systemDataDatabaseService), take(1))
            .subscribe(async activeSkillValue => {
                let skillDefinition = this.skillRepository.getSkill(categoryId, id);
                let skillRoll = await this.rollFactory.createRoll('2d6');
                this.chatService.addCustomElementMessage(
                    actorId,
                    'lvl0-skill-roll-result',
                    {
                        ['raw-data']: JSON.stringify(<SkillRollResultData>{
                            actorId: actorId,
                            skillId: skillId,
                            rollValue: skillRoll.total,
                            activeSkillValue: activeSkillValue,
                        })
                    },
                    skillRoll
                ).then();
            })*/

    }

    createSkillMacro(skillId: string) {
        let skillDefinition = this.skillRepository.getSkillFromId(skillId);
        this.macroService.createRollSkillMacro(skillDefinition);
    }
}
