import {singleton} from 'tsyringe';
import {Lvl0FoundryActor} from '../models/actor';
import {ActiveEffectData} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs';

@singleton()
export class ActiveEffectUtil {
    public async replaceActiveEffect(actor: Lvl0FoundryActor, type: 'effect', id: string | number, data: Partial<ActiveEffectData>): Promise<void> {
        await this.removeActiveEffect(actor, type, id);

        const effectData = {
            ...data,
            flags: {
                ['core.statusId']: `lvl0-${type}-${id.toString()}`,
            }
        } as Partial<ActiveEffectData>;
        await ActiveEffect.create(effectData, {parent: actor})
    }

    public async removeActiveEffect(actor: Lvl0FoundryActor, type: 'effect', id: string | number) {
        let existingEffect = actor.effects.find(e => e.getFlag('core', 'statusId') === `lvl0-${type}-${id}`);
        if (existingEffect) {
            await existingEffect.delete();
        }
    }
}
