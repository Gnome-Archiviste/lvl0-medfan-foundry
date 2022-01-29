import {Lvl0ActorEffect} from 'managers/effects';
import {Statistics} from './shared-properties-data';
import {JobDefinition, RaceDefinition, SpecialityDefinition} from 'repositories';

export interface Lvl0ActorCharacterData {
    computedData: ComputedCharacterData;
    levelUpData: LevelUpData;
    staticInventory: StaticInventoryData;
    skills: { [key: string]: SkillValue };
    baseStats: Statistics;
    modifiers: { [key: string]: CharacterModifierInfo };
    health: { min: number, max: number, value: number };
    mana: { min: number, max: number, value: number };
    level: { value: number };
    experience: { value: number };
    job: JobData;
    race: RaceData;
    effects: { [key: string]: Lvl0ActorEffect };
    specialities: { [key: string]: String };
}

export interface SkillValue {
    value: number;
    master: boolean;
    prodigy: boolean;
    manualMode?: boolean;
}

export interface CharacterModifierInfo {
    isPermanent: boolean;
    stat: 'protection' | 'cha' | 'int' | 'per' | 'phy' | 'dex' | 'health' | 'mana';
    value: number;
    name: string;
}

export interface JobData {
    id: string;
    specialization: string;
    specializations: string[];
}

export interface ComputedCharacterData {
    bases: ComputedCharacterBaseData;
    leveling: ComputedCharacterLevelingData;
    skills: ComputedCharacterSkillsData;
    stats: ComputedCharacterStatsData;
    magic: ComputedCharacterMagicData;
    clutter: ComputedCharacterClutterData;
    speciality: ComputedCharacterSpecialityData;
    magicArmor?: ComputedCharacterMagicArmorData;
}

export interface RaceData {
    id: string;
}

export interface ComputedCharacterMagicArmorData {
    remainingArmorPoint: number;
}

export interface StaticInventoryData {
    rationCount: number;
    torchCount: number;
    money: number;
    money100: number;
    money500: number;
    money1000: number;
}

export interface LevelUpData {
    levels: { [key: number]: LevelData };
}

export interface LevelData {
    health: number;
    mana: number;
    money: number;
    additionalStat?: string;
}


export interface ComputedCharacterSkillsData {
    maximumSkillPoints: { [key: string]: number };
    availableSkillPoints: { [key: string]: number };
    extraSkills: string[];
    skillModifiers: { [key: string]: number };
}

export interface ComputedCharacterSpecialityData {
    maxSpecialities: number;
    canSelectNewSpeciality: boolean;
    knownSpecialities: SpecialityDefinition[];
}

export interface ComputedCharacterClutterData {
    totalSpace: number;
    usedSpace: number;
    rowCount: number;
    columnCount: number;
    columnsPhy: number[];
    usedCells: { [key: string]: string };
}

export interface ComputedCharacterBaseData {
    race?: RaceDefinition;
    job?: JobDefinition;
}

export interface ComputedCharacterMagicData {
    arcaneLevel: number;
}

export interface ComputedCharacterStatsData {
    baseStats: ComputedCharacterBaseStatsData;
    armor: { value: number };
    movement: { value: number };
}

export interface ComputedCharacterBaseStatsData {
    phy: { value: number, bonus: number };
    dex: { value: number, bonus: number, armor: number };
    int: { value: number, bonus: number };
    cha: { value: number, bonus: number };
    per: { value: number, bonus: number };
}

export interface ComputedCharacterLevelingData {
    nextLevelExperience: number;
    maximumSkillLevel: number;
    canUseMaster: boolean;
    canUseProdigy: boolean;
}
