export interface Lvl0ActorEffect {
    duration: string;
    effectName: string;
    icon: string;
    modifiers: Lvl0ActorEffectModifier[];
    magicArmor?: Lvl0ActorEffectArmor;
}

export interface Lvl0ActorEffectModifier {
    skill?: string;
    stat?: string;
    value: number;
}

export interface Lvl0ActorEffectArmor {
    totalArmorPoint: number;
    remainingArmorPoint: number;
}

export abstract class ActorEffectService {
    abstract applyEffect(actorId: string, effect: Lvl0ActorEffect): Promise<void>;

    abstract removeEffect(actorId: string, effectId: string);

    abstract updateEffect(actorId: string, effectId: string, diffObject: RecursivePartial<Lvl0ActorEffect>);
}
