import {ItemUpdaterService} from '../data-accessor/item-updater.service';
import {Injectable} from '@angular/core';
import {Lvl0Item, Lvl0ItemWand} from '../data-accessor/models/lvl0-item';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';
import {FoundryToLvl0Mapper} from './foundry-to-lvl0-mapper';

@Injectable()
export class FoundryItemUpdaterService extends ItemUpdaterService {
    constructor(
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver,
        private readonly foundryToLvl0Mapper: FoundryToLvl0Mapper
    ) {
        super();
    }

    async updateItem(itemId: string, diffObject: RecursivePartial<Lvl0Item>) {
        let foundryItem = this.foundryLvl0IdResolver.getItemFromLvl0Id(itemId);
        if (!foundryItem) {
            throw new Error('Foundry item not found: ' + itemId);
        }

        await foundryItem.update(diffObject, {diff: true});
    }

    async updateItemFromLastVersion<T extends Lvl0Item>(item: T, updater: (item: T) => RecursivePartial<T>) {
        let foundryItem = this.foundryLvl0IdResolver.getItemFromLvl0Id(item.id);
        if (!foundryItem) {
            throw new Error('Foundry item not found: ' + item.id);
        }
        // FIXME cast `as` should not be needed
        await foundryItem.update(updater(this.foundryToLvl0Mapper.createLvl0ItemFromFoundryItem(foundryItem) as T) as Item.UpdateData, {diff: true});
    }

    async changeQuantity<T extends Lvl0Item>(item: T, relativeQuantityChange: number): Promise<void> {
        let foundryItem = this.foundryLvl0IdResolver.getItemFromLvl0Id(item.id);
        if (!foundryItem)
            return;
        if (item.system.quantity + relativeQuantityChange <= 0) {
            await foundryItem.delete();
        } else {
            await foundryItem.update({system: {quantity: item.system.quantity + relativeQuantityChange}})
        }
    }
}
