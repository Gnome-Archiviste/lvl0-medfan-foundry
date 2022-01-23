import {Statistics} from './shared-properties-data';
import {Lvl0ActorEffect} from 'managers/effects';

export interface Lvl0ActorMonsterData {
    baseStats: Statistics;
    health: { min: number, max: number, value: number };
    mana: { min: number, max: number, value: number };
    effects: { [key: string]: Lvl0ActorEffect };
}
