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
     * @param {Actor} actor
     * @return {void}
     */
    compute(actorData, actor) {
        throw new Error('Not implemented');
    }
}
