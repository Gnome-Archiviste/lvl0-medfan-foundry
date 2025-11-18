import {Injectable} from '@angular/core';
import {ChatService} from '../chat/chat.service';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';
import {Lvl0ChatMessage} from '../chat/lvl0-chat-message.types';
import {IRoll} from '../shared/roll';
import {FoundryRoll} from './foundry-roll-factory';

@Injectable()
export class FoundryChatService extends ChatService {
    constructor(
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver
    ) {
        super();
    }

    async sendLvl0MessageFrom(actorId: string | undefined, lvl0ChatMessage: Lvl0ChatMessage, rolls?: IRoll[]): Promise<void> {
        let messageData: ChatMessage.CreateData = {
            author: game.user?.id,
            style: CONST.CHAT_MESSAGE_STYLES.OTHER,
        };
        const speaker = actorId ? ChatMessage.getSpeaker({actor: this.foundryLvl0IdResolver.getActorFromLvl0Id(actorId)}) : undefined;
        let roll = this.mergeRolls(rolls);
        if (roll) {
            messageData.rolls = [roll];
            messageData.sound = CONFIG.sounds.dice;
        }
        await ChatMessage.create({
            ...messageData,
            speaker,
            content: '',
            flags: {
                'lvl0mf-sheet': {
                    lvl0ChatMessage: lvl0ChatMessage
                }
            },
        });
    }

    mergeRolls(rolls?: IRoll[]) {
        if (!rolls)
            return undefined;
        if (rolls.length === 0)
            return undefined;

        let foundryRolls = rolls.filter(x => x instanceof FoundryRoll).map(x => (<FoundryRoll>x).foundryRoll)

        let groupedRoll = new Roll('').toJSON();
        groupedRoll.terms = [foundry.dice.terms.PoolTerm.fromRolls(foundryRolls)];
        groupedRoll.dice = []
        groupedRoll.evaluated = true;
        groupedRoll.total = 0;

        let formulas: string[] = [];
        for (let roll of foundryRolls) {
            formulas.push(roll.formula);
            groupedRoll.total += roll.total ?? 0;
        }
        groupedRoll.formula = `{${formulas.join(',')}}`;

        return Roll.fromJSON(JSON.stringify(groupedRoll));
    }
}
