import {assertIsCharacter, Lvl0FoundryActor} from 'models/actor';

export interface Lvl0mfActorSheetData extends ActorSheet.Data {
    lvl0CharacterId: string,
}

export class Lvl0CharacterActorSheet<Options extends ActorSheet.Options = ActorSheet.Options> extends ActorSheet<Options, Lvl0mfActorSheetData> {
    constructor(actor: Lvl0FoundryActor, options: Partial<Options>) {
        super(actor, options);
    }

    async getData(options?: Partial<Options>): Promise<Lvl0mfActorSheetData> {
        assertIsCharacter(this.actor);

        const context = await super.getData(options);
        return {
            ...context,
            lvl0CharacterId: this.actor.lvl0Id,
        } as Lvl0mfActorSheetData
    }


    override render(force?: boolean, options?: Application.RenderOptions<Options>): this {
        if (this.rendered)
            return this;
        return super.render(force, options);
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    static get defaultOptions(): ActorSheet.Options {
        return {
            ...super.defaultOptions,
            classes: ["lvl0mf", "sheet", "actor"],
            template: "systems/lvl0mf-sheet/ui/sheets/actor/lvl0-character-actor-sheet.hbs",
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
            scrollY: [".stats", ".items", ".inventory"],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        };
    }
}
