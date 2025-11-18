import {Lvl0FoundryActor} from '../lvl0-foundry-actor';

export function assertIsCharacter(actor?: Lvl0FoundryActor | null): asserts actor is Lvl0FoundryActor<"character"> {
    if (!actor) {
        throw new Error('Actor is not defined');
    }
    if (actor.type !== 'character') {
        throw new Error('Not supported for actor of type: ' + this.actor.type);
    }
}
