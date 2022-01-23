import {CharacterProperties, MonsterProperties} from './properties';

export type Lvl0ActorData =
    CharacterProperties |
    MonsterProperties

export type Lvl0ActorType = 'character' | 'monster' ;

declare global {
    interface DataConfig {
        Actor: Lvl0ActorData;
    }
}
