import {ActorEffectService, Lvl0ActorEffect} from '../data-accessor/actor-effect.service';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';
import {Lvl0FoundryActor} from '../../models/actor';
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
        let actorData = foundryActor.system;
        let nextId = (Object.keys(actorData.effects || {}).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        await foundryActor.update({system: {effects: {[nextId.toString()]: effect}}}, {diff: true});
        await this.replaceActiveEffect(foundryActor, 'effect', nextId, {img: effect.icon, name: effect.effectName});
    }

    removeEffect(actorId: string, effectId: string) {
        this.actorUpdaterService.updateActor(actorId, {
            system: {
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
            system: {
                effects: {
                    [effectId]: diffObject
                }
            }
        });
    }

    public async replaceActiveEffect(actor: Lvl0FoundryActor, type: 'effect', id: string | number, data: ActiveEffect.CreateData): Promise<void> {
        await this.removeActiveEffect(actor, type, id);

        const effectData = {
            ...data,
            statuses: [`lvl0-${type}-${id.toString()}`],
            flags: {
                ['lvl0mf-sheet.statusId']: `lvl0-${type}-${id.toString()}`,
            }
        } as ActiveEffect.CreateData;
        await ActiveEffect.implementation.create(effectData, {parent: actor})
    }

    public async removeActiveEffect(actor: Lvl0FoundryActor, type: 'effect', id: string | number) {
        let existingEffect = actor.effects.find(e => e.getFlag('lvl0mf-sheet', 'statusId') === `lvl0-${type}-${id}`);
        if (existingEffect) {
            await existingEffect.delete();
        }
    }
}
