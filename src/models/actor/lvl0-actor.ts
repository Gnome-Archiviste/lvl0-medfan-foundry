import {
    BaseCharacterDataComputer,
    ClutterCharacterDataComputer,
    HealthManaDataComputer,
    LevelingCharacterDataComputer,
    MagicCharacterDataComputer,
    SkillsCharacterDataComputer,
    SpecialityCharacterDataComputer,
    StatsCharacterDataComputer
} from "./actor-data-computers/character";
import {
    DialogAwaiter,
    GenerateMissingLevelUpDataDialog,
    GenerateMissingLevelUpDataDialogData,
    LevelUpDialog,
    LevelUpDialogData,
    SelectSpecialityDialog
} from "ui/dialog";
import {RollSpecialityManager} from "../../managers/speciality";
import {LevelData, Lvl0ActorCharacterData} from './properties-data';
import {ActorDataComputer} from './actor-data-computers';
import {SpecialityRepository} from '../../repositories';
import {Lvl0ItemScroll} from '../item';
import {container} from 'tsyringe';
import {
    ActorDataConstructorData
} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/actorData';
import {InitializedGame} from '../misc/game';

container.register("ActorDataComputer", {useClass: BaseCharacterDataComputer});
container.register("ActorDataComputer", {useClass: LevelingCharacterDataComputer});
container.register("ActorDataComputer", {useClass: SpecialityCharacterDataComputer});
container.register("ActorDataComputer", {useClass: SkillsCharacterDataComputer});
container.register("ActorDataComputer", {useClass: StatsCharacterDataComputer});
container.register("ActorDataComputer", {useClass: MagicCharacterDataComputer});
container.register("ActorDataComputer", {useClass: HealthManaDataComputer});
container.register("ActorDataComputer", {useClass: ClutterCharacterDataComputer});

declare global {
    interface DocumentClassConfig {
        Actor: typeof Lvl0Actor;
    }
}

export class Lvl0Actor extends Actor {
    private readonly rollSpecialityManager: RollSpecialityManager;
    private readonly specialityRepository: SpecialityRepository;
    private readonly dialogAwaiter: DialogAwaiter;
    private readonly game: InitializedGame;

    constructor(
        data: ActorDataConstructorData,
        context?: object
    ) {
        super(data, context);
        this.rollSpecialityManager = container.resolve(RollSpecialityManager);
        this.specialityRepository = container.resolve(SpecialityRepository);
        this.dialogAwaiter = container.resolve(DialogAwaiter);
        this.game = container.resolve(InitializedGame);
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();

        for (let actorDataComputer of container.resolveAll<ActorDataComputer>("ActorDataComputer")) {
            if (actorDataComputer.isAvailableFor(this.data.type)) {
                actorDataComputer.compute(this);
            }
        }
    }

    async useSpeciality(specialityName: string): Promise<void> {
        if (this.data.data.mana.value <= 0) {
            ui.notifications?.error("Vous n'avez pas assez de point de magie pour lancer cette spécialité", {permanent: true});
            return;
        }
        if (this.rollSpecialityManager.needRoll(specialityName)) {
            let activeToken = this.getActiveTokens()[0];
            if (await rollSpecialityManager.rollSpeciality(activeToken || this.token, specialityName)) {
                await this.useMana(1);
            }
        } else {
            await this.useMana(1);
            let specialityDefinition = this.specialityRepository.getSpecialityFromId(specialityName);
            await ChatMessage.create({
                type: CONST.CHAT_MESSAGE_TYPES.IC,
                speaker: ChatMessage.getSpeaker({actor: this}),
                content: `<div class="speciality-chat">
                    <div class="title">
                        <span class="name">${specialityDefinition.name}</span>
                        <img class="img" src="${specialityDefinition.icon}">
                    </div>
                    <p class="description">${specialityDefinition.description}</p>
                </div>`
            })
        }
    }

    async useMana(amount: number): Promise<void> {
        await this.update({
            data: {
                mana: {value: this.data.data.mana.value - amount}
            }
        }, {diff: true});
    }

    async updateHealth(amount: number): Promise<void> {
        await this.update({
            data: {
                health: {value: Math.min(this.data.data.health.value + amount, this.data.data.health.max)}
            }
        }, {diff: true});
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
                health: {value: this.data.data.health.value + totalNewHealth},
                mana: {value: this.data.data.mana.value + totalNewMana},
                levelUpData: missingLevelUpData
            }
        }, {diff: true});
    }

    async openLevelUpPopup() {
        if (this.data.type !== 'character') {
            throw new Error('Level up is only supported for characters')
        }

        let actorData = this.data.data;
        let fromLevel = +actorData.level.value;
        let toLevel = fromLevel + 1;
        if (toLevel > 70) {
            ui.notifications?.warn('Niveau maximum atteint');
            return;
        }
        if (!actorData.computedData.bases.job) {
            ui.notifications?.error('Choisissez un métier avant');
            return;
        }
        if (!actorData.computedData.bases.race) {
            ui.notifications?.error('Choisissez une race avant');
            return;
        }

        if (toLevel === 1) {
            for (let requirement of actorData.computedData.bases.job.requirements) {
                if (requirement.races && requirement.races.indexOf(actorData.race.id) === -1)
                    continue;
                if (requirement.notRaces && requirement.notRaces.indexOf(actorData.race.id) !== -1)
                    continue;
                if (actorData.computedData.stats.baseStats[requirement.stat].value < requirement.min) {
                    ui.notifications?.error('Impossible de choisir cette classe. ' + requirement.stat.toUpperCase() + ' doit être au minimum de ' + requirement.min);
                    return;
                }
            }
        }

        let additionalHealth = actorData.computedData.bases.job.healthLevels[toLevel - 1];
        let additionalMana = actorData.computedData.bases.job.manaLevels[toLevel - 1];
        let hasNewSpeciality = actorData.computedData.bases.job.specialityLevels.indexOf(toLevel) === -1;
        let hasAdditionalPointInStat = (toLevel % 20) == 0;

        let dialogData: LevelUpDialogData = {
            toLevel,
            additionalHealth,
            additionalMana,
            hasNewSpeciality,
            hasAdditionalPointInStat,
            actor: this,
            actorStats: actorData.baseStats
        }

        let levelUpResultData = await this.dialogAwaiter.openAndWaitResult(LevelUpDialog, dialogData);
        if (levelUpResultData) {
            await this.doLevelUp(toLevel, actorData, levelUpResultData);
            if (toLevel === 1) {
                await this.addInitialInventory();
            }
        }
    }

    async openSelectSpecialityDialog() {
        if (this.data.type !== 'character') {
            throw new Error('openSelectSpecialityDialog only supported for character')
        }

        let selectedSpecialityName = await this.dialogAwaiter.openAndWaitResult(SelectSpecialityDialog, {});
        if (!selectedSpecialityName)
            return;

        let specialities = this.data.data.specialities || {};
        let nextId = (Object.keys(specialities).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        await this.update({data: {specialities: {[nextId]: selectedSpecialityName}}}, {diff: true});
    }

    async doLevelUp(level: number, actorData: Lvl0ActorCharacterData, levelUpResultData: LevelData): Promise<void> {
        await this.update({
            data: {
                level: {value: level},
                health: {value: actorData.health.value + (levelUpResultData.health || 0)},
                mana: {value: actorData.mana.value + (levelUpResultData.mana || 0)},
                experience: {value: actorData.experience.value - actorData.computedData.leveling.nextLevelExperience},
                staticInventory: {money: actorData.staticInventory.money + levelUpResultData.money},
                levelUpData: {
                    [level]: levelUpResultData
                }
            }
        }, {diff: true});
    }

    getFirstEmptyScroll(): Item | undefined {
        let scrolls = this.itemTypes['scroll'].map(w => w as Lvl0ItemScroll);
        if (scrolls) {
            for (let scroll of scrolls) {
                if (scroll.data.data.quantity < 1)
                    continue;
                if (!scroll.data.data.spell) {
                    return scroll;
                }
            }
        }
        return undefined;
    }

    async addInitialInventory(): Promise<void> {
        await this.update({
            data: {
                staticInventory: {rationCount: 2, torchCount: 2}
            }
        }, {diff: true});

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

