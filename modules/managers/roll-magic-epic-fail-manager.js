import magicEpicFailEffects from '../../data/magic-epic-fail-effects.js';

export class RollMagicEpicFailManager {
    static async roll() {
        let epiFailRoll = new Roll('2d6').roll();
        const messageData = epiFailRoll.toMessage({}, {create: false});

        let effect = magicEpicFailEffects[epiFailRoll._total];

        messageData.content = `<div class="critical-failure-chat">
    <div class="title">Echec critique</div>
    <div class="result"><i class="fas fa-dice"></i> ${epiFailRoll._total}</div>
    <div class="description"><span class="label">${effect.name}</span> ${effect.description}</div>
    <div class="roll">${await epiFailRoll.render()}</div>
</div>`;
        messageData.speaker = ChatMessage.getSpeaker({token: this.token});
        await ChatMessage.create(messageData);
    }
}
