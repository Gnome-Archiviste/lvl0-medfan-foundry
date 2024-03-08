import {inject, singleton} from 'tsyringe';
import {SpellChat} from './spell-chat';
import {Lvl0FoundryItemScroll, ScrollItemPropertiesData} from 'models/item';
import {Lvl0ActorCharacter} from 'models/actor';
import {ItemUtil} from '../../utils/item-util';
import {SpellRepository} from '../../repositories';
import {RolledSpell} from '../../app/spell/spell';

@singleton()
export class ScrollUtil {

    constructor(
        @inject(SpellChat) private readonly spellChat: SpellChat,
        @inject(SpellRepository) private readonly spellRepository: SpellRepository,
        @inject(ItemUtil) private readonly itemUtil: ItemUtil,
    ) {
    }

    async createScroll(actor: Lvl0ActorCharacter, spell: RolledSpell): Promise<void> {
        let emptyScroll = actor.getFirstEmptyScroll();
        if (!emptyScroll) {
            ui.notifications?.error('Aucun parchemin vierge disponible')
            return undefined;
        }
        let itemName = 'Parchemin: ' + spell.definition.name;
        if (spell.definition.dependsOnArcaneLevel) {
            itemName += ' (Arcane: ' + actor.data.data.computedData.magic.arcaneLevel + ')';
        }
        let scrollData = {
            ...emptyScroll.toObject(),
            name: itemName,
            img: spell.definition.icon,
            data: {
                description: spell.data.description,
                quantifiable: false,
                quantity: 0,
                spell: spell.definition.id,
                arcane: actor.data.data.computedData.magic.arcaneLevel
            } as ScrollItemPropertiesData
        };
        await actor.createEmbeddedDocuments('Item', [scrollData]);
        await this.itemUtil.updateQuantity(emptyScroll, -1);
    }
}
