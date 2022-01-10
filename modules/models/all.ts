
export interface Lvl0MonsterData {
}


export interface ItemModifierInfo {
    stat: 'protection' | 'cha' | 'int' | 'per' | 'phy' | 'dex' | 'health' | 'mana';
    value: number;
}


export interface SkillDefinition {
    name: string;
    stat: string;
    script: SkillScriptDefinition;
}

export interface SkillScriptDefinition {
    name: string;
    data: Object;
}

