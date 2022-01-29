import {singleton} from 'tsyringe';
import {CharacterDataComputer} from "./character-data-computer";
import {Lvl0Actor} from '../../lvl0-actor';
import {ComputedCharacterMagicArmorData, Lvl0ActorCharacterData} from '../../properties-data';
import {Lvl0ActorEffect} from '../../../../managers/effects';

@singleton()
export class MagicalArmorDataComputer extends CharacterDataComputer {

    override computeCharacter(actorData: Lvl0ActorCharacterData, actor: Lvl0Actor) {
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
