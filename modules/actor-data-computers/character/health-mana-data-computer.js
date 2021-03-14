import {CharacterDataComputer} from "./character-data-computer.js";

export class HealthManaDataComputer extends CharacterDataComputer {

    /**
     * @override
     */
    compute(actorData, actor) {
        let maxHealth = 0;
        let maxMana = 0;

        for (let i = 1; i <= actorData.level.value; i++) {
            if (!actorData.levelUpData)
                continue;
            if (!(i in actorData.levelUpData)) {
               continue;
            }

            let levelData = actorData.levelUpData[i];
            maxHealth += levelData.health;
            maxMana += levelData.mana;
        }

        actorData.health.max = maxHealth;
        actorData.mana.max = maxMana;
    }
}
