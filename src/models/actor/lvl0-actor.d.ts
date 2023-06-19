import {Lvl0ActorData} from './lvl0-actor-data';
import {Lvl0FoundryActor} from './lvl0-foundry-actor';

declare global {
    interface DocumentClassConfig {
        Actor: typeof Lvl0FoundryActor;
    }
}

declare global {
    interface DataConfig {
        Actor: Lvl0ActorData;
    }
}
