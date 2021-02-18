import {CharacterDataComputer} from "./character-data-computer.js";
import races from "../../../data/races.js";

export class BaseCharacterDataComputer extends CharacterDataComputer {
    static racesByIds = {};

    /**
     * @override
     */
    compute(actorData, actor) {
        actorData.computedData.bases.race = BaseCharacterDataComputer.racesByIds[actor.data.data.race.id];
    }
}

BaseCharacterDataComputer.racesByIds = {};
for (let raceCategory of Object.values(races)) {
    for (let [raceId, race] of Object.entries(raceCategory)) {
        BaseCharacterDataComputer.racesByIds[raceId] = race;
    }
}
