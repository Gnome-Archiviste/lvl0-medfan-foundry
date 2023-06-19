import {ActorDataComputer} from "../actor-data-computer";
import {Lvl0FoundryActor} from '../../lvl0-foundry-actor';
import {Lvl0ActorType} from '../../lvl0-actor-data';
import {Lvl0CharacterData} from '../../../../app/data-accessor/models/lvl0-character';

export abstract class CharacterDataComputer implements ActorDataComputer {
    isAvailableFor(actorType: Lvl0ActorType): boolean {
        return actorType === 'character';
    }

    compute(actor: Lvl0FoundryActor): void {
        if (actor.data.type !== 'character')
            throw new Error(`${actor.data.type} is expected`);
        this.computeCharacter(actor.data.data, actor);
    }

    abstract computeCharacter(actorData: Lvl0CharacterData, actor: Lvl0FoundryActor): void;
}
