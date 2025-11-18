import {Injectable} from '@angular/core';
import {Lvl0FoundryItem} from '../../models/item';
import {Lvl0FoundryActor} from '../../models/actor';

@Injectable({
    providedIn: 'root'
})
export class FoundryLvl0IdResolver {

    getActorFromLvl0Id(id: string): Lvl0FoundryActor | undefined | null {
        if (id.includes('@')) {
            let tokenId = id.substring(id.indexOf('@') + 1);
            return canvas?.tokens?.get(tokenId)?.actor;
        } else {
            return game.actors.get(id, {strict: true});
        }
    }

    getRequiredActorFromLvl0Id(actorId: string): Lvl0FoundryActor {
        let foundryActor = this.getActorFromLvl0Id(actorId);
        if (!foundryActor) {
            throw new Error('Foundry actor not found: ' + actorId);
        }
        return foundryActor;
    }

    getItemFromLvl0Id(id: string): Lvl0FoundryItem | undefined {
        if (id.includes('@')) {
            let atIndex = id.indexOf('@');
            let itemId = id.substring(0, atIndex);
            let parent = id.substring(atIndex + 1);
            let [parentType, parentId] = parent.split(':');
            switch (parentType) {
                case 'Actor':
                    return this.getActorFromLvl0Id(parentId)?.items.get(itemId);
                default:
                    throw new Error(`Unsupported parent type: \`${parentType}\` when selecting foundry id: '${id}'`)
            }
        } else {
            return game.items?.get(id)
        }
    }
}
