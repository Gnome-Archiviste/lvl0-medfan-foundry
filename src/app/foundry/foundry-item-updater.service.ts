import {ItemUpdaterService} from '../data-accessor/item-updater.service';
import {Injectable} from '@angular/core';
import {Lvl0Item} from '../data-accessor/models/lvl0-item';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';

@Injectable()
export class FoundryItemUpdaterService extends ItemUpdaterService {
    constructor(
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver
    ) {
        super();
    }

    updateItem(itemId: string, diffObject: Partial<Lvl0Item>) {
        let foundryItem = this.foundryLvl0IdResolver.getItemFromLvl0Id(itemId);
        if (!foundryItem) {
            throw new Error('Foundry item not found: ' + itemId);
        }
        foundryItem.update(diffObject, {diff: true});
    }
}
