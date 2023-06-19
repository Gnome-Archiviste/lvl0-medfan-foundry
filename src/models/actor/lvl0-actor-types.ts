import {Lvl0FoundryActor} from './lvl0-foundry-actor';

export type Lvl0ActorCharacter = Lvl0FoundryActor & { data: { type: 'character' } }
export type Lvl0ActorMonster = Lvl0FoundryActor & { data: { type: 'monster' } }
