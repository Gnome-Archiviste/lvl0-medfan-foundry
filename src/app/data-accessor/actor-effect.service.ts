import {Lvl0ActorEffect} from '../../managers/effects';

export abstract class ActorEffectService {
    abstract removeEffect(actorId: string, effectId: string);
    abstract updateEffect(actorId: string, effectId: string, diffObject: RecursivePartial<Lvl0ActorEffect>);
}
