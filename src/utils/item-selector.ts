import {inject, singleton} from 'tsyringe';
import {Lvl0Item} from '../models/item';
import {DialogAwaiter, ItemSelectorDialog} from '../ui/dialog';

@singleton()
export class ItemSelector {

    constructor(
        @inject(DialogAwaiter) private readonly dialogAwaiter: DialogAwaiter
    ) {
    }

    async openItemSelector<T extends Lvl0Item>(items: T[], title: string): Promise<T | undefined> {
        return await this.dialogAwaiter.openAndWaitResult(ItemSelectorDialog, {
            items: items,
            title: title
        }) as T
    }
}
