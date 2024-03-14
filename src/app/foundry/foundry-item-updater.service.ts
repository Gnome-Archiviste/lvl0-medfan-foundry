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

    async updateItem(itemId: string, diffObject: Partial<Lvl0Item>) {
        let foundryItem = this.foundryLvl0IdResolver.getItemFromLvl0Id(itemId);
        if (!foundryItem) {
            throw new Error('Foundry item not found: ' + itemId);
        }
        await foundryItem.update(diffObject, {diff: true});
    }

    async changeQuantity<T extends Lvl0Item>(item: T, relativeQuantityChange: number): Promise<void> {
        let foundryItem = this.foundryLvl0IdResolver.getItemFromLvl0Id(item.id);
        if (item.system.quantity + relativeQuantityChange <= 0) {
            await foundryItem.delete();
        } else {
            await foundryItem.update({data: {quantity: item.system.quantity + relativeQuantityChange}})
        }
    }
}
