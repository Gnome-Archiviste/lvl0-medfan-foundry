import {SpecialityRollChatMessageData} from './speciality-roll-chat-message.component';
import {SpellRollChatMessageData} from './spell-roll-chat-message.component';
import {ItemUseChatMessageData} from './item-use-chat-message.component';
import {SkillRollChatMessageData} from './skill-roll-chat-message.component';
import {SpellEpicFailChatMessageData} from './spell-epic-fail-chat-message.component';

export type SpecialityRollChatMessageType = 'speciality-roll';
export type SpellRollChatMessageType = 'spell-roll';
export type SpellEpicFailChatMessageType = 'spell-epic-fail';
export type SkillRollChatMessageType = 'skill-roll';
export type ItemUseChatMessageType = 'item-use';
export type Lvl0MessageTypes = SpecialityRollChatMessageType
    | SpellRollChatMessageType
    | ItemUseChatMessageType
    | SkillRollChatMessageType
    | SpellEpicFailChatMessageType;

export type Lvl0ChatMessage = {
    type: SpecialityRollChatMessageType
    data: SpecialityRollChatMessageData
} | {
    type: SpellRollChatMessageType,
    data: SpellRollChatMessageData
} | {
    type: ItemUseChatMessageType,
    data: ItemUseChatMessageData
} | {
    type: SkillRollChatMessageType,
    data: SkillRollChatMessageData
} | {
    type: SpellEpicFailChatMessageType,
    data: SpellEpicFailChatMessageData
}
