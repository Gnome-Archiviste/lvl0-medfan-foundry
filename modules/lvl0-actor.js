import {LevelingCharacterDataComputer} from "./actor-data-computers/character/leveling-character-data-computer.js";
import {SkillsCharacterDataComputer} from "./actor-data-computers/character/skills-character-data-computer.js";
import {StatsCharacterDataComputer} from "./actor-data-computers/character/stats-character-data-computer.js";
import {BaseCharacterDataComputer} from "./actor-data-computers/character/base-character-data-computer.js";
import {MagicCharacterDataComputer} from "./actor-data-computers/character/magic-character-data-computer.js";
import {HealthManaDataComputer} from "./actor-data-computers/character/health-mana-data-computer.js";
import {ClutterCharacterDataComputer} from "./actor-data-computers/character/clutter-character-data-computer.js";
import {LevelUpDialog} from "./ui/level-up-dialog.js";

const actorDataComputers = [
    new BaseCharacterDataComputer(),
    new LevelingCharacterDataComputer(),
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

    openLevelUpPopup() {
        /** @type {Lvl0CharacterData} */
        let actorData = this.data.data;
        let fromLevel = +actorData.level.value;
        let toLevel = fromLevel + 1;

        if (toLevel === 1)  {
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

        let levelUpDialog = new LevelUpDialog(levelUpData, actorData.baseStats, (levelUpResultData) => {
            this.doLevelUp(toLevel, actorData, levelUpResultData);
        });
        levelUpDialog.render(true);
    }

    doLevelUp(level, actorData, levelUpResultData) {
        this.update({data: {
            level: {value: level},
            health: {value: actorData.health.value + (levelUpResultData.health || 0)},
            mana: {value: actorData.mana.value + (levelUpResultData.mana || 0)},
            experience: {value: actorData.experience.value - actorData.computedData.leveling.nextLevelExperience},
            staticInventory: {money: actorData.staticInventory.money + levelUpResultData.money},
            levelUpData: {
                [level]: levelUpResultData
            }}
        }, {diff: true});
    }
}

Hooks.on("preCreateOwnedItem", async (actor, itemData, options) => {
    if (itemData.data.quantifiable) {
        itemData.data.quantity = 1;
    }
});
