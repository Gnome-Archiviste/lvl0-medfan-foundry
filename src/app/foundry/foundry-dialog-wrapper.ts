export type DialogResultCallback<TResult> = (result: TResult | undefined) => void;

export class FoundryDialogBase<TResult> extends Application {
    constructor(
        private readonly componentSelector: string,
        private readonly dialogDataId: string,
        private readonly result: DialogResultCallback<TResult>,
        private readonly dialogParameter: {id?: string, title: string},
    ) {
        super();
        this.options.id = this.dialogParameter.id || this.randomId();
        this.options.title = this.dialogParameter.title;
    }

    override activateListeners(html: JQuery) {
        super.activateListeners(html);

        html.get()[0].addEventListener('close', async (ev: CustomEvent<TResult>) => {
            let result = ev.detail;
            this.result(result);
            await this.close({selected: true});
        });
    }

    override close(options?: Application.CloseOptions & { selected: boolean }) {
        if (!options?.selected) {
            this.result(undefined);
        }
        return super.close(options);
    }

    protected async _onKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            await this.close();
        }
    }

    getData(options?: Partial<ApplicationOptions>): object | Promise<object> {
        return {
            ...super.getData(options),
            componentSelector: this.componentSelector,
            dialogDataId: this.dialogDataId
        };
    }

    static get defaultOptions(): ApplicationOptions {
        return {
            ...super.defaultOptions,
            template: "systems/lvl0mf-sheet/ui/dialog/angular-dialog.hbs",
            popOut: true,
            resizable: true,
            width: 450,
            height: 450
        };
    }

    private randomId(): string {
        return Math.random().toString(36).substring(5) + Math.random().toString(36).substring(5);
    }
}
