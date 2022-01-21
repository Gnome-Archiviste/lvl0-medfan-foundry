import {Lvl0ActorMonsterData} from '../properties-data/lvl0-actor-monster-data';
import {Lvl0ActorType} from '../lvl0-actor-data';

export interface MonsterProperties {
    type: 'monster';
    data: Lvl0ActorMonsterData
}

export function assertIsMonster(type: Lvl0ActorType): asserts type is 'monster' {
    if (type !== 'monster') {
        ui.notifications?.error('An error occurred: see console for more detail [F12]')
        throw new Error('Not supported for actor of type: ' + this.actor.data.type);
    }
}
