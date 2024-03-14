import {Lvl0FoundryActor} from '../lvl0-foundry-actor';
import {Lvl0ActorCharacter} from '../lvl0-actor-types';
import {Lvl0CharacterData} from '../../../app/data-accessor/models/lvl0-character';

export interface CharacterProperties {
    type: 'character';
    data: Lvl0CharacterData
}

export function assertIsCharacter(actor?: Lvl0FoundryActor | null): asserts actor is Lvl0ActorCharacter {
    if (!actor) {
        throw new Error('Actor is not defined');
    }
    if (actor.type !== 'character') {
        throw new Error('Not supported for actor of type: ' + this.actor.type);
    }
}
