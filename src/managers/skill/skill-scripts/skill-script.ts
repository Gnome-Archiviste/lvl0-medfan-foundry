import {singleton} from 'tsyringe';
import {SkillDefinition} from '../../../repositories/data/skills';
import {RollResult, RollUtil} from '../../../utils/roll-util';
import {Evaluated} from '../../../utils/roll-factory';

export interface SkillTestRollResult {
    result: RollResult,
    total: number,
    successValue: number,
    roll: Evaluated<Roll>
}

@singleton()
export class SkillScript {
    constructor(
        public readonly token: Token,
        public readonly skillDefinition: SkillDefinition,
        protected readonly rollUtil: RollUtil
    ) {
    }

    prepare(): Promise<boolean> {
        return Promise.resolve(true);
    }

    async postRoll(testRoll: SkillTestRollResult): Promise<void> {
        const messageData = testRoll.roll.toMessage({}, {create: false});

        let content = `<div class="skill-roll-chat">
            <div class="title">${this.skillDefinition.name}</div>
            <div class="test"><i class="fas fa-dice"></i> ${testRoll.total} / ${testRoll.successValue} (${this.rollUtil.getTestResultMessage(testRoll.result)})</div>
            <div class="roll">${await this.rollUtil.renderRollSmall(testRoll.roll)}</div>
        </div>
        `;
        let speaker = ChatMessage.getSpeaker({token: this.token.document});
        await ChatMessage.create({
            ...messageData,
            speaker,
            content,
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            // FIXME: Remove stringify: https://github.com/League-of-Foundry-Developers/foundry-vtt-types/issues/1552
            roll: JSON.stringify(testRoll.roll.toJSON())
        });
    }
}
