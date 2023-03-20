import {Lvl0Item} from './lvl0-item';

declare global {
    interface DocumentClassConfig {
        Item: typeof Lvl0Item;
    }
}

declare global {
    interface DataConfig {
        Item: Lvl0ItemData;
    }
}
