import {Statistics} from '../../../app/shared/statistic-model';
import {Lvl0ActorEffect} from '../../../app/data-accessor/actor-effect.service';

export interface Lvl0ActorMonsterData {
    baseStats: Statistics;
    health: { min: number, max: number, value: number };
    mana: { min: number, max: number, value: number };
    effects: { [key: string]: Lvl0ActorEffect };
}
