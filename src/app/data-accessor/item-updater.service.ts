import {Lvl0Item} from './models/lvl0-item';

export abstract class ItemUpdaterService {
    abstract updateItem(itemId: string, diffObject: RecursivePartial<Lvl0Item>);
}
