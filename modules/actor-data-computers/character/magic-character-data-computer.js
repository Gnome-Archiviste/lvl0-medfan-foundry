import {CharacterDataComputer} from "./character-data-computer.js";

export class MagicCharacterDataComputer extends CharacterDataComputer {

    /**
     * @override
     */
    compute(actorData, actor) {
        let arcaneLevels = actorData.computedData.bases.job?.arcaneLevels;
        let arcaneLevel = 0;

        if (actorData.level.value >= 70)
            arcaneLevel = 20;
        else if (arcaneLevels) {
            for (let i = arcaneLevels.length - 1; i >= 0; i--) {
                if (actorData.level.value >= arcaneLevels[i]) {
                    arcaneLevel = i + 1;
                    break;
                }
            }
        }
        actorData.computedData.magic.arcaneLevel = arcaneLevel;
    }
}
