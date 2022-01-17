import spellsDefinitions from "../../../data/spells.js";
import {ElementsUtil} from "../../utils/elements-util.js";
import * as marked from 'marked';
import {ActorSpell, ActorSpellActionDefinition, SpellActionDefinition, SpellDefinition} from './spell-definition.model';
import {Lvl0CharacterData} from '../../models/character/character';
import {Lvl0ActorEffectModifier} from '../effects/lvl0-actor-effect';

export interface SpellContext {
    arcaneLevel: number;
    epicFail?: boolean;
    criticalSuccess?: boolean;
}

export class RolledSpellStat {
    private _roll?: Roll;

    constructor(
        private readonly rollFormula: string,
        private readonly suffix?: string,
        private readonly unit?: string
    ) {
        this.rollFormula = rollFormula;
        this.suffix = suffix;
        this.unit = unit;
    }

    async evaluateRoll() {
        try {
            this._roll = await new Roll(this.rollFormula).roll({async: true});
        } catch (e) {
            throw new Error(`Failed to evaluate roll with formula: '${this.rollFormula}': ${e}`)
        }
    }

    get roll(): Roll {
        if (!this._roll)
            throw new Error('Call evaluateRoll() before');
        return this._roll;
    }

    toDisplayString() {
        if (!this._roll?.total)
            throw new Error('Call evaluateRoll() before');
        let result = this._roll.total.toString();
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
    static async computeSpellForActor(
        spellDefinition: SpellDefinition,
        level: number,
        spellCategory: string,
        speciality: string,
        context: SpellContext
    ): Promise<ActorSpell> {
        let spellId = spellCategory + '.' + speciality + '.' + level + '.' + spellDefinition.id;

        try {
            let actorSpell: ActorSpell = {
                id: spellId,
                actions: await SpellManager.computeActions(spellDefinition.actions, context),
                area: await SpellManager.computeComplex(spellDefinition.area, context),
                bonus: await SpellManager.computeComplex(spellDefinition.bonus, context),
                cost: level,
                criticalSuccess: await SpellManager.computeComplex(spellDefinition.criticalSuccess, context),
                damage: await SpellManager.computeDamageFormula(spellDefinition.damage, context),
                description: "",
                distance: SpellManager.computeSpellDistance(spellDefinition, context),
                duration: await SpellManager.computeComplex(spellDefinition.duration, context),
                heal: await SpellManager.computeHealFormula(spellDefinition.heal, context),
                icon: spellDefinition.icon,
                name: spellDefinition.name,
                resilience: await SpellManager.computeComplex(spellDefinition.resilience, context),
                definition: spellDefinition,
            };
            actorSpell.description = marked.parse(SpellManager.computeSpellDescription(actorSpell, spellDefinition, context));

            return actorSpell;
        } catch (e) {
            console.error(`Error while processing spell ${spellId}`, e);
            ui.notifications?.error(`Erreur avec le sort ${spellId}`);
            return SpellManager.safeIncompleteSpell(spellDefinition, level, spellCategory, speciality, context);
        }
    }

    static async safeIncompleteSpell(spellDefinition, level, spellCategory, speciality, context: SpellContext): Promise<ActorSpell> {
        let spellId = spellCategory + '.' + speciality + '.' + level + '.' + spellDefinition.id;
        return {
            id: spellId,
            cost: level.toString(),
            description: "",
            icon: spellDefinition.icon,
            name: spellDefinition.name,
            definition: spellDefinition,
        };
    }

    static async reComputeSpellAfterRoll(actorSpell, context: SpellContext) {
        let updatedActorSpell = {
            ...actorSpell,
            actions: await SpellManager.computeActions(actorSpell.definition.actions, context),
            area: await SpellManager.computeComplex(actorSpell.definition.area, context),
            bonus: await SpellManager.computeComplex(actorSpell.definition.bonus, context),
            criticalSuccess: await SpellManager.computeComplex(actorSpell.definition.criticalSuccess, context),
            damage: await SpellManager.computeDamageFormula(actorSpell.definition.damage, context),
            distance: SpellManager.computeSpellDistance(actorSpell.definition, context),
            duration: await SpellManager.computeComplex(actorSpell.definition.duration, context),
            heal: await SpellManager.computeHealFormula(actorSpell.definition.heal, context),
            resilience: await SpellManager.computeComplex(actorSpell.definition.resilience, context),
        };

        SpellManager.addAdditionalActions(actorSpell.definition.actions, context, updatedActorSpell)

        updatedActorSpell.description = marked.parse(SpellManager.computeSpellDescription(updatedActorSpell, actorSpell.definition, context));

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
     * @param {Object} context
     * @return Promise<ActorSpell|undefined>
     */
    static async getComputedSpellForActorById(spellId, context: SpellContext) {
        let spellDefinition = this.getSpellById(spellId);
        if (!spellDefinition)
            return undefined;
        let [spellCategory, speciality, level, id] = spellId.split('.', 4);
        return await this.computeSpellForActor(spellDefinition, +level, spellCategory, speciality, context);
    }

    static computeSpellDescription(actorSpell, spellDefinition, context = {}) {
        if (typeof spellDefinition.description === 'string')
            return spellDefinition.description
                .replace('{{spell.area}}', `<em>${actorSpell.area}</em>`);
        if (spellDefinition.description.formula) {
            return this.computeFormula(spellDefinition.description.formula, context);
        }
        return undefined;
    }


    /**
     * @param {Actor} actor
     * @param {'mage'|'champion'} spellCategory
     * @return Promise<SpellDefinition[]>
     */
    static async getAvailableSpells(actor, spellCategory): Promise<ActorSpell[]> {
        /** @type {Lvl0CharacterData} */
        let actorData = actor.data.data;
        if (!(spellCategory in spellsDefinitions))
            return [];

        let speciality = 'general';
        if (spellCategory === 'mage') {
            if (actorData.computedData.bases.job.spellCategory === 'useSpecializations') {
                let availableSpells: ActorSpell[] = [];
                for (const specialization of actorData.job.specializations) {
                    let allCategorySpells = {};
                    let specializationSpells = spellsDefinitions.mage[specialization];
                    if (!specializationSpells) {
                        console.warn('No spell for specialization ' + specialization);
                        continue;
                    }
                    for (let level of Object.keys(specializationSpells)) {
                        allCategorySpells[level] = (allCategorySpells[level] || []).concat(specializationSpells[level]);
                    }
                    availableSpells = availableSpells.concat(await SpellManager.computeAvailableSpells(actorData, allCategorySpells, spellCategory, specialization));
                }
                return availableSpells;
            } else {
                speciality = actorData.computedData.bases.job.spellCategory;
                if (speciality in spellsDefinitions[spellCategory]) {
                    return await SpellManager.computeAvailableSpells(actorData, spellsDefinitions[spellCategory][speciality], spellCategory, speciality);
                }
                speciality = 'general';
            }
        }
        return await SpellManager.computeAvailableSpells(actorData, spellsDefinitions[spellCategory][speciality], spellCategory, speciality);
    }

    static async computeAvailableSpells(actorData, allCategorySpells, spellCategory, speciality): Promise<ActorSpell[]> {
        let availableSpells: ActorSpell[] = [];
        for (let level = 1; level <= actorData.computedData.magic.arcaneLevel && level <= actorData.mana.value; level++) {
            if (!(level in allCategorySpells))
                continue;
            for (let spellDefinition of allCategorySpells[level]) {
                availableSpells.push(await SpellManager.computeSpellForActor(spellDefinition, level, spellCategory, speciality, actorData));
            }
        }
        return availableSpells;
    }

    static computeSpellDistance(spellDefinition: SpellDefinition, context = {}): string | RolledSpellStat | undefined {
        if (!spellDefinition.distance) {
            return undefined;
        }
        let value = '';
        if (spellDefinition.distance.type) {
            switch (spellDefinition.distance.type) {
                case "self":
                    return 'Soi-même';
                case "touch":
                    return 'Toucher';
            }
        } else if (spellDefinition.distance.formula) {
            value = this.computeFormula(spellDefinition.distance.formula, context);
        } else if (spellDefinition.distance.value) {
            value = spellDefinition.distance.value.toString();
        } else if (spellDefinition.distance.text) {
            value = spellDefinition.distance.text;
        }


        if (spellDefinition.distance.unit) {
            if (+value > 1)
                value = value + ' ' + this.pluralize(spellDefinition.distance.unit)
            else
                value = value + ' ' + spellDefinition.distance.unit;
        }

        return value;
    }

    static pluralize(unit) {
        if (unit.endsWith('s'))
            return unit;
        return unit + 's';
    }

    static async computeDamageFormula(damageData, context = {}): Promise<string | RolledSpellStat | undefined> {
        if (!damageData) {
            return undefined;
        }
        if (damageData.rollFormula) {
            let rollFormula = this.computeFormula(damageData.rollFormula, context);
            let rolledSpellStat = new RolledSpellStat(rollFormula, ElementsUtil.getName(damageData.element));
            await rolledSpellStat.evaluateRoll();
            return rolledSpellStat;
        }
        if (damageData.formula) {
            let value = this.computeFormula(damageData.formula, context);
            if (damageData.element)
                value += '(' + ElementsUtil.getName(damageData.element) + ')';
            return value;
        }
        if (damageData.text) {
            return damageData.text;
        }

        return undefined;
    }

    /**
     *
     * @param {SpellHealDefinition|undefined} healData
     * @param {Lvl0CharacterData} actorData
     * @param {Object} context
     * @return {Promise<RolledSpellStat|string|undefined>}
     */
    static async computeHealFormula(healData, context = {}) {
        if (!healData) {
            return undefined;
        }
        if (healData.rollFormula) {
            let rollFormula = this.computeFormula(healData.rollFormula, context);
            let rolledSpellStat = new RolledSpellStat(rollFormula);
            await rolledSpellStat.evaluateRoll();
            return rolledSpellStat;
        }
        if (healData.formula) {
            return this.computeFormula(healData.formula, context);
        }

        return undefined;
    }

    /**
     * @param {ComputableSpellValue} computable
     * @param {Object?} context
     * @return {string|RolledSpellStat|null}
     */
    static async computeComplex(computable, context: SpellContext) {
        try {
            if (!computable) {
                return undefined;
            }
            let value: string | undefined = undefined;
            if (computable.formula) {
                value = this.computeFormula(computable.formula, context);
            } else if (computable.rollFormula) {
                let rollFormula = this.computeFormula(computable.rollFormula, context);
                let rolledSpellStat = new RolledSpellStat(rollFormula, undefined, computable.unit);
                await rolledSpellStat.evaluateRoll();
                return rolledSpellStat;
            } else if (computable.value) {
                value = computable.value;
            } else if (computable.text) {
                value = computable.text;
            }
            if (computable.unit) {
                value = value + ' ' + computable.unit;
            }
            return value;
        } catch (e) {
            throw new Error("Error during computeComplex for data " + JSON.stringify(computable) + "\n" + e + "\n" + e.stack + "\n")
        }
    }

    static computeFormula(body, context) {
        let wrap = body => "{ return (function(context) {" + body + "})(arguments[0]) };"
        try {
            let func = new Function(wrap(body));
            return func.call(null, {
                ...context
            });
        } catch (e) {
            console.error(e);
            console.error(body);
            ui.notifications?.error('Erreur dans la définition de la fonction, voir la console pour plus d\'infos');
        }
    }

    static computeModifier(modifier, context): Lvl0ActorEffectModifier {
        let computedModifier: Lvl0ActorEffectModifier = {value: 0};
        if ('stat' in modifier)
            computedModifier.stat = modifier.stat;
        if ('skill' in modifier)
            computedModifier.skill = modifier.skill;
        if (modifier.valueFormula) {
            computedModifier.value = this.computeFormula(modifier.valueFormula, context);
        } else if (modifier.value) {
            computedModifier.value = modifier.value;
        }
        return computedModifier;
    }

    static async computeActions(
        actions: {[actionKey: string]: SpellActionDefinition},
        context: SpellContext
    )
        : Promise<{ [actionKey: string]: ActorSpellActionDefinition } | undefined> {
        if (!actions)
            return undefined;
        let computedActions = {};

        for (let [key, action] of Object.entries(actions)) {
            computedActions[key] = <ActorSpellActionDefinition>{
                name: action.name,
                type: action.type,
                data: {
                    effectName: action.data.effectName,
                    duration: await this.computeComplex(action.data.duration, context),
                    modifiers: action.data.modifiers.map(m => this.computeModifier(m, context))
                }
            };
        }

        return computedActions;
    }

    static addAdditionalActions(actions, context, actorSpell) {
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
