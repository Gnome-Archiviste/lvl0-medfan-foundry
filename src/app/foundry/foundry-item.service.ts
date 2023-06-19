import {ItemService} from '../data-accessor/item.service';
import {Injectable} from '@angular/core';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';
import {Lvl0Item} from '../data-accessor/models/lvl0-item';

@Injectable()
export class FoundryItemService extends ItemService {
    constructor(
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver
    ) {
        super();
    }

    async useItem(lvl0Item: Lvl0Item) {
        let item = this.foundryLvl0IdResolver.getItemFromLvl0Id(lvl0Item.id);
        if (item) {
            await item.use();
        }
    }

    async shareItem(lvl0Item: Lvl0Item) {
        let item = this.foundryLvl0IdResolver.getItemFromLvl0Id(lvl0Item.id);
        if (item) {
            let copy = await Item.create(item.toObject());
            if (copy) {
                await ChatMessage.create({
                    type: CONST.CHAT_MESSAGE_TYPES.OTHER,
                    content: `@Item[${copy.id}]{${copy.name}}`
                });
            }
        }
    }

    async editItem(lvl0Item: Lvl0Item) {
        let item = this.foundryLvl0IdResolver.getItemFromLvl0Id(lvl0Item.id);
        if (item) {
            item.sheet?.render(true);
        }
    }

    async deleteItem(lvl0Item: Lvl0Item) {
        let item = this.foundryLvl0IdResolver.getItemFromLvl0Id(lvl0Item.id);
        if (item) {
            await item.delete();
        }
    }
}
