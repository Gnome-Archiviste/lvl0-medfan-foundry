import {Lvl0ActorData} from './lvl0-actor-data';
import {Lvl0Actor} from './lvl0-actor';

declare global {
    interface DocumentClassConfig {
        Actor: typeof Lvl0Actor;
    }
}

declare global {
    interface DataConfig {
        Actor: Lvl0ActorData;
    }
}
