import {IRoll} from '../../shared/roll';
import {SkillRollChatExtraDataMessageData} from '../../chat/skill-roll-chat-message.component';
import {SkillRollOutcome} from '../skill-roll-util';

export abstract class SkillScript<T = void, TOptions = void> {
    abstract prepare(actorId: string, options?: TOptions): Promise<boolean>;

    abstract postRoll(rollResult: SkillRollOutcome): Promise<T>;

    abstract getRolls(data: T): IRoll[];

    abstract getChatData(data: T): SkillRollChatExtraDataMessageData;
}
