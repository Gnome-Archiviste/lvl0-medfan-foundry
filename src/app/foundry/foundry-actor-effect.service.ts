import {ActorEffectService, Lvl0ActorEffect} from '../data-accessor/actor-effect.service';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';
import {Lvl0FoundryActor} from '../../models/actor';
import {ActiveEffectData} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs';
import {Injectable} from '@angular/core';

@Injectable()
export class FoundryActorEffectService extends ActorEffectService {
    constructor(
        private readonly actorUpdaterService: ActorUpdaterService,
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver
    ) {
        super();
    }

    async applyEffect(actorId: string, effect: Lvl0ActorEffect): Promise<void> {
        let foundryActor = this.foundryLvl0IdResolver.getRequiredActorFromLvl0Id(actorId);
        let actorData = foundryActor.data.data;
        let nextId = (Object.keys(actorData.effects || {}).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        await foundryActor.update({data: {effects: {[nextId]: effect}}}, {diff: true});
        await this.replaceActiveEffect(foundryActor, 'effect', nextId, {icon: effect.icon, label: effect.effectName});
        ui.notifications?.info('Effet ' + effect.effectName + ' ajouté');
    }

    removeEffect(actorId: string, effectId: string) {
        this.actorUpdaterService.updateActor(actorId, {
            data: {
                effects: {
                    ['-=' + effectId]: null as any
                }
            }
        });
        let foundryActor = this.foundryLvl0IdResolver.getRequiredActorFromLvl0Id(actorId);
        this.removeActiveEffect(foundryActor, 'effect', effectId)
    }

    updateEffect(actorId: string, effectId: string, diffObject: RecursivePartial<Lvl0ActorEffect>): void {
        this.actorUpdaterService.updateActor(actorId, {
            data: {
                effects: {
                    [effectId]: diffObject
                }
            }
        });
    }

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
