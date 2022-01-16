import {LevelingCharacterDataComputer} from "./actor-data-computers/character/leveling-character-data-computer.js";
import {SkillsCharacterDataComputer} from "./actor-data-computers/character/skills-character-data-computer.js";
import {StatsCharacterDataComputer} from "./actor-data-computers/character/stats-character-data-computer.js";
import {BaseCharacterDataComputer} from "./actor-data-computers/character/base-character-data-computer.js";
import {MagicCharacterDataComputer} from "./actor-data-computers/character/magic-character-data-computer.js";
import {HealthManaDataComputer} from "./actor-data-computers/character/health-mana-data-computer.js";
import {ClutterCharacterDataComputer} from "./actor-data-computers/character/clutter-character-data-computer.js";
import {SpecialityCharacterDataComputer} from "./actor-data-computers/character/speciality-character-data-computer.js";
import {LevelUpDialog} from "./ui/level-up-dialog.js";
import {SelectSpecialityDialog} from "./ui/select-speciality-dialog.js";
import {RollSpecialityManager} from "./managers/roll-speciality-manager.js";
import {LevelData, Lvl0CharacterData} from './models/character/character';
import {
    GenerateMissingLevelUpDataDialog,
    GenerateMissingLevelUpDataDialogData
} from './ui/generate-missing-level-up-data-dialog';


const actorDataComputers = [
    new BaseCharacterDataComputer(),
    new LevelingCharacterDataComputer(),
    new SpecialityCharacterDataComputer(),
    new SkillsCharacterDataComputer(),
    new StatsCharacterDataComputer(),
    new MagicCharacterDataComputer(),
    new HealthManaDataComputer(),
    new ClutterCharacterDataComputer(),
];

declare global {
    interface DocumentClassConfig {
        Actor: typeof Lvl0Actor;
    }
}

export class Lvl0Actor extends Actor {
    prepareDerivedData() {
        super.prepareDerivedData();

        const actorData = this.data;

        for (let actorDataComputer of actorDataComputers) {
            if (actorDataComputer.isAvailableFor(actorData.type)) {
                actorDataComputer.compute(actorData.data, this);
            }
        }
    }

    /** @param {string} specialityName*/
    async useSpeciality(specialityName) {
        if (this.data.data.mana.value <= 0) {
            ui.notifications?.error("Vous n'avez pas assez de point de magie pour lancer cette spécialité", {permanent: true});
            return;
        }
        if (RollSpecialityManager.needRoll(specialityName)) {
            let activeToken = this.getActiveTokens()[0];
            if (await RollSpecialityManager.rollSpeciality(activeToken || this.token, specialityName)) {
                await this.useMana(1);
            }
        } else {
            await this.useMana(1);
            let specialityDefinition = RollSpecialityManager.getSpecialityFromId(specialityName);
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

    async useMana(amount) {
        await this.update({
            data: {
                mana: {value: this.data.data.mana.value - amount}
            }
        }, {diff: true});
    }

    async updateHealth(amount) {
        await this.update({
            data: {
                health: {value: Math.min(this.data.data.health.value + amount, this.data.data.health.max)}
            }
        }, {diff: true});
    }

    openGenerateMissingLevelUpDataPopup(): void {
        let levelWithMissingData: number[] = [];
        for (let lvl = 1; lvl < this.data.data.level.value; lvl++) {
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

        let levelUpDialog = new GenerateMissingLevelUpDataDialog(dialogData, async (missingLevelUpData: { [level: number]: LevelData }) => {
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
        });
        levelUpDialog.render(true);
    }

    openLevelUpPopup() {
        let actorData = this.data.data;
        let fromLevel = +actorData.level.value;
        let toLevel = fromLevel + 1;
        if (toLevel > 70) {
            ui.notifications?.warn('Niveau maximum atteint');
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

        let levelUpData = {
            toLevel,
            additionalHealth,
            additionalMana,
            hasNewSpeciality,
            hasAdditionalPointInStat,
            actor: this
        }

        let levelUpDialog = new LevelUpDialog(levelUpData, actorData.baseStats, async (levelUpResultData: LevelData) => {
            await this.doLevelUp(toLevel, actorData, levelUpResultData);
            if (toLevel === 1) {
                await this.addInitialInventory();
            }
        });
        levelUpDialog.render(true);
    }

    openSelectSpecialityDialog() {
        let levelUpDialog = new SelectSpecialityDialog(async (selectedSpecialityName) => {
            if (!selectedSpecialityName)
                return;
            let specialities = this.data.data.specialities || {};
            let nextId = (Object.keys(specialities).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
            await this.update({data: {specialities: {[nextId]: selectedSpecialityName}}}, {diff: true});
        });
        levelUpDialog.render(true);
    }

    async doLevelUp(level: number, actorData: Lvl0CharacterData, levelUpResultData: LevelData): Promise<void> {
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

    async addInitialInventory() {
        await this.update({
            data: {
                staticInventory: {rationCount: 2, torchCount: 2}
            }
        }, {diff: true});

        let table = game.tables!.contents.find(s => s.name === "Objets de base") as RollTable;
        if (!table) {
            return;
        }

        for (let resultElement of table.data.results) {
            if (!resultElement.data.resultId)
                continue;
            let itemData = game.items!.get(resultElement.data.resultId);
            if (!itemData)
                continue;
            await this.createEmbeddedDocuments('Item', [itemData.toObject()], {});
        }
    }
}

Hooks.on("preCreateOwnedItem", async (actor, itemData, options) => {
    if (itemData.data.quantifiable) {
        itemData.data.quantity = 1;
    }
});
