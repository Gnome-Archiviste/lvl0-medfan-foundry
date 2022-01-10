import {JobRequirement} from './job-requirement';

export interface JobDefinition {
    name: string;
    spellCategory?: string;
    hasJobSpecialization?: boolean;
    maxSpecializations: number | null;
    specializations?: {[techName: string]: string};
    healthLevels: { value: number, useStatValue: string, diceCount: number }[];
    manaLevels: { value: number, useStatValue: string, diceCount: number }[];
    arcaneLevels: number[];
    requirements: JobRequirement[];
    specialityLevels: number[];
}
