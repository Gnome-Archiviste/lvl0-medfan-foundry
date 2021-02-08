import {LevelingCharacterDataComputer} from "./actor-data-computers/character/leveling-character-data-computer.js";
import {SkillsCharacterDataComputer} from "./actor-data-computers/character/skills-character-data-computer.js";
import {StatsCharacterDataComputer} from "./actor-data-computers/character/stats-character-data-computer.js";

const actorDataComputers = [
    new LevelingCharacterDataComputer(),
    new SkillsCharacterDataComputer(),
    new StatsCharacterDataComputer()
];

export class Lvl0Actor extends Actor {
    prepareData() {
        super.prepareData();

        const actorData = this.data;

        for (let actorDataComputer of actorDataComputers) {
            if (actorDataComputer.isAvailableFor(actorData.type)) {
                actorDataComputer.compute(actorData.data);
            }
        }
    }
}