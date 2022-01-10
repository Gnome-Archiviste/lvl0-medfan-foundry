import {RolledSpellStat} from './spell-manager';
import {Lvl0ActorEffect} from '../effects/lvl0-actor-effect';

export interface SpellDefinition {
    id: string;
    icon: string;
    name: string;
    description: string;
    actions: { [actionName: string]: SpellActionDefinition };
    distance: SpellDefinitionDistance;
    duration: ComputableSpellValue | null;
    area: ComputableSpellValue | null;
    bonus: ComputableSpellValue | null;
    resilience: ComputableSpellValue | null;
    criticalSuccess: ComputableSpellValue | null;
    damage: SpellDamageDefinition | null;
    heal: SpellHealDefinition | null;
}

export interface SpellActionDefinition {
    name: string;
    type: 'addEffect' | 'heal';
    data: AddEffectActionDefinitionData;
}

export interface AddEffectActionDefinitionData {
    effectName: string;
    duration: ComputableSpellValue | null;
    modifiers: AddEffectActionModifierDefinition[];
}

export interface AddEffectActionModifierDefinition {
    stat: string | null;
    valueFormula: string | null;
}

export interface SpellDamageDefinition {
    rollFormula: string | null;
    element: string | null;
}

export interface SpellHealDefinition {
    rollFormula: string | null;
}

export interface SpellDefinitionDistance {
    type: 'self' | 'touch';
    formula?: string;
    value?: number;
    text?: string;
    unit?: string;
}

export interface ComputableSpellValue {
    formula: string;
    rollFormula: string;
    text: string;
    value: string;
    unit: string;

}

export interface ActorSpell {
    definition: SpellDefinition;
    id: string;
    icon: string;
    name: string;
    cost: number;
    description: string;
    distance?: string | RolledSpellStat;
    damage?: string | RolledSpellStat;
    bonus?: string | RolledSpellStat;
    healFormula?: string | RolledSpellStat;
    duration?: string | RolledSpellStat;
    heal?: string | RolledSpellStat;
    area?: string | RolledSpellStat;
    resilience?: string | RolledSpellStat;
    criticalSuccess?: string | RolledSpellStat;
    actions?: { [actionName: string]: ActorSpellActionDefinition };
}

export interface ActorSpellActionDefinition {
    name: string;
    type: 'addEffect' | 'heal';
    data: Lvl0ActorEffect | Lvl0HealActionData;
}

export interface Lvl0HealActionData {
}
