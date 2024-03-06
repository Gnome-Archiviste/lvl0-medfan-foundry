import {singleton} from 'tsyringe';
import {CharacterDataComputer} from "./character-data-computer";
import {Lvl0FoundryActor} from '../../lvl0-foundry-actor';
import {ComputedCharacterMagicArmorData, Lvl0CharacterData} from '../../../../app/data-accessor/models/lvl0-character';
import {Lvl0ActorEffect} from '../../../../app/data-accessor/actor-effect.service';

@singleton()
export class MagicalArmorDataComputer extends CharacterDataComputer {

    override computeCharacter(actorData: Lvl0CharacterData, actor: Lvl0FoundryActor) {
        let magicArmor: ComputedCharacterMagicArmorData | undefined;

        if (actorData.effects) {
            for (let effect of Object.values(actorData.effects) as Lvl0ActorEffect[]) {
                if (effect.magicArmor?.remainingArmorPoint) {
                    magicArmor = {remainingArmorPoint: effect.magicArmor?.remainingArmorPoint}
                }
            }
        }

        actorData.computedData.magicArmor = magicArmor;
    }
}
