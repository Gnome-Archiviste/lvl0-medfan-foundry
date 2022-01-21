import {Lvl0ActorEffect, Lvl0ActorEffectModifier} from './lvl0-actor-effect';
import {Lvl0Actor} from '../../models/actor/lvl0-actor';
import {StatsRepository} from '../../repositories/stats-repository';
import {SkillRepository} from '../../repositories/skill-repository';

export class EffectManager {
    static async applyEffect(actor: Lvl0Actor, effect: Lvl0ActorEffect): Promise<void> {
        let actorData = actor.data.data;
        let nextId = (Object.keys(actorData.effects || {}).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        await actor.update({data: {effects: {[nextId]: effect}}}, {diff: true});
        ui.notifications?.info('Effet ' + effect.effectName + ' ajouté');
    }

    static async removeEffect(actor: Lvl0Actor, effectId: string) {
        await actor.update({data: {effects: {['-=' + effectId]: null}}}, {diff: true});
    }

    static getEffectsWithBonusDamage(actor: Lvl0Actor): { name: string, value: number }[] {
        let actorData = actor.data.data;
        let effectsWithBonusDamage: { name: string, value: number }[] = [];
        if (actorData.effects) {
            for (let effect of Object.values(actorData.effects)) {
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
        prefix = SkillRepository.getSkillFromId(modifier.skill).name;
    else if (modifier.stat)
        prefix = StatsRepository.getStatDisplayName(modifier.stat);

    if (modifier.value < 0) {
        return prefix + ' ' + modifier.value;
    } else {
        return prefix + ' +' + modifier.value;
    }
});
