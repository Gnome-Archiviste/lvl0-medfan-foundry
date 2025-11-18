import {Lvl0mfActorSheetData} from '../actor/lvl0-character-actor-sheet';

export interface Lvl0mfItemSheetData extends foundry.applications.sheets.ItemSheetV2.RenderContext {
    lvl0ItemId: string,
}

export class Lvl0ItemSheet extends foundry.applications.sheets.ItemSheetV2<Lvl0mfItemSheetData> {

    static DEFAULT_OPTIONS = {
        classes: ["lvl0mf", "sheet", "item"],
        position: {
            width: 500,
            height: 600,
        },
        actions: {},
        window: {
            resizable: true,
        },
    };

    async _prepareContext(
        options: foundry.applications.sheets.ActorSheetV2.RenderOptions & { isFirstRender: boolean }
    ): Promise<Lvl0mfItemSheetData> {
        const context = await super._prepareContext(options);

        let lvl0ItemId = this.document.lvl0Id;
        if (!lvl0ItemId) {
            throw new Error('Item is not linked to LVL0 character ' + this.document.toJSON());
        }

        return {
            ...context,
            lvl0ItemId: lvl0ItemId,
        };
    }

    async _onRender(context, options) {
        await super._onRender(context, options);
    }

    protected override async _renderHTML(
        context: Lvl0mfItemSheetData,
        options: foundry.applications.sheets.ActorSheetV2.RenderOptions,
    ): Promise<string> {
        return `<form class="sheet-item" autocomplete="off">
            <lvl0-item-editor item-id="${context.lvl0ItemId}"></lvl0-item-editor>
        </form>`
    }

    async _replaceHTML(
        result: string,
        content: HTMLElement,
        options: foundry.applications.sheets.ActorSheetV2.RenderOptions,
    ) {
        if (options.isFirstRender) {
            content.style.overflowY = 'auto';
            content.innerHTML = result;
        }
    }
}
