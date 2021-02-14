export class Lvl0mfItemSheet extends ItemSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["lvl0mf", "sheet", "item"],
            template: "systems/lvl0mf-sheet/templates/items/item-sheet.hbs",
            blockFavTab: true,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    /** @override */
    getData(options) {
        let data = super.getData(options);
        data.isOwned = this.entity.isOwned;
        return data;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        if (!this.options.editable) return;
        html.find("button[data-lvl0-action='addItemModifier']").click(ev => this._onAddModifier(ev));
        html.find(".delete-modifier").click(ev => this._onRemoveModifier(ev));
    }

    /** @param {MouseEvent} ev */
    _onRemoveModifier(ev) {
        let modifierId = +$(ev.target).parents('.modifier-value').data('modifier-id');
        let modifiers = this.item.data.data.modifiers || {};
        let newModifiers = {...modifiers, ['-='+modifierId]: null};
        this.item.update({data: {modifiers: newModifiers}});
    }

    _onAddModifier(ev) {
        let modifiers = this.item.data.data.modifiers || {};
        let nextId = (Object.keys(modifiers).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        this.item.update({data: {modifiers: {...modifiers, [nextId]: {stat: 'phy', value: 1}}}});
    }
}
