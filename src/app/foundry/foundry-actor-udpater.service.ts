import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {Injectable} from '@angular/core';
import {Lvl0Actor} from '../data-accessor/models/lvl0-actor';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';

@Injectable()
export class FoundryActorUpdaterService extends ActorUpdaterService {
    constructor(
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver
    ) {
        super();
    }

    updateActor(actorId: string, diffObject: Partial<Lvl0Actor>) {
        let foundryActor = this.foundryLvl0IdResolver.getActorFromLvl0Id(actorId);
        if (!foundryActor) {
            throw new Error('Foundry actor not found: ' + actorId);
        }
        foundryActor.update(diffObject, {diff: true});
    }
}
