import {CharacterDataComputer} from "./character-data-computer.js";

export class StatsCharacterDataComputer extends CharacterDataComputer {
    static statsNames = ['phy', 'dex', 'int', 'cha', 'per'];

    /**
     * @override
     */
    compute(actorData) {
        for (let statsName of StatsCharacterDataComputer.statsNames) {
            let bonus = 0; // FIXME: Compute this from items / buf
            let armor = 0; // FIXME: Compute this from items

            if (statsName === 'dex')
                actorData.computedData.stats.baseStats[statsName].armor = armor;
            actorData.computedData.stats.baseStats[statsName].bonus = bonus;
            actorData.computedData.stats.baseStats[statsName].value = actorData.baseStats[statsName].value + bonus - armor;
        }
        actorData.computedData.stats.movement.value = actorData.computedData.stats.baseStats.phy.value + actorData.computedData.stats.baseStats.dex.value;
    }
}
