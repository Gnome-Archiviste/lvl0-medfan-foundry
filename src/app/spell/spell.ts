import {SpellDefinition} from '../../repositories';
import {Lvl0ActorEffect} from '../data-accessor/actor-effect.service';
import {ChatRoll, IRoll} from '../shared/roll';

export type Spell = {
    readonly definition: SpellDefinition;
    readonly context: SpellContext;
    readonly computedData: ComputedSpellDataBeforeRoll;
}

export type RolledSpell = {
    readonly definition: SpellDefinition;
    readonly context: RollSpellContext;
    readonly data: RolledSpellData;
}

export type RollSpellContext = {
    arcaneLevel: number;
    epicFail?: boolean;
    criticalSuccess?: boolean;
}

export class SpellContext {
    arcaneLevel: number;
}

export type ChatSpell =  {
    readonly spellId: string;
    readonly context: RollSpellContext;
    readonly data: ChatSpellData;
}

export type SpellAction = AddEffectSpellAction | HealSpellAction;

export interface AddEffectSpellAction {
    name: string;
    type: 'addEffect';
    data: Lvl0ActorEffect;
}

export interface HealSpellAction {
    name: string;
    type: 'heal';
    data: Lvl0HealActionData;
}

export interface Lvl0HealActionData {
    value: number;
}

export class ComputedSpellDataBeforeRoll {
    effectiveCost: number;
    description?: string;
    distance?: string | RollableSpellValue;
    damage?: string | RollableSpellValue;
    bonus?: string | RollableSpellValue;
    duration?: string | RollableSpellValue;
    heal?: string | RollableSpellValue;
    area?: string | RollableSpellValue;
    resilience?: string | RollableSpellValue;
    criticalSuccess?: string | RollableSpellValue;
}

export type RolledSpellValue = {
    roll: IRoll;
    unit?: string;
    element?: string;
} | {text: string}

export type ChatSpellData = {
    actions?: SpellAction[];
    effectiveCost: number;
    description?: string;
    distance?: ChatSpellValue;
    damage?: ChatSpellValue;
    bonus?: ChatSpellValue;
    duration?: ChatSpellValue;
    heal?: ChatSpellValue;
    area?: ChatSpellValue;
    resilience?: ChatSpellValue;
    criticalSuccess?: ChatSpellValue;
}

export type ChatSpellValue = {
    roll: ChatRoll;
    unit?: string;
    element?: string;
} | {text: string}


export type RolledSpellData = {
    actions?: SpellAction[];
    effectiveCost: number;
    description?: string;
    distance?: RolledSpellValue;
    damage?: RolledSpellValue;
    bonus?: RolledSpellValue;
    duration?: RolledSpellValue;
    heal?: RolledSpellValue;
    area?: RolledSpellValue;
    resilience?: RolledSpellValue;
    criticalSuccess?: RolledSpellValue;
}

export class RollableSpellValue {
    constructor(
        public readonly formula: string,
        public readonly element?: string,
        public readonly unit?: string,
    ) {
    }
}
