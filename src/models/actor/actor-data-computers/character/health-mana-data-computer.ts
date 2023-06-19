import {singleton} from 'tsyringe';
import {CharacterDataComputer} from "./character-data-computer";
import {Lvl0FoundryActor} from '../../lvl0-foundry-actor';
import {getItemModifiersIfAvailable} from 'models/item';
import {Lvl0CharacterData} from '../../../../app/data-accessor/models/lvl0-character';

@singleton()
export class HealthManaDataComputer extends CharacterDataComputer {

    override computeCharacter(actorData: Lvl0CharacterData, actor: Lvl0FoundryActor): void {
        let maxHealth = 0;
        let maxMana = 0;

        for (let modifier of Object.values(actorData.modifiers)) {
            if (modifier.stat === 'mana') {
                maxMana += modifier.value;
            }
            if (modifier.stat === 'health') {
                maxHealth += modifier.value;
            }
        }

        for (let item of actor.items) {
            if (!item.data.data.equiped)
                continue;

            let itemModifiers = getItemModifiersIfAvailable(item.data);
            if (itemModifiers) {
                for (let modifier of Object.values(itemModifiers)) {
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
