import {CharacterDataComputer} from "./character-data-computer";
import {Lvl0Actor} from '../../lvl0-actor';
import {Lvl0ActorCharacterData} from '../../properties-data/lvl0-actor-character-data';

export class LevelingCharacterDataComputer extends CharacterDataComputer {
    override computeCharacter(actorData: Lvl0ActorCharacterData, actor: Lvl0Actor) {
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
