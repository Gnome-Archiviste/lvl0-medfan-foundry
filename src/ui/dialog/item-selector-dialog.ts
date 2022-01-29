import {inject, injectable} from 'tsyringe';
import {DialogBase, DialogResultCallback} from './dialog-base';
import {Lvl0Item} from 'models/item';

export interface ItemSelectorDialogData {
    items: Lvl0Item[],
    title: string,
}

@injectable()
export class ItemSelectorDialog extends DialogBase<ItemSelectorDialogData, Lvl0Item> {
    private selectedItemId?: string | null = undefined;

    constructor(
        @inject("DIALOG_DATA") dialogData: ItemSelectorDialogData,
        @inject("DIALOG_RESULT") result: DialogResultCallback<Lvl0Item>,
    ) {
        super(dialogData, result);
        if (this.dialogData.items[0]) {
            this.selectedItemId = this.dialogData.items[0].id;
        }
    }

    override get title(): string {
        return this.dialogData.title;
    }

    override getData(options?: Partial<ApplicationOptions>): object | Promise<object> {
        return {
            ...super.getData(options),
            selectedItemId: this.selectedItemId,
            items: this.dialogData.items,
            ready: !!this.selectedItemId
        };
    }

    protected override getResult(): Lvl0Item | undefined {
        return this.dialogData.items.find(i => i.id === this.selectedItemId);
    }

    override activateListeners(html: JQuery): void {
        super.activateListeners(html);

        html.find('[data-select-item]').on('click', ev => {
            this.selectItem(ev.currentTarget.dataset.itemId);
        });
    }

    private selectItem(selectedItemId?: string | null) {
        this.selectedItemId = selectedItemId;
        this.render(true)
    }

    static get defaultOptions(): ApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "itemSelector",
            template: "systems/lvl0mf-sheet/ui/dialog/item-selector-dialog.hbs",
            popOut: true,
            width: 500,
            height: 600
        };
    }
}
