import {Lvl0Actor} from './lvl0-actor';

export type Lvl0ActorCharacter = Lvl0Actor & { data: { type: 'character' } }
export type Lvl0ActorMonster = Lvl0Actor & { data: { type: 'monster' } }
