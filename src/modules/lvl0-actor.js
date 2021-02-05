import {LevelingCharacterDataComputer} from "./actor-data-computers/character/leveling-character-data-computer.js";

const actorDataComputers = [
    new LevelingCharacterDataComputer()
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
