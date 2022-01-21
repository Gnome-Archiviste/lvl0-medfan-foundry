import {CharacterProperties} from './properties/character-properties';
import {MonsterProperties} from './properties/monster-properties';

export type Lvl0ActorData =
    CharacterProperties |
    MonsterProperties

export type Lvl0ActorType = 'character' | 'monster' ;

declare global {
    interface DataConfig {
        Actor: Lvl0ActorData;
    }
}
