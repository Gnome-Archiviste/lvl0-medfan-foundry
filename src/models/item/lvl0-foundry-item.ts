import {ScrollUtil, WandUtil} from 'managers/spell';
import {
    ItemDataConstructorData
} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/itemData';
import {container} from 'tsyringe';
import {Lvl0ItemScroll, Lvl0ItemWand} from './lvl0-item-types';

export class Lvl0FoundryItem extends Item {
    private readonly scrollUtil: ScrollUtil;
    private readonly wandUtil: WandUtil;

    constructor(
        data: ItemDataConstructorData,
        context: object
    ) {
        super(data, context);
        this.scrollUtil = container.resolve(ScrollUtil);
        this.wandUtil = container.resolve(WandUtil);
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
            await this.scrollUtil.useScroll(this as Lvl0ItemScroll);
        }
        if (this.data.type === 'wand') {
            await this.wandUtil.useWand(this as Lvl0ItemWand);
        }
    }
}

Hooks.on("createItem", async (document: Lvl0FoundryItem, options: object, userId: string) => {
    if (document.data.data.quantifiable) {
        await document.update({ data: {quantity: 1}});
    }
});

