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
}
