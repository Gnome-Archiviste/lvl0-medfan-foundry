import {ActorDataComputer} from "../actor-data-computer.js";

export class CharacterDataComputer extends ActorDataComputer {
    /**
     * @override
     */
    isAvailableFor(actorType) {
        return actorType === 'character';
    }

    /**
     * @override
     * @param {Lvl0CharacterData} actorData
     * @return {void}
     */
    compute(actorData) {
        throw new Error('Not implemented');
    }
}
