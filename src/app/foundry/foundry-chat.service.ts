import {Injectable} from '@angular/core';
import {ChatService} from '../shared/chat.service';
import {IRoll} from '../shared/roll';
import {FoundryRoll} from './foundry-roll-factory';
import {MessageData} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/client/dice/roll';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';

@Injectable()
export class FoundryChatService extends ChatService {
    constructor(
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver
    ) {
        super();
    }

    async addCustomElementMessage(actorId: string, customElementName: string, customElementParameters: Record<string, string>, roll?: IRoll): Promise<void> {
        let messageData: MessageData<any>;
        if (roll instanceof FoundryRoll) {
            messageData = roll.foundryRoll.toMessage({}, {create: false});
        } else {
            messageData = {};
        }

        const speaker = ChatMessage.getSpeaker({actor: this.foundryLvl0IdResolver.getActorFromLvl0Id(actorId)})

        await ChatMessage.create({
            ...messageData, speaker, content: '', flags: {
                'lvl0mf-sheet': {
                    lvl0CustomElement: {
                        name: customElementName,
                        params: customElementParameters
                    }
                }
            }
        });
    }

}
