import {CharacterProperties} from './character-properties';

type Lvl0ActorData = CharacterProperties

declare global {
    interface DataConfig {
        Actor: Lvl0ActorData;
    }
}
