import {Lvl0Actor} from './models/lvl0-actor';

export abstract class ActorUpdaterService {
    abstract updateActor(actorId: string, diffObject: RecursivePartial<Lvl0Actor>);
}
