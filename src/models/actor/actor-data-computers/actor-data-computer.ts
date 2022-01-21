import {Lvl0Actor} from '../lvl0-actor';
import {Lvl0ActorType} from '../lvl0-actor-data';

export interface ActorDataComputer {
    isAvailableFor(actorType: Lvl0ActorType): boolean;
    compute(actor: Lvl0Actor): void;
}
