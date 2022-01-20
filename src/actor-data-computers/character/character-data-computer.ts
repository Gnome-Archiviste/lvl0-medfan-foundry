import {ActorDataComputer} from "../actor-data-computer.js";
import {Lvl0CharacterData} from '../../models/character/character';

export class CharacterDataComputer extends ActorDataComputer {
    /**
     * @override
     */
    isAvailableFor(actorType) {
        return actorType === 'character';
    }

    compute(actorData: Lvl0CharacterData, actor: Actor): void {
        throw new Error('Not implemented');
    }
}
