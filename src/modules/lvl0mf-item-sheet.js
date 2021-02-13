export class Lvl0mfItemSheet extends ItemSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["lvl0mf", "sheet", "item"],
            template: "systems/lvl0mf-sheet/templates/lvl0mf-item-sheet.hbs",
            blockFavTab: true,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        if (!this.options.editable) return;
        html.find("button[data-lvl0-action='addItemModifier']").click(ev => this._onAddModifier(ev));
    }

    _onAddModifier(ev) {
        this.item.update({data: {modifiers: [...this.item.data.data.modifiers, {stat: 'phy', value: 1}]}});
    }
}
