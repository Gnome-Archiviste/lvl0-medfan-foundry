import {singleton} from 'tsyringe';
import {Lvl0Item} from '../models/item';

@singleton()
export class ItemUtil {
    async updateQuantity(item: Lvl0Item, quantity: number): Promise<void> {
        if (quantity < 0 && item.data.data.quantity + quantity <= 0) {
            await item.delete();
        } else {
            await item.update({
                data: {
                    quantity: item.data.data.quantity + quantity
                }
            })
        }
    }
}
