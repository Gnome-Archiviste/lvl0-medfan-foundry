import {inject, singleton} from 'tsyringe';
import {Lvl0Actor, Lvl0ActorCharacter} from 'models/actor';
import {WandConfigRepository} from 'repositories';
import {Lvl0ItemWand, WandItemPropertiesData} from 'models/item';
import {RollResult, RollUtil} from 'utils/roll-util';
import {ActorSpell} from './actor-spell.model';
import {ItemUtil} from 'utils/item-util';
import {SpellManager} from './spell-manager';
import {SpellChat} from './spell-chat';

@singleton()
export class WandUtil {
    constructor(
        @inject(WandConfigRepository) private readonly wandConfigRepository: WandConfigRepository,
        @inject(RollUtil) private readonly rollUtil: RollUtil,
        @inject(ItemUtil) private readonly itemUtil: ItemUtil,
        @inject(SpellManager) private readonly spellManager: SpellManager,
        @inject(SpellChat) private readonly spellChat: SpellChat,
    ) {
    }

    getNonFullWands(actor: Lvl0Actor): [spellInNonFullWand: {}, emptyWandAvailable: boolean] {
        let spellInNonFullWand = {};
        let emptyWandAvailable = false;
        let wands = actor.itemTypes['wand'];
        if (wands) {
            for (let wand of wands) {
                if (!wand.data.data.spell && wand.data.data.quantity) {
                    emptyWandAvailable = true;
                    break;
                }
                if (wand.data.data.blocked) {
                    continue;
                }
                let wandConfig = this.wandConfigRepository.getWandConfig(wand.data.data.arcane);
                if (!wandConfig) {
                    continue;
                }
                if (wand.data.data.charge < wandConfig.maxChargesPerWand) {
                    spellInNonFullWand[wand.data.data.spell] = true;
                }
            }
        }
        return [spellInNonFullWand, emptyWandAvailable];
    }

    getAvailableWandsForSpell(actor: Lvl0Actor, spellId: string, arcaneLevel: number): Lvl0ItemWand[] {
        let wandConfig = this.wandConfigRepository.getWandConfig(arcaneLevel);

        if (!wandConfig)
            return [];
        let maxChargeCount = wandConfig.maxChargesPerWand;
        return actor.itemTypes['wand']
            .filter(w => !w.data.data.blocked)
            .filter(w =>
                (!w.data.data.spell && w.data.data.quantity)
                || (w.data.data.spell === spellId && w.data.data.arcane == arcaneLevel && w.data.data.charge < maxChargeCount)
            )
    }

    async fillWandWithSpell(testResult: RollResult, wand: Lvl0ItemWand, spell: ActorSpell, actor: Lvl0ActorCharacter): Promise<void> {
        if (testResult === 'fail') {
            return;
        }
        if (wand.data.data.spell === spell.id) {
            if (testResult === 'epicFail') {
                await wand.update({data: {blocked: true} as WandItemPropertiesData})
            } else {
                await wand.update({data: {charge: wand.data.data.charge + 1} as WandItemPropertiesData});
            }
        } else {
            let itemName = 'Baguette: ' + spell.name;
            if (spell.dependsOnArcaneLevel) {
                itemName += ' (Arcane: ' + actor.data.data.computedData.magic.arcaneLevel + ')';
            }
            let wandData = {
                ...wand.toObject(),
                name: itemName,
                img: spell.icon,
                data: {
                    description: spell.description,
                    quantifiable: false,
                    quantity: 0,
                    spell: spell.id,
                    arcane: spell.dependsOnArcaneLevel ? actor.data.data.computedData.magic.arcaneLevel : 0,
                    charge: testResult === 'epicFail' ? 0 : 1,
                    blocked: testResult === 'epicFail'
                } as WandItemPropertiesData
            };
            await actor.createEmbeddedDocuments('Item', [wandData]);
            await this.itemUtil.updateQuantity(wand, -1);
        }
    }

    async useWand(wand: Lvl0ItemWand) {
        if (wand.data.data.charge <= 0) {
            ui.notifications?.warn('La baguette est vide');
            return;
        }

        let spell = await this.spellManager.getComputedSpellForActorById(wand.data.data.spell, {arcaneLevel: wand.data.data.arcane});
        if (!spell) {
            ui.notifications?.error('Sort inconnu: ' + wand.data.data.spell);
            return;
        }

        let speaker = wand.actor ? ChatMessage.getSpeaker({actor: wand.actor}) : undefined;
        let message = `<div class="skill-roll-spell-chat">
            <div class="title">Utilisation d'une baguette</div>
            ${await this.spellChat.renderSpellChat(spell, 'success')}
        </div>`;
        await ChatMessage.create({
            speaker: speaker,
            content: message
        })
        await wand.update({data: {charge: wand.data.data.charge - 1}});
    }
}
