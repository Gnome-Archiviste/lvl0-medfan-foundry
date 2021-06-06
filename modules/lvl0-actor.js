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
import specialitiesDefinitions from './../data/specialities.js'
import {RollSpecialityManager} from "./managers/roll-speciality-manager.js";


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

export class Lvl0Actor extends Actor {
    prepareData() {
        super.prepareData();

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
            ui.notifications.error("Vous n'avez pas assez de point de magie pour lancer cette spécialité", {permanent: true});
            return;
        }
        await ChatMessage.create({
            type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
            speaker: ChatMessage.getSpeaker({user: game.user}),
            content: "Utilise <strong>" + specialitiesDefinitions[specialityName].name + "</strong>"
        })

        if (await RollSpecialityManager.rollSpeciality(this.getActiveTokens()[0] || game.token, specialityName)) {
            await this.useMana(1);
        }
    }

    async useMana(amount) {
        await this.update({
            data: {
                mana: {value: this.data.data.mana.value - amount}
            }
        }, {diff: true});
    }

    openLevelUpPopup() {
        /** @type {Lvl0CharacterData} */
        let actorData = this.data.data;
        let fromLevel = +actorData.level.value;
        let toLevel = fromLevel + 1;

        if (toLevel === 1) {
            for (let requirement of actorData.computedData.bases.job.requirements) {
                if (requirement.races && requirement.races.indexOf(actorData.race.id) === -1)
                    continue;
                if (requirement.notRaces && requirement.notRaces.indexOf(actorData.race.id) !== -1)
                    continue;
                if (actorData.computedData.stats.baseStats[requirement.stat].value < requirement.min) {
                    ui.notifications.error('Impossible de choisir cette classe. ' + requirement.stat.toUpperCase() + ' doit être au minimum de ' + requirement.min);
                    return;
                }
            }
        }

        let additionalHealth = actorData.computedData.bases.job.healthLevels[toLevel - 1];
        let additionalMana = actorData.computedData.bases.job.manaLevels[toLevel - 1];
        let hasNewSpeciality = actorData.computedData.bases.job.specialityLevels.indexOf(toLevel) === -1;

        let levelUpData = {
            toLevel,
            additionalHealth,
            additionalMana,
            hasNewSpeciality
        }

        let levelUpDialog = new LevelUpDialog(levelUpData, actorData.baseStats, async (levelUpResultData) => {
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

    /**
     * @param {number} level
     * @param {Lvl0CharacterData} actorData
     * @param {LevelData} levelUpResultData
     * @return {Promise<void>}
     */
    async doLevelUp(level, actorData, levelUpResultData) {
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

        let table = game.tables.entities.find(s => s.name === "Objets de base");
        if (!table) {
            return;
        }

        for (let resultElement of table.data.results) {
            if (!resultElement.resultId)
                continue;
            let itemData = game.items.get(resultElement.resultId);
            if (!itemData)
                continue;
            await this.createOwnedItem(itemData);
        }
    }
}

Hooks.on("preCreateOwnedItem", async (actor, itemData, options) => {
    if (itemData.data.quantifiable) {
        itemData.data.quantity = 1;
    }
});
