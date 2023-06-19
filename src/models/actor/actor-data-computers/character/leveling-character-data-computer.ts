import {singleton} from 'tsyringe';
import {CharacterDataComputer} from "./character-data-computer";
import {Lvl0FoundryActor} from '../../lvl0-foundry-actor';
import {Lvl0CharacterData} from '../../../../app/data-accessor/models/lvl0-character';

@singleton()
export class LevelingCharacterDataComputer extends CharacterDataComputer {
    override computeCharacter(actorData: Lvl0CharacterData, actor: Lvl0FoundryActor) {
        if (actorData.level.value < 4)
            actorData.computedData.leveling.maximumSkillLevel = 2;
        else
            actorData.computedData.leveling.maximumSkillLevel = 3;

        if (actorData.level.value < 15) {
            actorData.computedData.leveling.canUseMaster = true;
            actorData.computedData.leveling.canUseProdigy = false;
        } else if (actorData.level.value < 25) {
            actorData.computedData.leveling.canUseMaster = true;
            actorData.computedData.leveling.canUseProdigy = false;
        } else {
            actorData.computedData.leveling.canUseMaster = true;
            actorData.computedData.leveling.canUseProdigy = true;
        }


        if (actorData.level.value < 1)
            actorData.computedData.leveling.nextLevelExperience = 0;
        else if (actorData.level.value < 25)
            actorData.computedData.leveling.nextLevelExperience = 10;
        else if (actorData.level.value < 50)
            actorData.computedData.leveling.nextLevelExperience = 15;
        else
            actorData.computedData.leveling.nextLevelExperience = 20;

    }
}
