import {Lvl0ActorMonsterData} from '../properties-data/lvl0-actor-monster-data';
import {Lvl0Actor} from '../lvl0-actor';
import {Lvl0ActorMonster} from '../lvl0-actor-types';

export interface MonsterProperties {
    type: 'monster';
    data: Lvl0ActorMonsterData
}


export function assertIsMonster(actor?: Lvl0Actor | null): asserts actor is Lvl0ActorMonster {
    if (!actor) {
        ui.notifications?.error('An error occurred: see console for more detail [F12]')
        throw new Error('Actor is not defined');
    }
    if (actor.data.type !== 'monster') {
        ui.notifications?.error('An error occurred: see console for more detail [F12]')
        throw new Error('Not supported for actor of type: ' + this.actor.data.type);
    }
}
