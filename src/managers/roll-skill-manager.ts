import {SkillScriptFactory} from "./skill-scripts/skill-script-factory.js";
import {SkillRepository} from '../repositories/skill-repository';
import {Lvl0ActorCharacterData} from '../models/actor/properties-data/lvl0-actor-character-data';
import {assertIsCharacter} from '../models/actor/properties/character-properties';

export class RollSkillManager {

    static getSkillSuccessValue(actorData: Lvl0ActorCharacterData, skillId: string): number {
        let [skillCategory, skillName] = SkillRepository.splitSkill(skillId);
        let skillDefinition = SkillRepository.getSkill(skillCategory, skillName);
        let stat = skillDefinition.stat;

        let skillValue = actorData.skills[skillCategory]?.[skillName]?.value || 0;
        let actorStatValue = actorData.computedData.stats.baseStats[stat].value || 0;
        let extraSkillPoint = actorData.computedData.skills.extraSkills.indexOf(skillId) !== -1;
        let skillModifier = (skillId in actorData.computedData.skills.skillModifiers)
            ? actorData.computedData.skills.skillModifiers[skillId]
            : 0;

        return +skillValue + +actorStatValue + (extraSkillPoint ? 1 : 0) + skillModifier;
    }

    static async rollSkill(token: Token, skillId: string, options = {}): Promise<boolean> {
        if (!token) {
            ui.notifications?.error('Sélectionnez un token avant de faire cette action');
            return false;
        }

        let skillDefinition = SkillRepository.getSkillFromId(skillId);
        let skillScript = new SkillScriptFactory().createScript(token, skillDefinition, options);

        if (!await skillScript.prepare())
            return false;

        let actor = token.actor;
        assertIsCharacter(actor);

        let minSuccessValue = RollSkillManager.getSkillSuccessValue(actor.data.data, skillId);
        let roll = new Roll('2d6');
        await roll.roll({async: true});
        let result = +roll.result;
        let success = result !== 12 && (result === 2 || result <= minSuccessValue);

        await skillScript.postRoll(roll, result, minSuccessValue, success);

        return success;
    }
}
