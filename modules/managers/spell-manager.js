import spellsDefinitions from "../../data/spells.js";

/**
 * @typedef SpellDefinition
 * @property {string} id
 * @property {string} name
 * @property {string} description
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
 * @property {string} text
 * @property {string} value
 * @property {string} unit
 */


/**
 * @typedef ActorSpell
 * @property {SpellDefinition} definition
 * @property {string} id
 * @property {string} name
 * @property {string} cost
 * @property {string} description
 * @property {string} distance
 * @property {string|null} damageFormula
 * @property {string|null} damageElement
 * @property {string|null} bonus
 * @property {string|null} healFormula
 * @property {string|null} duration
 * @property {string|null} area
 * @property {string|null} resilience
 * @property {string|null} criticalSuccess
 */

export class SpellManager {
    /**
     * @param {SpellDefinition} spellDefinition
     * @param {number} level
     * @param {string} spellCategory
     * @param {Lvl0CharacterData} actorData
     * @param {Object?} context
     * @return ActorSpell
     */
    static computeSpellForActor(spellDefinition, level, spellCategory, actorData, context) {
        let actorSpell = {
            id: spellCategory + '.' + level + '.' + spellDefinition.id,
            name: spellDefinition.name,
            description: undefined,
            cost: level.toString(),
            distance: SpellManager.computeSpellDistance(spellDefinition, actorData, context),
            duration: SpellManager.computeComplex(spellDefinition.duration, actorData, context),
            area: SpellManager.computeComplex(spellDefinition.area, actorData, context),
            criticalSuccess: SpellManager.computeComplex(spellDefinition.criticalSuccess, actorData, context),
            resilience: SpellManager.computeComplex(spellDefinition.resilience, actorData, context),
            bonus: SpellManager.computeComplex(spellDefinition.bonus, actorData, context),
            damageFormula: SpellManager.computeDamageFormula(spellDefinition.damage, actorData, context),
            healFormula: SpellManager.computeHealFormula(spellDefinition.heal, actorData, context),
            damageElement: spellDefinition.damage?.element,
            definition: spellDefinition
        };

        actorSpell.description = SpellManager.computeSpellDescription(actorSpell, spellDefinition, actorData, context);

        return actorSpell;
    }


    static reComputeSpellAfterRoll(actorSpell, actorData, context) {
        let updatedActorSpell = {
            ...actorSpell,
            distance: SpellManager.computeSpellDistance(actorSpell.definition, actorData, context),
            duration: SpellManager.computeComplex(actorSpell.duration, actorData, context),
            area: SpellManager.computeComplex(actorSpell.definition.area, actorData, context),
            criticalSuccess: SpellManager.computeComplex(actorSpell.definition.criticalSuccess, actorData, context),
            resilience: SpellManager.computeComplex(actorSpell.definition.resilience, actorData, context),
            damageFormula: SpellManager.computeDamageFormula(actorSpell.definition.damage, actorData, context),
            damageElement: actorSpell.definition.damage?.element,
        };

        updatedActorSpell.description = SpellManager.computeSpellDescription(updatedActorSpell, actorSpell.definition, actorData, context);

        return updatedActorSpell;
    }

    static computeSpellDescription(actorSpell, spellDefinition, actorData, context = {}) {
        if (typeof spellDefinition.description === 'string')
            return spellDefinition.description
                .replace('{{spell.area}}', `<em>${actorSpell.area}</em>`);
        if (spellDefinition.description.formula) {
            let wrap = body => "{ return (function(context) {" + body + "})(arguments[0]) };"
            let func = new Function(wrap(spellDefinition.description.formula));

            return func.call(null, {
                ...context,
                actorData
            });
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

        let availableSpells = [];

        for (let level = 1; level <= actorData.computedData.magic.arcaneLevel && level <= actorData.mana.value; level++) {
            if (!(level in spellsDefinitions[spellCategory]))
                continue;
            for (let spellDefinition of spellsDefinitions[spellCategory][level]) {
                availableSpells.push(SpellManager.computeSpellForActor(spellDefinition, level, spellCategory, actorData));
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
        let value = '';
        if (damageData.rollFormula) {
            return damageData.rollFormula;
        }
        if (damageData.formula) {
            let wrap = body => "{ return (function(context) {" + body + "})(arguments[0]) };"
            let func = new Function(wrap(damageData.formula));
            return func.call(null, {
                ...context,
                actorData
            });
        }

        return value;
    }

    static computeHealFormula(healData, actorData, context = {}) {
        if (!healData) {
            return undefined;
        }
        let value = '';
        if (healData.rollFormula) {
            return healData.rollFormula;
        }
        if (healData.formula) {
            let wrap = body => "{ return (function(context) {" + body + "})(arguments[0]) };"
            let func = new Function(wrap(healData.formula));
            return func.call(null, {
                ...context,
                actorData
            });
        }

        return value;
    }

    /**
     * @param {ComputableSpellValue} computable
     * @param {Lvl0CharacterData} actorData
     * @param {Object?} context
     * @return {string|undefined}
     */
    static computeComplex(computable, actorData, context) {
        if (!computable) {
            return undefined;
        }
        let value = undefined;
        if (computable.formula) {
            let wrap = body => "{ return (function(context) {" + body + "})(arguments[0]) };"
            let func = new Function(wrap(computable.formula));
            value = func.call(null, {
                ...context,
                actorData
            });
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
}
