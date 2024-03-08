import {SpecialityRollChatMessageData} from './speciality-roll-chat-message.component';
import {SpellRollChatMessageData} from './spell-roll-chat-message.component';
import {ItemUseChatMessageData} from './item-use-chat-message.component';

export type SpecialityRollChatMessageType = 'speciality-roll';
export type SpellRollChatMessageType = 'spell-roll';
export type ItemUseChatMessageType = 'item-use';
export type Lvl0MessageTypes =
    SpecialityRollChatMessageType;

export type Lvl0ChatMessage = {
    type: SpecialityRollChatMessageType
    data: SpecialityRollChatMessageData
} | {
    type: SpellRollChatMessageType,
    data: SpellRollChatMessageData
} | {
    type: ItemUseChatMessageType,
    data: ItemUseChatMessageData
}
