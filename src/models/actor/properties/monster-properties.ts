import {Lvl0ActorMonsterData} from '../properties-data';
import {Lvl0FoundryActor} from '../lvl0-foundry-actor';
import {Lvl0ActorMonster} from '../lvl0-actor-types';

export interface MonsterProperties {
    type: 'monster';
    data: Lvl0ActorMonsterData
}


export function assertIsMonster(actor?: Lvl0FoundryActor | null): asserts actor is Lvl0ActorMonster {
    if (!actor) {
        throw new Error('Actor is not defined');
    }
    if (actor.data.type !== 'monster') {
        throw new Error('Not supported for actor of type: ' + this.actor.data.type);
    }
}
