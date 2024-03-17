import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {Injectable} from '@angular/core';
import {Lvl0Actor} from '../data-accessor/models/lvl0-actor';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';
import {FoundryToLvl0Mapper} from './foundry-to-lvl0-mapper';

@Injectable()
export class FoundryActorUpdaterService extends ActorUpdaterService {
    constructor(
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver,
        private readonly foundryToLvl0Mapper: FoundryToLvl0Mapper
    ) {
        super();
    }
    async updateActor(actorId: string, diffObject: Partial<Lvl0Actor>) {

        let foundryActor = this.foundryLvl0IdResolver.getActorFromLvl0Id(actorId);
        if (!foundryActor) {
            throw new Error('Foundry actor not found: ' + actorId);
        }
        await foundryActor.update(diffObject, {diff: true});
    }

    async updateActorFromCurrent(actorId: string, updater: (actor: Lvl0Actor) => RecursivePartial<Lvl0Actor>) {
        let foundryActor = this.foundryLvl0IdResolver.getActorFromLvl0Id(actorId);
        if (!foundryActor) {
            throw new Error('Foundry actor not found: ' + actorId);
        }
        await foundryActor.update(updater(this.foundryToLvl0Mapper.createLvl0CharacterFromFoundryActor(foundryActor)), {diff: true});
    }
}
