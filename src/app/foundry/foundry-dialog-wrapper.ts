import {Lvl0mfItemSheetData} from '../../ui/sheets/item/lvl0-item-sheet';

export type DialogResultCallback<TResult> = (result: TResult | undefined) => void;

export class FoundryDialogBase<TResult> extends foundry.applications.api.ApplicationV2 {
    #element: HTMLElement;

    static DEFAULT_OPTIONS = {
        position: {
            width: 500,
            height: 470,
        },
        actions: {},
        window: {
            resizable: true,
            popOut: true,
        },
    };

    constructor(
        private readonly componentSelector: string,
        private readonly dialogDataId: string,
        private readonly result: DialogResultCallback<TResult>,
        private readonly dialogParameter: { id?: string, title: string },
    ) {
        super({
            id: dialogParameter.id || FoundryDialogBase.randomId(),
        });
        this.#element = document.createElement(componentSelector);
        this.#element.setAttribute('dialog-data-id', dialogDataId);
        this.#element.addEventListener('close', async (ev: CustomEvent<TResult>) => {
            let result = ev.detail;
            this.result(result);
            await this.close({submitted: true});
        });
    }

    override get title(): string {
        return this.dialogParameter.title;
    }

    protected override async _renderHTML(
        context: Lvl0mfItemSheetData,
        options: foundry.applications.api.ApplicationV2.RenderOptions,
    ): Promise<string> {
        return ``;
    }

    async _replaceHTML(
        result: string,
        content: HTMLElement,
        options: foundry.applications.api.ApplicationV2.RenderOptions,
    ) {
        if (options.isFirstRender) {
            content.style.overflowY = 'auto';
            content.appendChild(this.#element);
        }
    }

    protected _tearDown(
        options: foundry.applications.api.ApplicationV2.ClosingOptions,
    ) {
        if (!options.submitted) {
            this.result(undefined);
        }

        super._tearDown(options);
    }

    private static randomId(): string {
        return Math.random().toString(36).substring(5) + Math.random().toString(36).substring(5);
    }
}
