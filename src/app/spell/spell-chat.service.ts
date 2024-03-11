import {Injectable} from '@angular/core';
import {ChatSpell, ChatSpellValue, RolledSpell, RolledSpellValue, Spell} from './spell';
import {ChatService} from '../chat/chat.service';
import {SpellUtil} from './spell-util';
import {RollFactory} from '../shared/roll-factory';
import {IRoll} from '../shared/roll';
import {Lvl0Item} from '../data-accessor/models/lvl0-item';
import {SpellRollChatMessageData} from '../chat/spell-roll-chat-message.component';
import {ItemUseChatMessageData} from '../chat/item-use-chat-message.component';

@Injectable({
    providedIn: 'root'
})
export class SpellChatService {

    constructor(
        private readonly chatService: ChatService,
        private readonly rollFactory: RollFactory,
        private readonly spellUtil: SpellUtil,
    ) {
    }

    async rollSpellAndSendToChat(actorId: string | undefined, spell: Spell, options?: {
        itemSource: Lvl0Item,
        rollContext?: {
            epicFail?: boolean,
            criticalSuccess?: boolean
        }
    }) {
        let rolledSpell = await this.spellUtil.rollSpell(spell, options?.rollContext);
        let chatSpell = this.mapToChatSpell(rolledSpell);

        let rolls = this.getRolls(rolledSpell);

        let spellRollChatMessageData: SpellRollChatMessageData = {
            spell: chatSpell
        };
        if (options?.itemSource) {
            let messageData: ItemUseChatMessageData = {
                itemSource: {
                    name: options.itemSource.name,
                    icon: options.itemSource.img,
                },
                effect: {
                    type: 'cast-spell',
                    data: spellRollChatMessageData
                }
            }
            await this.chatService.sendLvl0MessageFrom(actorId, {type: 'item-use', data: messageData}, rolls)
        } else {
            await this.chatService.sendLvl0MessageFrom(actorId, {type: 'spell-roll', data: spellRollChatMessageData}, rolls)
        }
    }

    public mapToChatSpell(rolledSpell: RolledSpell) {
        let chatSpell: ChatSpell = {
            spellId: rolledSpell.definition.id,
            context: rolledSpell.context,
            data: {
                actions: rolledSpell.data.actions,
                effectiveCost: rolledSpell.data.effectiveCost,
                description: rolledSpell.data.description,
                distance: this.mapToChatSpellValue(rolledSpell.data.distance),
                damage: this.mapToChatSpellValue(rolledSpell.data.damage),
                bonus: this.mapToChatSpellValue(rolledSpell.data.bonus),
                duration: this.mapToChatSpellValue(rolledSpell.data.duration),
                heal: this.mapToChatSpellValue(rolledSpell.data.heal),
                area: this.mapToChatSpellValue(rolledSpell.data.area),
                resilience: this.mapToChatSpellValue(rolledSpell.data.resilience),
                criticalSuccess: this.mapToChatSpellValue(rolledSpell.data.criticalSuccess),
            }
        };
        return chatSpell;
    }

    private mapToChatSpellValue(value?: RolledSpellValue): ChatSpellValue | undefined {
        if (!value)
            return undefined;

        if ('roll' in value) {
            return {
                roll: this.rollFactory.convertToRollChat(value.roll),
                suffix: value.suffix,
                unit: value.unit,
            };
        }
        return {
            text: value.text
        }
    }

    private getRolls(rolledSpell: RolledSpell): IRoll[] {
        let rolls: IRoll[] = [];

        this.addRollToListIfContainRoll(rolls, rolledSpell.data.distance)
        this.addRollToListIfContainRoll(rolls, rolledSpell.data.damage)
        this.addRollToListIfContainRoll(rolls, rolledSpell.data.bonus)
        this.addRollToListIfContainRoll(rolls, rolledSpell.data.duration)
        this.addRollToListIfContainRoll(rolls, rolledSpell.data.heal)
        this.addRollToListIfContainRoll(rolls, rolledSpell.data.area)
        this.addRollToListIfContainRoll(rolls, rolledSpell.data.resilience)
        this.addRollToListIfContainRoll(rolls, rolledSpell.data.criticalSuccess)

        return rolls;
    }

    private addRollToListIfContainRoll(rolls: IRoll[], value: RolledSpellValue | undefined) {
        if (!value)
            return;

        if ('roll' in value)
            rolls.push(value.roll);
    }
}
