import {
    ActorDataConstructorData
} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/actorData';
import { InitializedGame } from '../misc/game';

export class Lvl0FoundryActor extends Actor {
    private readonly game: InitializedGame;

    constructor(
        data: ActorDataConstructorData,
        context?: object
    ) {
        super(data, context);
        this.game = game as any;
    }

    get lvl0Id() {
        if (this.isToken)
            return this.id + "@" + this.token?.id;
        return this.id;
    }

    // Used by old macro
    async useSpeciality(specialityName: string): Promise<void> {
        rollSpecialityManager.useSpeciality(this.lvl0Id!, specialityName);
    }

    // FIXME: Not call anymore
    async addInitialInventory(): Promise<void> {
        await this.update({
            data: {
                staticInventory: { rationCount: 2, torchCount: 2 }
            }
        }, { diff: true });

        let table = this.game.tables.contents.find(s => s.name === "Objets de base") as RollTable;
        if (!table) {
            return;
        }

        for (let resultElement of table.data.results) {
            if (!resultElement.data.resultId)
                continue;
            let itemData = this.game.items.get(resultElement.data.resultId);
            if (!itemData)
                continue;

            await this.createEmbeddedDocuments('Item', [itemData.toObject()], {});
        }
    }
}

