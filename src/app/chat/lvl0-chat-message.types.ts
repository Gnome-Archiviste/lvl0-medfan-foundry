import {SpecialityRollChatMessageData} from './speciality-roll-chat-message.component';

export type SpecialityRollChatMessageType = 'speciality-roll';
export type Lvl0MessageTypes =
    SpecialityRollChatMessageType;

export type Lvl0ChatMessage = {
    type: SpecialityRollChatMessageType
    data: SpecialityRollChatMessageData
}
