import {ActorSpell} from './spell-definition.model';
import {ScrollItemPropertiesData} from '../../models/item/scroll-item-properties-data';
import {Lvl0Actor} from '../../lvl0-actor';
import {SpellManager} from './spell-manager';
import {SpellChat} from './spell-chat';
import {RollHelper} from '../roll-helper';

export class ScrollHelper {
    static async createScroll(actor: Lvl0Actor, spell: ActorSpell): Promise<Item | undefined> {
        let emptyScroll = actor.getFirstEmptyScroll();
        if (!emptyScroll) {
            ui.notifications?.error('Aucun parchemin vierge disponible')
            return undefined;
        }
        let scrollData = {
            ...emptyScroll.toObject(),
            name: 'Parchemin: ' + spell.name + ' (Arcane: ' + actor.data.data.computedData.magic.arcaneLevel + ')',
            img: spell.icon,
            data: {
                quantifiable: false,
                quantity: 0,
                spell: spell.id,
                arcane: actor.data.data.computedData.magic.arcaneLevel
            } as ScrollItemPropertiesData
        };
        await actor.createEmbeddedDocuments('Item', [scrollData]);
        if (emptyScroll.data.data.quantity === 1) {
            await emptyScroll.delete();
        } else {
            await emptyScroll.update({
                data: {
                    quantity: emptyScroll.data.data.quantity - 1
                }
            })
        }
    }

    static async useScroll(scroll: Item): Promise<void> {
        if (scroll.data.type !== 'scroll')
            throw new Error('Item is not a scroll');
        let spell = await SpellManager.getComputedSpellForActorById(scroll.data.data.spell, {arcaneLevel: scroll.data.data.arcane});
        if (spell) {
            let speaker = scroll.actor ? ChatMessage.getSpeaker({actor: scroll.actor}) : undefined;
            let message = `<div class="skill-roll-spell-chat">
                <div class="title">Utilisation d'un parchemin</div>
                ${await SpellChat.renderSpellChat(spell, 'success')}
            </div>`;
            await ChatMessage.create({
                speaker: speaker,
                content: message
            })
            await scroll.delete();
        }
    }
}
