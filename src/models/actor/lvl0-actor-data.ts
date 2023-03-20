import {CharacterProperties, MonsterProperties} from './properties';

export type Lvl0ActorData =
    CharacterProperties |
    MonsterProperties

export type Lvl0ActorType = 'character' | 'monster' ;
