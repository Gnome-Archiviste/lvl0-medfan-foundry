import {assertIsCharacter} from 'models/actor';

export interface Lvl0mfActorSheetData extends foundry.applications.sheets.ActorSheetV2.RenderContext {
    lvl0CharacterId: string,
}

export class Lvl0CharacterActorSheet extends foundry.applications.sheets.ActorSheetV2<
    Lvl0mfActorSheetData
> {
    static DEFAULT_OPTIONS = {
        classes: ["lvl0mf", "sheet", "actor"],
        position: {
            width: 770,
            height: 800,
        },
        actions: {},
        window: {
            resizable: true,
        },
        dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}],
    };

    async _prepareContext(
        options: foundry.applications.sheets.ActorSheetV2.RenderOptions & { isFirstRender: boolean },
    ): Promise<Lvl0mfActorSheetData> {
        const context = await super._prepareContext(options);

        let lvl0ActorId = this.document.lvl0Id;
        if (!lvl0ActorId) {
            throw new Error('Actor is not linked to LVL0 character ' + this.document.toJSON());
        }

        assertIsCharacter(this.document);

        return {
            ...context,
            lvl0CharacterId: lvl0ActorId,
        };
    }

    protected override async _renderHTML(
        context: Lvl0mfActorSheetData,
        options: foundry.applications.sheets.ActorSheetV2.RenderOptions,
    ): Promise<string> {
        return `<form class="lvl0mf sheet actor" autocomplete="off">
            <lvl0-character-sheet character-id="${context.lvl0CharacterId}"></lvl0-character-sheet>
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
