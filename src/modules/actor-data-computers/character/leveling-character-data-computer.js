import {CharacterDataComputer} from "./character-data-computer.js";

export class LevelingCharacterDataComputer extends CharacterDataComputer {
    /**
     * @override
     */
    compute(actorData, actor) {
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

        if (actorData.level.value < 25)
            actorData.computedData.leveling.nextLevelExperience = 10;
        else if (actorData.level.value < 50)
            actorData.computedData.leveling.nextLevelExperience = 15;
        else
            actorData.computedData.leveling.nextLevelExperience = 20;

    }
}
