import {Injectable} from '@angular/core';
import {ChatService} from '../chat/chat.service';
import {MessageData} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/client/dice/roll';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';
import {Lvl0ChatMessage} from '../chat/lvl0-chat-message.types';

@Injectable()
export class FoundryChatService extends ChatService {
    constructor(
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver
    ) {
        super();
    }

    async sendLvl0MessageFrom(actorId: string, lvl0ChatMessage: Lvl0ChatMessage): Promise<void> {
        let messageData: MessageData<any> = {};
        const speaker = ChatMessage.getSpeaker({actor: this.foundryLvl0IdResolver.getActorFromLvl0Id(actorId)})
        await ChatMessage.create({
            ...messageData, speaker, content: '', flags: {
                'lvl0mf-sheet': {
                    lvl0ChatMessage: lvl0ChatMessage
                }
            }
        });
    }

}
