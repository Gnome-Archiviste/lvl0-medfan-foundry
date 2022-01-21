import {SkillDefinition} from '../../../repositories/data/skills';
import {RollHelper, RollResult} from '../../../utils/roll-helper';

export interface SkillTestRollResult {
    result: RollResult,
    total: number,
    successValue: number,
    roll: Roll
}

export class SkillScript {
    constructor(
        public readonly token: Token,
        public readonly skillDefinition: SkillDefinition
    ) {
    }

    prepare(): Promise<boolean> {
        return Promise.resolve(true);
    }

    async postRoll(testRoll: SkillTestRollResult): Promise<void> {
        const messageData = testRoll.roll.toMessage({}, {create: false});

        let message = `<div class="skill-roll-chat">
            <div class="title">${this.skillDefinition.name}</div>
            <div class="test"><i class="fas fa-dice"></i> ${testRoll.total} / ${testRoll.successValue} (${RollHelper.getTestResultMessage(testRoll.result)})</div>
            <div class="roll">${await RollHelper.renderRollSmall(testRoll.roll)}</div>
        </div>
        `;

        let content = message;
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
