import {Lvl0FoundryItem} from 'models/item';

export class Lvl0ItemSheet extends ItemSheet {
    constructor(item: Lvl0FoundryItem, options: Partial<DocumentSheetOptions<Item>>) {
        super(item, options);
    }

    override getData(options?: Partial<DocumentSheetOptions<Item>>) {
        return {
            ...super.getData(options),
            lvl0ItemId: this.item.lvl0Id,
        }
    }

    override activateListeners(html: JQuery) {
        super.activateListeners(html);
    }

    override render(force?: boolean, options?: Application.RenderOptions<DocumentSheetOptions<Item>>): this {
        if (this.rendered)
            return this;
        return super.render(force, options);
    }

    static get defaultOptions(): DocumentSheetOptions<Item> {
        return {
            ...super.defaultOptions,
            classes: ["lvl0mf", "sheet", "item"],
            template: "systems/lvl0mf-sheet/ui/sheets/item/lvl0-item-sheet.hbs",
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        };
    }
}
