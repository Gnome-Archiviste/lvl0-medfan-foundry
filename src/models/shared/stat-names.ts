export const ActorBasicStatNamesList = ['phy', 'dex', 'int', 'cha', 'per',] as const;
export const ActorStatNamesList = [...ActorBasicStatNamesList, 'protection', 'health', 'mana', 'movement'] as const;
export type ActorBasicStatNames = typeof ActorBasicStatNamesList[number];
export type ActorStatNames = typeof ActorStatNamesList[number];

export function isActorBasicStatName(value: string): value is ActorBasicStatNames {
    return ['phy', 'dex', 'int', 'cha', 'per',].includes(value);
}

export function isActorStatName(value: string): value is ActorStatNames {
    return [...ActorBasicStatNamesList, 'protection', 'health', 'mana'].includes(value);
}
