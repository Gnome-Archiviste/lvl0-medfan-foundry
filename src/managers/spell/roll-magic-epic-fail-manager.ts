import {inject, singleton} from 'tsyringe';
import {MagicEpicFailRepository} from '../../repositories/magic-epic-fail-repository';
import {RollFactory} from '../../utils/roll-factory';

@singleton()
export class RollMagicEpicFailManager {

    constructor(
        @inject(RollFactory) private readonly rollFactory: RollFactory,
        @inject(MagicEpicFailRepository) private readonly magicEpicFailRepository: MagicEpicFailRepository
    ) {
    }

    async roll(): Promise<void> {
        let epiFailRoll = await this.rollFactory.createRoll('2d6');
        const messageData = epiFailRoll.toMessage({}, {create: false});

        let effect = this.magicEpicFailRepository.getMagicEpicFailEffect(epiFailRoll.total!);

        let content = `<div class="critical-failure-chat">
    <div class="title">Echec critique</div>
    <div class="result"><i class="fas fa-dice"></i> ${epiFailRoll.total}</div>
    <div class="description"><span class="label">${effect.name}</span> ${effect.description}</div>
    <div class="roll">${await epiFailRoll.render()}</div>
</div>`;
        await ChatMessage.create({...messageData, content});
    }
}
