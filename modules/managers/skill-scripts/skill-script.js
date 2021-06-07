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
        let message = '';
        if (success) {
            message = `${this.skillDefinition.name} (${result} / ${minSuccessValue}): <span style="color: green; font-weight: bold">Succès${result === 2 ? ' critique' : ''}</span>`;
        } else {
            message = `${this.skillDefinition.name} (${result} / ${minSuccessValue}): <span style="color: darkred; font-weight: bold">Echec${result === 12 ? ' critique' : ''}</span>`;
        }
        messageData.content = `<p>${message} </p> ${await roll.render()}`;
        messageData.speaker = ChatMessage.getSpeaker({token: this.token});
        await ChatMessage.create(messageData);
    }
}
