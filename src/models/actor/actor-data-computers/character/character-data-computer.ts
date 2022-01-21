import {ActorDataComputer} from "../actor-data-computer.js";
import {Lvl0Actor} from '../../lvl0-actor';
import {Lvl0ActorType} from '../../lvl0-actor-data';
import {Lvl0ActorCharacterData} from '../../properties-data/lvl0-actor-character-data';

export abstract class CharacterDataComputer implements ActorDataComputer {
    isAvailableFor(actorType: Lvl0ActorType): boolean {
        return actorType === 'character';
    }

    compute(actor: Lvl0Actor): void {
        if (actor.data.type !== 'character')
            throw new Error(`${actor.data.type} is expected`);
        this.computeCharacter(actor.data.data, actor);
    }

    abstract computeCharacter(actorData: Lvl0ActorCharacterData, actor: Lvl0Actor): void;
}
