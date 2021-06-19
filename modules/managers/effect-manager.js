import {RollSkillManager} from "./roll-skill-manager.js";
import statsDefinition from '../../data/stats.js'

/**
 * @typedef Lvl0ActorEffect
 * @property {string} duration
 * @property {string} effectName
 * @property {Object[]} modifiers
 */

/**
 * @typedef Lvl0ActorEffectModifier
 * @property {[string]} skill
 * @property {[string]} stat
 * @property {number} value
 */

export class EffectManager {
    /**
     *
     * @param actor
     * @param {Lvl0ActorEffect} effect
     */
    static applyEffect(actor, effect) {
        /**
         * @type {Lvl0CharacterData} actorData
         */
        let actorData = actor.data.data;
        let nextId = (Object.keys(actorData.effects || {}).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        actor.update({data: {effects: {[nextId]: effect}}}, {diff: true});
        ui.notifications.info('Effet ' + effect.effectName + ' ajouté');
    }

    static removeEffect(actor, effectId) {
        this.actor.update({data: {effects: {['-=' + effectId]: null}}}, {diff: true});
    }

    static getEffectsWithBonusDamage(actor) {
        /**
         * @type {Lvl0CharacterData} actorData
         */
        let actorData = actor.data.data;
        let effectsWithBonusDamage = [];
        for (let effect of Object.values(actorData.effects || {})) {
            let damageModifier = effect.modifiers.find(x => x.stat === 'damage');
            if (damageModifier) {
                effectsWithBonusDamage.push({
                    name: effect.effectName,
                    value: damageModifier.value
                })
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
