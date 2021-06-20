import spellsDefinitions from "../../data/spells.js";
import {ElementsUtil} from "../utils/elements-util.js";

/**
 * @typedef SpellDefinition
 * @property {string} id
 * @property {string} icon
 * @property {string} name
 * @property {string} description
 * @property {Object.<string, SpellActionDefinition>} actions
 * @property {SpellDefinitionDistance} distance
 * @property {ComputableSpellValue|null} duration
 * @property {ComputableSpellValue|null} area
 * @property {ComputableSpellValue|null} bonus
 * @property {ComputableSpellValue|null} resilience
 * @property {ComputableSpellValue|null} criticalSuccess
 * @property {SpellDamageDefinition|null} damage
 * @property {SpellHealDefinition|null} heal
 */

/**
 * @typedef SpellActionDefinition
 * @property {string} name
 * @property {'addEffect'|'heal'} type
 * @property {AddEffectActionDefinitionData} data
 */

/**
 * @typedef AddEffectActionDefinitionData
 * @property {string} effectName
 * @property {ComputableSpellValue|null} duration
 * @property {AddEffectActionModifierDefinition[]} modifiers
 */

/**
 * @typedef AddEffectActionModifierDefinition
 * @property {string|null} stat
 * @property {string|null} valueFormula
 */
/**
 * @typedef SpellDamageDefinition
 * @property {string|null} rollFormula
 * @property {string|null} element
 */
/**
 * @typedef SpellHealDefinition
 * @property {string|null} rollFormula
 */
/**
 * @typedef SpellDefinitionDistance
 * @property {'self'|'touch'} type
 */

/**
 * @typedef ComputableSpellValue
 * @property {string} formula
 * @property {string} rollFormula
 * @property {string} text
 * @property {string} value
 * @property {string} unit
 */


/**
 * @typedef ActorSpell
 * @property {SpellDefinition} definition
 * @property {string} id
 * @property {string} icon
 * @property {string} name
 * @property {string} cost
 * @property {string} description
 * @property {string|RolledSpellStat} distance
 * @property {string|RolledSpellStat|null} damage
 * @property {string|RolledSpellStat|null} bonus
 * @property {string|RolledSpellStat|null} healFormula
 * @property {string|RolledSpellStat|null} duration
 * @property {string|RolledSpellStat|null} area
 * @property {string|RolledSpellStat|null} resilience
 * @property {string|RolledSpellStat|null} criticalSuccess
 * @property {Object.<string, ActorSpellActionDefinition>} actions
 */

/**
 * @typedef ActorSpellActionDefinition
 * @property {string} name
 * @property {'addEffect'|'heal'} type
 * @property {Lvl0ActorEffect|Lvl0HealActionData} data
 */

/**
 * @typedef Lvl0HealActionData
 * Lvl0HealActionData {number} value
 */

export class RolledSpellStat {
    /**
     * @property {string} rollFormula
     * @property {string|null} suffix
     * @property {string|null} unit
     */
    constructor(rollFormula, suffix, unit) {
        this.rollFormula = rollFormula;
        this.roll = new Roll(rollFormula).roll();
        this.suffix = suffix;
        this.unit = unit;
    }

    toDisplayString() {
        let result = this.roll._total;
        if (this.unit)
            result += ' ' + this.unit
        if (this.suffix)
            result += ' (' + this.suffix + ')'
        return result;
    }

    toDisplayDefinitionString() {
        let result = this.rollFormula;
        if (this.unit)
            result += ' ' + this.unit
        if (this.suffix)
            result += ' (' + this.suffix + ')'
        return result;
    }
}

export class SpellManager {
    /**
     * @param {SpellDefinition} spellDefinition
     * @param {number} level
     * @param {string} spellCategory
     * @param {string} speciality
     * @param {Lvl0CharacterData} actorData
     * @param {Object?} context
     * @return ActorSpell
     */
    static computeSpellForActor(spellDefinition, level, spellCategory, speciality, actorData, context) {
        let actorSpell = {
            id: spellCategory + '.' + speciality + '.' + level + '.' + spellDefinition.id,
            actions: SpellManager.computeActions(spellDefinition.actions, actorData, context),
            area: SpellManager.computeComplex(spellDefinition.area, actorData, context),
            bonus: SpellManager.computeComplex(spellDefinition.bonus, actorData, context),
            cost: level.toString(),
            criticalSuccess: SpellManager.computeComplex(spellDefinition.criticalSuccess, actorData, context),
            damage: SpellManager.computeDamageFormula(spellDefinition.damage, actorData, context),
            description: undefined,
            distance: SpellManager.computeSpellDistance(spellDefinition, actorData, context),
            duration: SpellManager.computeComplex(spellDefinition.duration, actorData, context),
            heal: SpellManager.computeHealFormula(spellDefinition.heal, actorData, context),
            icon: spellDefinition.icon,
            name: spellDefinition.name,
            resilience: SpellManager.computeComplex(spellDefinition.resilience, actorData, context),
            definition: spellDefinition,
        };

        actorSpell.description = SpellManager.computeSpellDescription(actorSpell, spellDefinition, actorData, context);

        return actorSpell;
    }


    static reComputeSpellAfterRoll(actorSpell, actorData, context) {
        let updatedActorSpell = {
            ...actorSpell,
            actions: SpellManager.computeActions(actorSpell.definition.actions, actorData, context),
            area: SpellManager.computeComplex(actorSpell.definition.area, actorData, context),
            bonus: SpellManager.computeComplex(actorSpell.definition.bonus, actorData, context),
            criticalSuccess: SpellManager.computeComplex(actorSpell.definition.criticalSuccess, actorData, context),
            damage: SpellManager.computeDamageFormula(actorSpell.definition.damage, actorData, context),
            distance: SpellManager.computeSpellDistance(actorSpell.definition, actorData, context),
            duration: SpellManager.computeComplex(actorSpell.definition.duration, actorData, context),
            heal: SpellManager.computeHealFormula(actorSpell.definition.heal, actorData, context),
            resilience: SpellManager.computeComplex(actorSpell.definition.resilience, actorData, context),
        };

        SpellManager.addAdditionalActions(actorSpell.definition.actions, actorData, context, updatedActorSpell)

        updatedActorSpell.description = SpellManager.computeSpellDescription(updatedActorSpell, actorSpell.definition, actorData, context);

        return updatedActorSpell;
    }

    /**
     * @param {string} spellId
     * @return SpellDefinition|undefined
     */
    static getSpellById(spellId) {
        let [spellCategory, speciality, level, id] = spellId.split('.', 4);
        return spellsDefinitions[spellCategory][speciality][level]?.find(s => s.id === id);
    }

    /**
     * @param {string} spellId
     * @param {Lvl0CharacterData} actorData
     * @param {Object} context
     * @return ActorSpell|undefined
     */
    static getComputedSpellForActorById(spellId, actorData, context) {
        let spellDefinition = this.getSpellById(spellId);
        if (!spellDefinition)
            return undefined;
        let [spellCategory, speciality, level, id] = spellId.split('.', 4);
        return this.computeSpellForActor(spellDefinition, +level, spellCategory, speciality, actorData, context);
    }

    static computeSpellDescription(actorSpell, spellDefinition, actorData, context = {}) {
        if (typeof spellDefinition.description === 'string')
            return spellDefinition.description
                .replace('{{spell.area}}', `<em>${actorSpell.area}</em>`);
        if (spellDefinition.description.formula) {
            return this.computeFormula(spellDefinition.description.formula, context, actorData);
        }
        return undefined;
    }


    /**
     * @param {Actor} actor
     * @param {'mage'|'champion'} spellCategory
     * @return SpellDefinition[]
     */
    static getAvailableSpells(actor, spellCategory) {
        /** @type {Lvl0CharacterData} */
        let actorData = actor.data.data;
        if (!(spellCategory in spellsDefinitions))
            return [];

        let speciality = 'general';
        let availableSpells = [];
        let allCategorySpells = {};
        if (spellCategory === 'mage') {
            if (actorData.computedData.bases.job.spellCategory === 'useSpecializations') {
                for (const specialization of actorData.job.specializations) {
                    let specializationSpells = spellsDefinitions.mage[specialization];
                    if (!specializationSpells) {
                        console.warn('No spell for specialization ' + specialization);
                        continue;
                    }
                    for (let level of Object.keys(specializationSpells)) {
                        allCategorySpells[level] = (allCategorySpells[level] || []).concat(specializationSpells[level]);
                    }
                }
            } else {
                speciality = actorData.computedData.bases.job.spellCategory;
                allCategorySpells = spellsDefinitions[spellCategory][speciality];
            }
        } else {
            allCategorySpells = spellsDefinitions[spellCategory][speciality];
        }

        for (let level = 1; level <= actorData.computedData.magic.arcaneLevel && level <= actorData.mana.value; level++) {
            if (!(level in allCategorySpells))
                continue;
            for (let spellDefinition of allCategorySpells[level]) {
                availableSpells.push(SpellManager.computeSpellForActor(spellDefinition, level, spellCategory, speciality, actorData));
            }
        }

        return availableSpells;
    }

    /**
     * @param {SpellDefinition} spellDefinition
     * @param {Lvl0CharacterData} actorData
     * @param {Object?} context
     * @return {string|undefined}
     */
    static computeSpellDistance(spellDefinition, actorData, context = {}) {
        if (!spellDefinition.distance) {
            return undefined;
        }
        let value = '';
        if (spellDefinition.distance.type) {
            switch (spellDefinition.distance.type) {
                case "self":
                    return 'Soi-même';
                case "touch":
                    return 'Touché';
            }
        } else if (spellDefinition.distance.text) {
            value = spellDefinition.distance.text;
        } else if (spellDefinition.distance.value) {
            value = spellDefinition.distance.value;
        }
        if (spellDefinition.distance.unit) {
            value = value + ' ' + spellDefinition.distance.unit;
        }

        return value;
    }

    static computeDamageFormula(damageData, actorData, context = {}) {
        if (!damageData) {
            return undefined;
        }

        if (damageData.rollFormula) {
            let rollFormula = this.computeFormula(damageData.rollFormula, context, actorData);
            return new RolledSpellStat(rollFormula, ElementsUtil.getName(damageData.element));
        }
        if (damageData.formula) {
            let value = this.computeFormula(damageData.formula, context, actorData);
            if (damageData.element)
                value += '(' + ElementsUtil.getName(damageData.element) + ')';
            return value;
        }

        return undefined;
    }

    /**
     *
     * @param {SpellHealDefinition|undefined} healData
     * @param {Lvl0CharacterData} actorData
     * @param {Object} context
     * @return {RolledSpellStat|string|undefined}
     */
    static computeHealFormula(healData, actorData, context = {}) {
        if (!healData) {
            return undefined;
        }
        if (healData.rollFormula) {
            let rollFormula = this.computeFormula(healData.rollFormula, context, actorData);
            return new RolledSpellStat(rollFormula);
        }
        if (healData.formula) {
            return this.computeFormula(healData.formula, context, actorData);
        }

        return undefined;
    }

    /**
     * @param {ComputableSpellValue} computable
     * @param {Lvl0CharacterData} actorData
     * @param {Object?} context
     * @return {string|RolledSpellStat|undefined}
     */
    static computeComplex(computable, actorData, context) {
        if (!computable) {
            return undefined;
        }
        let value = undefined;
        if (computable.formula) {
            value = this.computeFormula(computable.formula, context, actorData);
        } else if (computable.rollFormula) {
            let rollFormula = this.computeFormula(computable.rollFormula, context, actorData);
            return new RolledSpellStat(rollFormula, null, computable.unit);
        } else if (computable.value) {
            value = computable.value;
        } else if (computable.text) {
            value = computable.text;
        }
        if (computable.unit) {
            value = value + ' ' + computable.unit;
        }
        return value;
    }

    static computeFormula(body, context, actorData) {
        let wrap = body => "{ return (function(context) {" + body + "})(arguments[0]) };"
        try {
            let func = new Function(wrap(body));
            return func.call(null, {
                ...context,
                actorData
            });
        } catch (e) {
            console.error(e);
            console.error(body);
            ui.notifications.error('Erreur dans la définition de la fonction, voir la console pour plus d\'infos');
        }
    }

    static computeModifier(modifier, actorData, context) {
        let computedModifier = {};
        if ('stat' in modifier)
            computedModifier.stat = modifier.stat;
        if ('skill' in modifier)
            computedModifier.skill = modifier.skill;
        if (modifier.valueFormula) {
            computedModifier.value = this.computeFormula(modifier.valueFormula, context, actorData);
        } else if (modifier.value) {
            computedModifier.value = modifier.value;
        }
        return computedModifier;
    }

    /**
     * @param {[Object]} actions
     * @param {Lvl0CharacterData} actorData
     * @param {Object} context
     * @return {Object.<string, ActorSpellActionDefinition>|undefined}
     */
    static computeActions(actions, actorData, context) {
        if (!actions)
            return undefined;
        let computedActions = {};

        for (let [key, action] of Object.entries(actions)) {
            computedActions[key] = {
                name: action.name,
                type: action.type,
                data: {
                    effectName: action.data.effectName,
                    duration: this.computeComplex(action.data.duration, actorData, context),
                    modifiers: action.data.modifiers.map(m => this.computeModifier(m, actorData, context))
                }
            };
        }

        return computedActions;
    }

    static addAdditionalActions(actions, actorData, context, actorSpell) {
        let computedActions = {};
        if (actorSpell?.heal instanceof RolledSpellStat) {
            computedActions['heal'] = {
                name: 'Soigner le token sélectionné',
                type: 'heal',
                data: {
                    value: actorSpell?.heal.roll._total,
                }
            }
        }

        if (Object.keys(computedActions).length > 0) {
            if (!actorSpell.actions)
                actorSpell.actions = {}
            actorSpell.actions = {...actorSpell.actions, ...computedActions};
        }
    }
}
