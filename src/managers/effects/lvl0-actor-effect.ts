export interface Lvl0ActorEffect {
    duration: string;
    effectName: string;
    modifiers: Lvl0ActorEffectModifier[];
}

export interface Lvl0ActorEffectModifier {
    skill?: string;
    stat?: string;
    value: number;
}
