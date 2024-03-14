import {Lvl0Item} from './models/lvl0-item';
import {SpellRepository} from '../../repositories';
import {PlayerNotificationService} from '../shared/player-notification.service';
import {ItemUpdaterService} from './item-updater.service';
import {SpellUtil} from '../spell/spell-util';
import {SpellChatService} from '../spell/spell-chat.service';

export abstract class ItemService {
    protected constructor(
        private readonly spellRepository: SpellRepository,
        private readonly playerNotificationService: PlayerNotificationService,
        private readonly itemUpdaterService: ItemUpdaterService,
        private readonly spellUtil: SpellUtil,
        private readonly spellChatService: SpellChatService,
    ) {
    }

    async useItem(item: Lvl0Item): Promise<void> {
        if (item.type === 'scroll') {
            let spellDefinition = this.spellRepository.getSpellById(item.system.spell)
            if (!spellDefinition)
                return;
            let spell = this.spellUtil.computeSpellValuesBeforeRoll(spellDefinition, {arcaneLevel: item.system.arcane});
            await this.spellChatService.rollSpellAndSendToChat(item.ownerId, spell, {itemSource: item});
            await this.deleteItem(item);
        }

        if (item.type === 'wand') {
            if (item.system.charge <= 0) {
                this.playerNotificationService.showWarning('wand_is_empty');
                return;
            }

            let spellDefinition = this.spellRepository.getSpellById(item.system.spell)
            if (!spellDefinition) {
                this.playerNotificationService.showError('unknown_spell');
                ui.notifications?.error('Sort inconnu: ' + item.system.spell);
                return;
            }
            let spell = this.spellUtil.computeSpellValuesBeforeRoll(spellDefinition, {arcaneLevel: item.system.arcane});
            await this.spellChatService.rollSpellAndSendToChat(item.ownerId, spell, {itemSource: item});
            this.itemUpdaterService.updateItem(item.id, {system: {charge: item.system.charge - 1}});
        }
    }

    abstract shareItem(lvl0Item: Lvl0Item): Promise<void>;

    abstract editItem(lvl0Item: Lvl0Item): Promise<void>;

    abstract deleteItem(lvl0Item: Lvl0Item): Promise<void>;

    abstract createItemFrom<T extends Lvl0Item>(baseItem: T, data: RecursivePartial<T>): Promise<void>;
}
