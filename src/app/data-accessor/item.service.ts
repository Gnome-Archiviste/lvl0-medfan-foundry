import {Lvl0Item} from './models/lvl0-item';

export abstract class ItemService {
    abstract useItem(lvl0Item: Lvl0Item): Promise<void>;

    abstract shareItem(lvl0Item: Lvl0Item): Promise<void>;

    abstract editItem(lvl0Item: Lvl0Item): Promise<void>;

    abstract deleteItem(lvl0Item: Lvl0Item): Promise<void>;
}
