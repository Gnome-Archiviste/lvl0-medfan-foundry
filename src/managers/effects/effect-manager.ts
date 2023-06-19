import {container, inject, singleton} from 'tsyringe';
import {Lvl0ActorEffect, Lvl0ActorEffectModifier} from './lvl0-actor-effect';
import {CharacterProperties, Lvl0FoundryActor} from 'models/actor';
import {StatsRepository} from 'repositories/stats-repository';
import {SkillRepository} from 'repositories/skill-repository';
import {ActiveEffectUtil} from '../../repositories/active-effect-util';

@singleton()
export class EffectManager {
    constructor(
        @inject(ActiveEffectUtil) private readonly activeEffectUtil: ActiveEffectUtil
    ) {
    }

    async applyEffect(actor: Lvl0FoundryActor, effect: Lvl0ActorEffect): Promise<void> {
        let actorData = actor.data.data;
        let nextId = (Object.keys(actorData.effects || {}).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        await actor.update({data: {effects: {[nextId]: effect}}}, {diff: true});
        for (let activeToken of actor.getActiveTokens(true)) {
            await this.activeEffectUtil.replaceActiveEffect(actor, 'effect', nextId, {icon: effect.icon, label: effect.effectName});
        }
        ui.notifications?.info('Effet ' + effect.effectName + ' ajouté');
    }

    async removeEffect(actor: Lvl0FoundryActor, effectId: number) {
        await this.activeEffectUtil.removeActiveEffect(actor, 'effect', effectId);
        await actor.update({data: {effects: {['-=' + effectId]: null}}}, {diff: true});
    }

    async updateEffect(actor: Lvl0FoundryActor, effectId: number, partialEffect: RecursivePartial<Lvl0ActorEffect>) {
        await actor.update({
            data: {effects: {[effectId]: partialEffect}}
        } as CharacterProperties, {diff: true});
    }

    getEffectsWithBonusDamage(actor: Lvl0FoundryActor): { name: string, value: number }[] {
        let actorData = actor.data.data;
        let effectsWithBonusDamage: { name: string, value: number }[] = [];
        if (actorData.effects) {
            for (let effect of Object.values(actorData.effects)) {
                if (!effect.modifiers)
                    continue;
                let damageModifier = effect.modifiers.find(x => x.stat === 'damage');
                if (damageModifier) {
                    effectsWithBonusDamage.push({
                        name: effect.effectName,
                        value: damageModifier.value
                    })
                }
            }
        }

        return effectsWithBonusDamage;
    }
}

Handlebars.registerHelper("effectModifierInfo", (modifier: Lvl0ActorEffectModifier) => {
    let prefix = '';
    if (modifier.skill)
        prefix = container.resolve(SkillRepository).getSkillFromId(modifier.skill).name;
    else if (modifier.stat)
        prefix = container.resolve(StatsRepository).getStatDisplayName(modifier.stat);

    if (modifier.value < 0) {
        return prefix + ' ' + modifier.value;
    } else {
        return prefix + ' +' + modifier.value;
    }
});
