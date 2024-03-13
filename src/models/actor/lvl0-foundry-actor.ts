import {
    BaseCharacterDataComputer,
    ClutterCharacterDataComputer,
    HealthManaDataComputer,
    LevelingCharacterDataComputer,
    MagicalArmorDataComputer,
    MagicCharacterDataComputer,
    SkillsCharacterDataComputer,
    SpecialityCharacterDataComputer,
    StatsCharacterDataComputer
} from "./actor-data-computers/character";
import { ActorDataComputer } from './actor-data-computers';
import { container } from 'tsyringe';
import {
    ActorDataConstructorData
} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/actorData';
import { InitializedGame } from '../misc/game';

container.register("ActorDataComputer", { useClass: BaseCharacterDataComputer });
container.register("ActorDataComputer", { useClass: LevelingCharacterDataComputer });
container.register("ActorDataComputer", { useClass: SpecialityCharacterDataComputer });
container.register("ActorDataComputer", { useClass: SkillsCharacterDataComputer });
container.register("ActorDataComputer", { useClass: StatsCharacterDataComputer });
container.register("ActorDataComputer", { useClass: MagicCharacterDataComputer });
container.register("ActorDataComputer", { useClass: HealthManaDataComputer });
container.register("ActorDataComputer", { useClass: ClutterCharacterDataComputer });
container.register("ActorDataComputer", { useClass: MagicalArmorDataComputer });


export class Lvl0FoundryActor extends Actor {
    private readonly game: InitializedGame;

    constructor(
        data: ActorDataConstructorData,
        context?: object
    ) {
        super(data, context);
        this.game = container.resolve(InitializedGame);
    }

    get lvl0Id() {
        if (this.isToken)
            return this.id + "@" + this.token?.id;
        return this.id;
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();

        for (let actorDataComputer of container.resolveAll<ActorDataComputer>("ActorDataComputer")) {
            if (actorDataComputer.isAvailableFor(this.data.type)) {
                actorDataComputer.compute(this);
            }
        }
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

