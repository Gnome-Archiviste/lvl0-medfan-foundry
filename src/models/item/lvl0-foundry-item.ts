import {Lvl0FoundryActor} from '../actor';

export class Lvl0FoundryItem<SubType extends Item.ConfiguredSubType = Item.ConfiguredSubType> extends Item<SubType> {
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

Hooks.on("createItem", async (document, options, userId) => {
    if (document.system.quantifiable) {
        await document.update({system: {quantity: 1}});
    }
});
