import {Lvl0ChatMessage} from './lvl0-chat-message.types';

export abstract class ChatService {
    abstract sendLvl0MessageFrom(actorId: string, lvl0ChatMessage: Lvl0ChatMessage): Promise<void>
}
