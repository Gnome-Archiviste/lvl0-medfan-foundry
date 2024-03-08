import {Lvl0Item} from './models/lvl0-item';
import {SpellRepository} from '../../repositories';
import {PlayerNotificationService} from '../shared/player-notification.service';
import {ItemUpdaterService} from './item-updater.service';

export abstract class ItemService {
    protected constructor(
        private readonly spellRepository: SpellRepository,
        private readonly playerNotificationService: PlayerNotificationService,
        private readonly itemUpdaterService: ItemUpdaterService,
    ) {
    }

    async useItem(item: Lvl0Item): Promise<void> {
        if (item.type === 'scroll') {
            let spellDefinition = this.spellRepository.getSpellById(item.data.spell)
            if (!spellDefinition)
                return;
            let spell = spellUtil.computeSpellValuesBeforeRoll(spellDefinition, {arcaneLevel: item.data.arcane});
            await spellChatService.rollSpellAndSendToChat(item.ownerId, spell, {itemSource: item});
            await this.deleteItem(item);
        }

        if (item.type === 'wand') {
            if (item.data.charge <= 0) {
                this.playerNotificationService.showWarning('wand_is_empty');
                return;
            }

            let spellDefinition = this.spellRepository.getSpellById(item.data.spell)
            if (!spellDefinition) {
                this.playerNotificationService.showError('unknown_spell');
                ui.notifications?.error('Sort inconnu: ' + item.data.spell);
                return;
            }
            let spell = spellUtil.computeSpellValuesBeforeRoll(spellDefinition, {arcaneLevel: item.data.arcane});
            await spellChatService.rollSpellAndSendToChat(item.ownerId, spell, {itemSource: item});
            this.itemUpdaterService.updateItem(item.id, {data: {charge: item.data.charge - 1}});
        }
    }

    abstract shareItem(lvl0Item: Lvl0Item): Promise<void>;

    abstract editItem(lvl0Item: Lvl0Item): Promise<void>;

    abstract deleteItem(lvl0Item: Lvl0Item): Promise<void>;
}
