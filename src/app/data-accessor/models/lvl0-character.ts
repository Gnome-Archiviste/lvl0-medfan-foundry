import {JobDefinition, RaceDefinition, SpecialityDefinition} from '../../../repositories';
import {Statistics} from '../../shared/statistic-model';
import {Lvl0ActorEffect} from '../../../managers/effects';
import {Lvl0Item} from './lvl0-item';
import {GroupBy} from '../../shared/group-by';

export interface Lvl0Character {
    readonly name: string;
    readonly data: Lvl0CharacterData;
    readonly items: Lvl0Item[];
    readonly itemsByType: GroupBy<Lvl0Item, 'type'>;
}

export type Lvl0CharacterModifiers = { [key: string]: CharacterModifierInfo };

export interface Lvl0CharacterData {
    /**
     * @deprecated ComputedCharacterData not be accessed from there in angular
     */
    readonly computedData: ComputedCharacterData;
    readonly levelUpData: LevelUpData;
    readonly staticInventory: StaticInventoryData;
    readonly skills: { readonly [key: string]: SkillValue };
    readonly baseStats: Statistics;
    readonly modifiers: Lvl0CharacterModifiers;
    readonly health: { readonly min: number, max: number, readonly value: number };
    readonly mana: { readonly min: number, max: number, readonly value: number };
    readonly level: LevelValue;
    readonly experience: { readonly value: number };
    readonly job: JobData;
    readonly race: RaceData;
    readonly effects: { [key: string]: Lvl0ActorEffect };
    readonly specialities: { [key: string]: String };
}

export interface LevelValue {
    value: number
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

export interface RaceData {
    id: string;
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

export interface ComputedCharacterMagicArmorData {
    remainingArmorPoint: number;
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
