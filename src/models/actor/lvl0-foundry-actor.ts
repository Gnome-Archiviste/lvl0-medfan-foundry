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
import {
    DialogAwaiter,
    GenerateMissingLevelUpDataDialog,
    GenerateMissingLevelUpDataDialogData,
} from "ui/dialog";
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
    private readonly dialogAwaiter: DialogAwaiter;
    private readonly game: InitializedGame;

    constructor(
        data: ActorDataConstructorData,
        context?: object
    ) {
        super(data, context);
        this.dialogAwaiter = container.resolve(DialogAwaiter);
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

    async openGenerateMissingLevelUpDataPopup(): Promise<void> {
        if (this.data.type !== 'character') {
            throw new Error('Level up is only supported for characters')
        }
        if (!this.data.data.computedData.bases.job) {
            ui.notifications?.error('Choisissez un métier avant');
            return;
        }
        if (!this.data.data.computedData.bases.race) {
            ui.notifications?.error('Choisissez une race avant');
            return;
        }

        let levelWithMissingData: number[] = [];
        for (let lvl = 1; lvl <= this.data.data.level.value; lvl++) {
            if (!(lvl in this.data.data.levelUpData)) {
                levelWithMissingData.push(lvl);
            }
        }

        if (levelWithMissingData.length === 0) {
            ui.notifications?.warn('Tout les level ont déjà été calculé');
            return;
        }

        let dialogData: GenerateMissingLevelUpDataDialogData = {
            levelWithAdditionalPointInStat: [],
            levelWithMissingData: levelWithMissingData,
            actor: this,
            additionalMana: {},
            additionalHealth: {}
        }

        for (let lvl of levelWithMissingData) {
            dialogData.additionalHealth[lvl] = this.data.data.computedData.bases.job.healthLevels[lvl - 1];
            dialogData.additionalMana[lvl] = this.data.data.computedData.bases.job.manaLevels[lvl - 1];
            if (lvl % 20 == 0)
                dialogData.levelWithAdditionalPointInStat.push(lvl);
        }

        // FIXME: Replace with angular dialog
        let missingLevelUpData = await this.dialogAwaiter.openAndWaitResult(GenerateMissingLevelUpDataDialog, dialogData);
        if (!missingLevelUpData)
            return;

        let totalNewHealth = 0;
        let totalNewMana = 0;
        for (let data of Object.values(missingLevelUpData)) {
            totalNewHealth += data.health;
            totalNewMana += data.mana;
        }

        await this.update({
            data: {
                health: { value: this.data.data.health.value + totalNewHealth },
                mana: { value: this.data.data.mana.value + totalNewMana },
                levelUpData: missingLevelUpData
            }
        }, { diff: true });
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

