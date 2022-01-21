import {Lvl0ActorCharacterData} from '../properties-data/lvl0-actor-character-data';
import {Lvl0ActorType} from '../lvl0-actor-data';

export interface CharacterProperties {
    type: 'character';
    data: Lvl0ActorCharacterData
}

export function assertIsCharacter(type: Lvl0ActorType): asserts type is 'character' {
    if (type !== 'character') {
        ui.notifications?.error('An error occurred: see console for more detail [F12]')
        throw new Error('Not supported for actor of type: ' + this.actor.data.type);
    }
}
