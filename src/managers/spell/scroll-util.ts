import {inject, singleton} from 'tsyringe';
import {ActorSpell} from './actor-spell.model';
import {SpellManager} from './spell-manager';
import {SpellChat} from './spell-chat';
import {Lvl0ItemScroll, ScrollItemPropertiesData} from 'models/item';
import {Lvl0ActorCharacter} from 'models/actor';
import {ItemUtil} from '../../utils/item-util';

@singleton()
export class ScrollUtil {

    constructor(
        @inject(SpellChat) private readonly spellChat: SpellChat,
        @inject(SpellManager) private readonly spellManager: SpellManager,
        @inject(ItemUtil) private readonly itemUtil: ItemUtil,
    ) {
    }

    async createScroll(actor: Lvl0ActorCharacter, spell: ActorSpell): Promise<void> {
        let emptyScroll = actor.getFirstEmptyScroll();
        if (!emptyScroll) {
            ui.notifications?.error('Aucun parchemin vierge disponible')
            return undefined;
        }
        let itemName = 'Parchemin: ' + spell.name;
        if (spell.dependsOnArcaneLevel) {
            itemName += ' (Arcane: ' + actor.data.data.computedData.magic.arcaneLevel + ')';
        }
        let scrollData = {
            ...emptyScroll.toObject(),
            name: itemName,
            img: spell.icon,
            data: {
                description: spell.description,
                quantifiable: false,
                quantity: 0,
                spell: spell.id,
                arcane: actor.data.data.computedData.magic.arcaneLevel
            } as ScrollItemPropertiesData
        };
        await actor.createEmbeddedDocuments('Item', [scrollData]);
        await this.itemUtil.updateQuantity(emptyScroll, -1);
    }

    async useScroll(scroll: Lvl0ItemScroll): Promise<void> {
        let spell = await this.spellManager.getComputedSpellForActorById(scroll.data.data.spell, {arcaneLevel: scroll.data.data.arcane});
        if (spell) {
            let speaker = scroll.actor ? ChatMessage.getSpeaker({actor: scroll.actor}) : undefined;
            let message = `<div class="skill-roll-spell-chat">
                <div class="title">Utilisation d'un parchemin</div>
                ${await this.spellChat.renderSpellChat(spell, 'success')}
            </div>`;
            await ChatMessage.create({
                speaker: speaker,
                content: message
            })
            await scroll.delete();
        }
    }
}
