export class SkillScript {
    /**
     * @param {Token} token
     * @param {SkillDefinition} skillDefinition
     */
    constructor(token, skillDefinition) {
        this.token = token;
        this.skillDefinition = skillDefinition;
    }

    /**
     * @return Promise<boolean>
     */
    prepare() {
        return Promise.resolve(true);
    }

    /**
     * @param {Roll} roll
     * @param {number} result
     * @param {number} minSuccessValue
     * @param {boolean} success
     * @return Promise
     */
    async postRoll(roll, result, minSuccessValue, success) {
        const messageData = roll.toMessage({}, {create: false});

        let message = `<div class="skill-roll-chat">
            <div class="title">${this.skillDefinition.name}</div>
            <div class="test"><i class="fas fa-dice"></i> ${result} / ${minSuccessValue} (${this.getTestResultMessage(success, result)})</div>
            <div class="roll">${await roll.render()}</div>
        </div>
        `;

        messageData.content = message;
        messageData.speaker = ChatMessage.getSpeaker({token: this.token.document});
        await ChatMessage.create(messageData);
    }


    /**
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
