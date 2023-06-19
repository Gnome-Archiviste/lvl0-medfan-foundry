import {singleton} from 'tsyringe';
import {CharacterProperties, Lvl0FoundryActor, Lvl0ActorCharacter} from 'models/actor';
import {CharacterModifierInfo} from '../../app/data-accessor/models/lvl0-character';

@singleton()
export class ActorModifierManager {

    async addModifier(actor: Lvl0ActorCharacter, modifier: CharacterModifierInfo) {
        let modifiers = actor.data.data.modifiers || {};
        let nextId = (Object.keys(modifiers).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        await actor.update({data: {modifiers: {[nextId]: modifier}}}, {diff: true});
    }

    async removeModifier(actor: Lvl0ActorCharacter, modifierId: number) {
        await actor.update({data: {modifiers: {['-=' + modifierId]: null}}}, {diff: true});
    }

    async updateModifier(actor: Lvl0ActorCharacter, modifierId: number, partialModifier: RecursivePartial<CharacterModifierInfo>) {
        await actor.update({
            data: {modifiers: {[modifierId]: partialModifier}}
        } as CharacterProperties, {diff: true});
    }

}
