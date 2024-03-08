import {inject, singleton} from 'tsyringe';
import {Lvl0ActorCharacter, Lvl0FoundryActor} from 'models/actor';
import {SpellRepository, WandConfigRepository} from 'repositories';
import {Lvl0FoundryItemWand, WandItemPropertiesData} from 'models/item';
import {RollResult} from 'utils/roll-util';
import {ItemUtil} from 'utils/item-util';
import {SpellChat} from './spell-chat';
import {RolledSpell} from '../../app/spell/spell';

@singleton()
export class WandUtil {
    constructor(
        @inject(WandConfigRepository) private readonly wandConfigRepository: WandConfigRepository,
        @inject(ItemUtil) private readonly itemUtil: ItemUtil,
        @inject(SpellRepository) private readonly spellRepository: SpellRepository,
        @inject(SpellChat) private readonly spellChat: SpellChat,
    ) {
    }

    getAvailableWandsForSpell(actor: Lvl0FoundryActor, spellId: string, arcaneLevel: number): Lvl0FoundryItemWand[] {
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

    async fillWandWithSpell(testResult: RollResult, wand: Lvl0FoundryItemWand, spell: RolledSpell, actor: Lvl0ActorCharacter): Promise<void> {
        if (testResult === 'fail') {
            return;
        }
        if (wand.data.data.spell === spell.definition.id) {
            if (testResult === 'epicFail') {
                await wand.update({data: {blocked: true} as WandItemPropertiesData})
            } else {
                await wand.update({data: {charge: wand.data.data.charge + 1} as WandItemPropertiesData});
            }
        } else {
            let itemName = 'Baguette: ' + spell.definition.name;
            if (spell.definition.dependsOnArcaneLevel) {
                itemName += ' (Arcane: ' + actor.data.data.computedData.magic.arcaneLevel + ')';
            }
            let wandData = {
                ...wand.toObject(),
                name: itemName,
                img: spell.definition.icon,
                data: {
                    description: spell.data.description,
                    quantifiable: false,
                    quantity: 0,
                    spell: spell.definition.id,
                    arcane: spell.definition.dependsOnArcaneLevel ? actor.data.data.computedData.magic.arcaneLevel : 0,
                    charge: testResult === 'epicFail' ? 0 : 1,
                    blocked: testResult === 'epicFail'
                } as WandItemPropertiesData
            };
            await actor.createEmbeddedDocuments('Item', [wandData]);
            await this.itemUtil.updateQuantity(wand, -1);
        }
    }
}
