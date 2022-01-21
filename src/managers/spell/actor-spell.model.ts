import {RolledSpellStat} from './spell-manager';
import {Lvl0ActorEffect} from '../effects/lvl0-actor-effect';
import {SpellDefinition} from '../../repositories/data/spells';

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
    actions?: { [actionName: string]: ActorSpellAction };
}

export type ActorSpellAction = AddEffectActorSpellAction | HealActorSpellAction;

export interface AddEffectActorSpellAction {
    name: string;
    type: 'addEffect';
    data: Lvl0ActorEffect;
}

export interface HealActorSpellAction {
    name: string;
    type: 'heal';
    data: Lvl0HealActionData;
}

export interface Lvl0HealActionData {
}
