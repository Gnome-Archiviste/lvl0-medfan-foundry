import {Lvl0FoundryActor} from '../lvl0-foundry-actor';
import {Lvl0ActorType} from '../lvl0-actor-data';

export interface ActorDataComputer {
    isAvailableFor(actorType: Lvl0ActorType): boolean;
    compute(actor: Lvl0FoundryActor): void;
}
