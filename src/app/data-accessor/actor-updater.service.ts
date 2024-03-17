import {Lvl0Actor} from './models/lvl0-actor';

export abstract class ActorUpdaterService {
    abstract updateActor(actorId: string, diffObject: RecursivePartial<Lvl0Actor>): Promise<void>;

    abstract updateActorFromCurrent(actorId: string, updater: (actor: Lvl0Actor) => RecursivePartial<Lvl0Actor>): Promise<void>;
}
