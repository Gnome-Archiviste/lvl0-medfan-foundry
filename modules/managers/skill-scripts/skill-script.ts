import {SkillDefinition} from '../../models/all';

export class SkillScript {
    constructor(
        public readonly token: Token,
        public readonly skillDefinition: SkillDefinition
    ) {
    }

    /**
     * @return Promise<boolean>
     */
    prepare() {
        return Promise.resolve(true);
    }

    async postRoll(roll: Roll, result: number, minSuccessValue: number, success: boolean): Promise<void> {
        const messageData = roll.toMessage({}, {create: false});

        let message = `<div class="skill-roll-chat">
            <div class="title">${this.skillDefinition.name}</div>
            <div class="test"><i class="fas fa-dice"></i> ${result} / ${minSuccessValue} (${this.getTestResultMessage(success, result)})</div>
            <div class="roll">${await roll.render()}</div>
        </div>
        `;

        let content = message;
        let speaker = ChatMessage.getSpeaker({token: this.token.document});
        await ChatMessage.create({...messageData, speaker, content});
    }


    /**
     * @deprecated Use RollHelper
     * @param {boolean} success
     * @param {number} result
     * @return {string}
     */
    getTestResultMessage(success, result) {
        if (success)
            return `<span style="color: green; font-weight: bold">Succès${result === 2 ? ' critique' : ''}</span>`;
        else
            return `<span style="color: darkred; font-weight: bold">Echec${result === 12 ? ' critique' : ''}</span>`;
    }
}
