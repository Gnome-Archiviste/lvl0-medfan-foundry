import {CharacterDataComputer} from "./character-data-computer.js";

export class HealthManaDataComputer extends CharacterDataComputer {

    /**
     * @override
     */
    compute(actorData, actor) {
        let maxHealth = 0;
        let maxMana = 0;

        for (let /** @type {CharacterModifierInfo} */ modifier of Object.values(actorData.modifiers)) {
            if (modifier.stat === 'mana') {
                maxMana += modifier.value;
            }
            if (modifier.stat === 'health') {
                maxHealth += modifier.value;
            }
        }

        for (let /** @type {Item} */ item of actor.items) {
            if (!item.data.data.equiped)
                continue;

            if (typeof item.data.data.modifiers === 'object') {
                for (let /** @type {ItemModifierInfo} */ modifier of Object.values(item.data.data.modifiers)) {
                    if (modifier.stat === 'mana') {
                        maxMana += modifier.value;
                    }
                    if (modifier.stat === 'health') {
                        maxHealth += modifier.value;
                    }
                }
            }
        }

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
