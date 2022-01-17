import {ScrollHelper} from './managers/spell/scroll-helper';

declare global {
    interface DocumentClassConfig {
        Item: typeof Lvl0Item;
    }
}


/**
 * @extends {Item}
 */
export class Lvl0Item extends Item {
    /**
     * Augment the basic Item data model with additional dynamic data.
     */
    prepareDerivedData() {
        super.prepareDerivedData();

        // Get the Item's data
        const itemData = this.data;
        const actorData = this.actor ? this.actor.data : {};
        const data = itemData.data;
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
            await ScrollHelper.useScroll(this);
        }
    }
}
