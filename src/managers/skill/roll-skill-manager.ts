import {SkillScriptFactory} from "./skill-scripts";
import {SkillRepository} from '../../repositories';
import {assertIsCharacter} from '../../models/actor';
import {RollUtil} from '../../utils/roll-util';
import {inject, singleton} from 'tsyringe';
import {RollFactory} from '../../utils/roll-factory';
import {Lvl0CharacterData} from '../../app/data-accessor/models/lvl0-character';

@singleton()
export class RollSkillManager {
    constructor(
        @inject(RollUtil) private readonly rollUtil: RollUtil,
        @inject(SkillScriptFactory) private readonly skillScriptFactory: SkillScriptFactory,
        @inject(RollFactory) private readonly rollFactory: RollFactory,
        @inject(SkillRepository) private readonly skillRepository: SkillRepository,
    ) {
    }

    getSkillSuccessValue(actorData: Lvl0CharacterData, skillId: string): number {
        let [skillCategory, skillName] = this.skillRepository.splitSkill(skillId);
        let skillDefinition = this.skillRepository.getSkill(skillCategory, skillName);
        let stat = skillDefinition.stat;

        let skillValue = actorData.skills[skillCategory]?.[skillName]?.value || 0;
        let actorStatValue = actorData.computedData.stats.baseStats[stat].value || 0;
        let extraSkillPoint = actorData.computedData.skills.extraSkills.indexOf(skillId) !== -1;
        let skillModifier = (skillId in actorData.computedData.skills.skillModifiers)
            ? actorData.computedData.skills.skillModifiers[skillId]
            : 0;

        return +skillValue + +actorStatValue + (extraSkillPoint ? 1 : 0) + skillModifier;
    }

    async rollSkill(token: Token, skillId: string, options = {}): Promise<boolean> {
        if (!token) {
            ui.notifications?.error('Sélectionnez un token avant de faire cette action');
            return false;
        }

        let skillDefinition = this.skillRepository.getSkillFromId(skillId);
        let skillScript = this.skillScriptFactory.createScript(token, skillDefinition, options);

        if (!await skillScript.prepare())
            return false;

        let actor = token.actor;
        assertIsCharacter(actor);

        let minSuccessValue = this.getSkillSuccessValue(actor.data.data, skillId);
        let roll = await this.rollFactory.createRoll('2d6');
        let result = this.rollUtil.getRollResult(roll.total, minSuccessValue);

        await skillScript.postRoll({
            roll,
            total: roll.total,
            successValue: minSuccessValue,
            result: result
        });

        return this.rollUtil.isSuccess(result);
    }
}
