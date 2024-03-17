import {JobDefinition, RaceDefinition, SpecialityDefinition} from '../../../repositories';
import {Statistics} from '../../shared/statistic-model';
import {Lvl0Item} from './lvl0-item';
import {GroupBy} from '../../shared/group-by';
import {ActorBasicStatNames, ActorStatNames} from '../../../models/shared';
import {Lvl0ActorEffect} from '../actor-effect.service';

export interface Lvl0Character {
    readonly id: string
    readonly name: string;
    readonly system: Lvl0CharacterData;
    readonly items: Lvl0Item[];
    readonly itemsByType: GroupBy<Lvl0Item, 'type'>;
    readonly img: string | null;
}

export type Lvl0CharacterModifiers = { [key: string]: CharacterModifierInfo };


export interface Lvl0CharacterData {
    /**
     * @deprecated ComputedCharacterData not be accessed from there in angular
     */
    readonly computedData: ComputedCharacterData;
    readonly levelUpData: LevelUpData;
    readonly staticInventory: Partial<StaticInventoryData>;
    readonly skills: CharacterSkillPoints;
    readonly usedSkillMastery?: Record<string, Record<string, boolean>>;
    readonly usedSkillProdigy?: Record<string, Record<string, boolean>>;
    // Skill points not yet validated during level-up phase
    readonly pendingSkills?: CharacterPendingSkillPoints;
    readonly baseStats: Statistics;
    readonly modifiers: Lvl0CharacterModifiers;
    readonly health: { readonly min: number, max: number, readonly value: number };
    readonly mana: { readonly min: number, max: number, readonly value: number };
    readonly level: LevelValue;
    readonly experience: { readonly value: number };
    readonly size: { readonly value: number };
    readonly age: { readonly value: number };
    readonly job: JobData;
    readonly race: RaceData;
    readonly effects: CharacterEffects;
    readonly specialities: CharacterSpecialities;
    readonly notes: CharacterNote;
}

export type CharacterNote = { content: string, mode: 'markdown' | 'html' };
export type CharacterEffects = { [key: string]: Lvl0ActorEffect };
export type CharacterSkillPoints = { readonly [categoryId: string]: { [id: string]: SkillValue } };
export type CharacterPendingSkillPoints = { readonly [categoryId: string]: { [id: string]: PendingSkillValue } };
export type CharacterSpecialities = { readonly [key: string]: string };

export type CharacterSpeciality = {
    entityId: string;
    speciality: SpecialityDefinition;
}

export type CharacterSpecialitiesInfo = {
    maxSpecialities: number;
    canSelectNewSpeciality: boolean;
    specialities: CharacterSpeciality[];
}

export interface LevelValue {
    value: number
}

export interface PendingSkillValue {
    value: number;
    master: boolean;
    prodigy: boolean;
}

export interface SkillValue {
    value: number;
    master: boolean;
    prodigy: boolean;
    manualMode?: boolean;
}

export interface ActiveSkillValue {
    value: number;
    master: boolean;
    prodigy: boolean;
    manualMode?: boolean;
    masterUsed: boolean;
    prodigyUsed: boolean;
    successValue: number;
}

export interface CharacterModifierInfo {
    isPermanent: boolean;
    stat: ActorStatNames;
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
    type?: string;
}

export interface StaticInventoryData {
    rationCount: number;
    torchCount: number;
    money: number;
    money100: number;
    money500: number;
    money1000: number;
}

export type LevelUpData = { [key: number]: LevelData }

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
    additionalStat?: ActorBasicStatNames;
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
