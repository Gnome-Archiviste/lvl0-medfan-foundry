import {CharacterDataComputer} from "./character-data-computer.js";
import {Lvl0ActorEffect} from '../../managers/effects/lvl0-actor-effect';
import {CharacterModifierInfo} from '../../models/character/character';

export class StatsCharacterDataComputer extends CharacterDataComputer {
    static statsNames = ['phy', 'dex', 'int', 'cha', 'per'];

    /**
     * @override
     */
    compute(actorData, actor) {
        let bonusPerStat = {};
        let baseStatModifier = {};
        let armorMalus = 0;
        let armorValue = 0;

        for (let modifier of Object.values(actorData.modifiers) as CharacterModifierInfo[]) {
            if (!modifier.isPermanent)  {
                bonusPerStat[modifier.stat] = (bonusPerStat[modifier.stat] || 0) + modifier.value;
            } else {
                baseStatModifier[modifier.stat] = (baseStatModifier[modifier.stat] || 0) + modifier.value;
            }
        }

        if (actorData.effects) {
            for (let effect of Object.values(actorData.effects) as Lvl0ActorEffect[]) {
                for (let modifier of effect.modifiers) {
                    if (modifier.stat)
                        bonusPerStat[modifier.stat] = (bonusPerStat[modifier.stat] || 0) + modifier.value;
                }
            }
        }

        for (let item of actor.items) {
            if (!item.data.data.equiped)
                continue;

            if (typeof item.data.data.modifiers === 'object') {
                for (let modifier of Object.values(item.data.data.modifiers) as CharacterModifierInfo[]) {
                    if (modifier.stat)
                        bonusPerStat[modifier.stat] = (bonusPerStat[modifier.stat] || 0) + modifier.value;
                }
            }
            if (item.type === 'armor') {
                armorMalus += item.data.data.dexMalus;
                armorValue += +item.data.data.protection;
            }
        }

        for (let statsName of StatsCharacterDataComputer.statsNames) {
            let bonus = bonusPerStat[statsName] || 0;
            let baseStatValue = actorData.baseStats[statsName].value + (baseStatModifier[statsName] || 0);
            let armor = 0;

            if (statsName === 'dex') {
                armor = armorMalus;
                actorData.computedData.stats.baseStats[statsName].armor = armor;
            }
            actorData.computedData.stats.baseStats[statsName].base = baseStatValue;
            actorData.computedData.stats.baseStats[statsName].bonus = bonus;
            actorData.computedData.stats.baseStats[statsName].value = baseStatValue + bonus - armor;
        }
        actorData.computedData.stats.movement.value = actorData.computedData.stats.baseStats.phy.value + actorData.computedData.stats.baseStats.dex.value;
        actorData.computedData.stats.armor.value = +armorValue + (bonusPerStat['protection'] || 0);
    }
}
