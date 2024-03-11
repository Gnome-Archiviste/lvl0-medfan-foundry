import {Lvl0Item} from './models/lvl0-item';

export abstract class ItemUpdaterService {
    abstract updateItem<T extends Lvl0Item>(itemId: string, diffObject: RecursivePartial<T>)
    abstract updateItem(itemId: string, diffObject: RecursivePartial<Lvl0Item>);
    abstract changeQuantity<T extends Lvl0Item>(item: T, relativeQuantityChange: number) : Promise<void>;
}
