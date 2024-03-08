import {Lvl0ChatMessage} from './lvl0-chat-message.types';
import {IRoll} from '../shared/roll';

export abstract class ChatService {
    abstract sendLvl0MessageFrom(actorId: string | undefined, lvl0ChatMessage: Lvl0ChatMessage, rolls?: IRoll[]): Promise<void>
}
