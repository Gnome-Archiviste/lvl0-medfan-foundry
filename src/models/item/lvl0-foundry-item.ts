import {Lvl0FoundryActor} from '../actor';
import {
    ItemDataConstructorData
} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/itemData';

export class Lvl0FoundryItem extends Item {
    constructor(
        data: ItemDataConstructorData,
        context: object
    ) {
        super(data, context);
    }

    get lvl0Id() {
        if (this.isEmbedded && this.parent) {
            if (this.parent instanceof Lvl0FoundryActor) {
                return this.id + "@" + this.parent.documentName + ':' + this.parent.lvl0Id;
            } else {
                throw new Error('Unknown item parent type: ' + this.parent)
            }
        }
        return this.id;
    }
}

Hooks.on("createItem", async (document: Lvl0FoundryItem, options: object, userId: string) => {
    if (document.data.data.quantifiable) {
        await document.update({data: {quantity: 1}});
    }
});

