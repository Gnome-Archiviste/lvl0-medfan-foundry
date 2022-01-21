import {MagicEpicFailRepository} from '../../repositories/magic-epic-fail-repository';

export class RollMagicEpicFailManager {
    static async roll() {
        let epiFailRoll = await (new Roll('2d6').roll({async: true}));
        const messageData = epiFailRoll.toMessage({}, {create: false});

        let effect = MagicEpicFailRepository.getMagicEpicFailEffect(epiFailRoll.total!);

        let content = `<div class="critical-failure-chat">
    <div class="title">Echec critique</div>
    <div class="result"><i class="fas fa-dice"></i> ${epiFailRoll.total}</div>
    <div class="description"><span class="label">${effect.name}</span> ${effect.description}</div>
    <div class="roll">${await epiFailRoll.render()}</div>
</div>`;
        await ChatMessage.create({...messageData, content});
    }
}
