export const ActorBasicStatNamesList = ['phy', 'dex', 'int', 'cha', 'per',] as const;
export const ActorStatNamesList = [...ActorBasicStatNamesList, 'protection', 'health', 'mana', 'movement'] as const;
export type ActorBasicStatNames = typeof ActorBasicStatNamesList[number];
export type ActorStatNames = typeof ActorStatNamesList[number];
