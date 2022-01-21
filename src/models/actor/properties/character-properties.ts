import {Lvl0ActorCharacterData} from '../properties-data/lvl0-actor-character-data';
import {Lvl0ActorType} from '../lvl0-actor-data';
import {Lvl0Actor} from '../lvl0-actor';
import {Lvl0ActorCharacter} from '../lvl0-actor-types';

export interface CharacterProperties {
    type: 'character';
    data: Lvl0ActorCharacterData
}

export function assertIsCharacter(actor?: Lvl0Actor | null): asserts actor is Lvl0ActorCharacter {
    if (!actor) {
        ui.notifications?.error('An error occurred: see console for more detail [F12]')
        throw new Error('Actor is not defined');
    }
    if (actor.data.type !== 'character') {
        ui.notifications?.error('An error occurred: see console for more detail [F12]')
        throw new Error('Not supported for actor of type: ' + this.actor.data.type);
    }
}
