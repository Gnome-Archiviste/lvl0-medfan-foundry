import {RollSkillManager} from "./roll-skill-manager.js";
import statsDefinition from '../../data/stats.js'
import {Lvl0ActorEffect} from './effects/lvl0-actor-effect';
import {Lvl0Actor} from '../models/actor/lvl0-actor';
import {Lvl0ActorCharacterData} from '../models/actor/properties-data/lvl0-actor-character-data';

export class EffectManager {
    static applyEffect(actor: Lvl0Actor, effect: Lvl0ActorEffect) {
        let actorData = actor.data.data;
        let nextId = (Object.keys(actorData.effects || {}).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        actor.update({data: {effects: {[nextId]: effect}}}, {diff: true});
        ui.notifications?.info('Effet ' + effect.effectName + ' ajouté');
    }

    static removeEffect(actor, effectId: string) {
        actor.update({data: {effects: {['-=' + effectId]: null}}}, {diff: true});
    }

    static getEffectsWithBonusDamage(actor): {name: string, value: number}[] {
        let actorData = <Lvl0ActorCharacterData> actor.data.data;
        let effectsWithBonusDamage: {name: string, value: number}[] = [];
        if (actorData.effects) {
            for (let effect of Object.values(actorData.effects) as Lvl0ActorEffect[]) {
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

Handlebars.registerHelper("effectModifierInfo", /** @type Lvl0ActorEffectModifier */ modifier => {
    let prefix = '';
    if (modifier.skill)
        prefix = RollSkillManager.getSkillFromId(modifier.skill).name;
    else if (modifier.stat)
        prefix = statsDefinition.stats[modifier.stat].name;

    if (modifier.value < 0) {
        return prefix + ' '+ modifier.value;
    } else {
        return prefix + ' +' + modifier.value;
    }
});
