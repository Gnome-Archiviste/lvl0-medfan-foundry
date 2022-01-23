import {ScrollUtil} from '../../managers/spell/scroll-util';
import {
    ItemDataConstructorData
} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/itemData';
import {container} from 'tsyringe';

declare global {
    interface DocumentClassConfig {
        Item: typeof Lvl0Item;
    }
}

export class Lvl0Item extends Item {
    private readonly scrollUtil: ScrollUtil;

    constructor(
        data: ItemDataConstructorData,
        context: object
    ) {
        super(data, context);
        this.scrollUtil = container.resolve(ScrollUtil);
    }

    get actionnable(): boolean {
        if (this.data.type === 'wand' && this.data.data.charge > 0 && this.data.data.spell) {
            return true;
        }
        if (this.data.type === 'scroll' && this.data.data.spell) {
            return true;
        }
        return false;
    }

    async use(): Promise<void> {
        if (this.data.type === 'scroll') {
            await this.scrollUtil.useScroll(this);
        }
    }
}

Hooks.on("createItem", async (document: Lvl0Item,  options: object, userId: string) => {
    if (document.data.data.quantifiable) {
        await document.update({ data: {quantity: 1}});
    }
});

