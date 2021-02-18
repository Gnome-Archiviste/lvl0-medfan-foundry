import {LevelingCharacterDataComputer} from "./actor-data-computers/character/leveling-character-data-computer.js";
import {SkillsCharacterDataComputer} from "./actor-data-computers/character/skills-character-data-computer.js";
import {StatsCharacterDataComputer} from "./actor-data-computers/character/stats-character-data-computer.js";
import {BaseCharacterDataComputer} from "./actor-data-computers/character/base-character-data-computer.js";
import {MagicCharacterDataComputer} from "./actor-data-computers/character/magic-character-data-computer.js";

const actorDataComputers = [
    new BaseCharacterDataComputer(),
    new LevelingCharacterDataComputer(),
    new SkillsCharacterDataComputer(),
    new StatsCharacterDataComputer(),
    new MagicCharacterDataComputer(),
];

export class Lvl0Actor extends Actor {
    prepareData() {
        super.prepareData();

        const actorData = this.data;

        for (let actorDataComputer of actorDataComputers) {
            if (actorDataComputer.isAvailableFor(actorData.type)) {
                actorDataComputer.compute(actorData.data, this);
            }
        }
    }
}
