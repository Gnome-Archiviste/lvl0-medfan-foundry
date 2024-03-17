import {ItemService} from '../data-accessor/item.service';
import {Injectable} from '@angular/core';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';
import {Lvl0Item} from '../data-accessor/models/lvl0-item';
import {SpellRepository} from '../../repositories';
import {PlayerNotificationService} from '../shared/player-notification.service';
import {ItemUpdaterService} from '../data-accessor/item-updater.service';
import {SpellUtil} from '../spell/spell-util';
import {SpellChatService} from '../spell/spell-chat.service';
import {FoundryToLvl0Mapper} from './foundry-to-lvl0-mapper';
import {Lvl0FoundryItem} from '../../models/item';

@Injectable()
export class FoundryItemService extends ItemService {
    constructor(
        spellRepository: SpellRepository,
        playerNotificationService: PlayerNotificationService,
        itemUpdaterService: ItemUpdaterService,
        spellUtil: SpellUtil,
        spellChatService: SpellChatService,
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver,
        private readonly foundryToLvl0Mapper: FoundryToLvl0Mapper
    ) {
        super(spellRepository, playerNotificationService, itemUpdaterService, spellUtil, spellChatService);
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

    async createItemFrom<T extends Lvl0Item>(baseItem: T, data: RecursivePartial<T>): Promise<T> {
        let item = this.foundryLvl0IdResolver.getItemFromLvl0Id(baseItem.id);
        let itemData = {
            ...item.toObject(),
            ...data
        }

        if (item.actor) {
            let items = await item.actor.createEmbeddedDocuments('Item', [itemData]) as Lvl0FoundryItem[]
            return this.foundryToLvl0Mapper.createLvl0ItemFromFoundryItem(items[0]) as T;
        }
        throw new Error('Ereating item without actor is not supported yet')
    }
}
