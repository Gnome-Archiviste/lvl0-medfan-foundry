import * as marked from 'marked';
import {
    ActorSpell,
    ActorSpellAction,
} from './actor-spell.model';
import {Lvl0ActorEffectModifier} from '../effects/lvl0-actor-effect';
import {Lvl0Actor} from '../../models/actor/lvl0-actor';
import {SpellRepository} from '../../repositories/spell-repository';
import {ElementRepository} from '../../repositories/element-repository';
import {SpellClass} from '../../repositories/data/jobs';
import {assertIsCharacter} from '../../models/actor/properties/character-properties';
import {SpellActionDefinition, SpellDefinition, SpellHealDefinition} from '../../repositories/data/spells';

export class SpellContext {
    arcaneLevel: number;
    epicFail?: boolean;
    criticalSuccess?: boolean;

    static fromActor(actor: Lvl0Actor): SpellContext {
        let spellContext = new SpellContext();
        if (actor.data.type === 'character') {
            spellContext.arcaneLevel = actor.data.data.computedData.magic.arcaneLevel;
        }
        return spellContext;
    }
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
        spellClass: string,
        speciality: string,
        context: SpellContext
    ): Promise<ActorSpell> {
        let spellId = spellClass + '.' + speciality + '.' + level + '.' + spellDefinition.id;

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
            return SpellManager.safeIncompleteSpell(spellDefinition, level, spellClass, speciality);
        }
    }

    static async safeIncompleteSpell(
        spellDefinition: SpellDefinition,
        level: number,
        spellClass: string,
        speciality: string
    ): Promise<ActorSpell> {
        let spellId = spellClass + '.' + speciality + '.' + level + '.' + spellDefinition.id;
        return {
            id: spellId,
            cost: level,
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

    static async getComputedSpellForActorById(spellId: string, context: SpellContext): Promise<ActorSpell | undefined> {
        let spellDefinition = SpellRepository.getSpellById(spellId);
        if (!spellDefinition)
            return undefined;
        let [spellClass, speciality, level] = spellId.split('.', 4);
        return await this.computeSpellForActor(spellDefinition, +level, spellClass, speciality, context);
    }

    static computeSpellDescription(actorSpell, spellDefinition, context = {}): string | undefined {
        if (typeof spellDefinition.description === 'string')
            return spellDefinition.description
                .replace('{{spell.area}}', `<em>${actorSpell.area}</em>`);
        if (spellDefinition.description.formula) {
            return this.computeFormula(spellDefinition.description.formula, context);
        }
        return undefined;
    }

    static async getAvailableSpells(actor: Lvl0Actor, spellClass: SpellClass): Promise<ActorSpell[]> {
        assertIsCharacter(actor);
        let actorData = actor.data.data;

        let specialities: string[];
        if (actorData.computedData.bases.job.spellSpecialization === 'useSpecializations') {
            specialities = actorData.job.specializations;
        } else if (actorData.computedData.bases.job.spellSpecialization) {
            specialities = [actorData.computedData.bases.job.spellSpecialization];
        } else {
            return [];
        }

        if (actor.data.data.computedData.bases.job.spellClass != spellClass) {
            return [];
        }

        let actorSpells: ActorSpell[] = [];
        for (let speciality of specialities) {
            let specialitySpellsByLevels = SpellRepository.getSpellsByLevels(spellClass, speciality);
            for (let [level, spellDefinitions] of Object.entries(specialitySpellsByLevels)) {
                if (+level > actorData.computedData.magic.arcaneLevel)
                    continue;
                if (+level > actorData.mana.value)
                    continue;
                for (let spellDefinition of spellDefinitions) {
                    let actorSpell = await SpellManager.computeSpellForActor(
                        spellDefinition,
                        +level,
                        spellClass,
                        speciality,
                        SpellContext.fromActor(actor)
                    );
                    actorSpells.push(actorSpell);
                }
            }
        }
        return actorSpells;
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
            let rolledSpellStat = new RolledSpellStat(rollFormula, ElementRepository.getElementName(damageData.element));
            await rolledSpellStat.evaluateRoll();
            rolledSpellStat.roll.terms.forEach(t => t.options.flavor = damageData.element);
            return rolledSpellStat;
        }
        if (damageData.formula) {
            let value = this.computeFormula(damageData.formula, context);
            if (damageData.element)
                value += '(' + ElementRepository.getElementName(damageData.element) + ')';
            return value;
        }
        if (damageData.text) {
            return damageData.text;
        }

        return undefined;
    }

    static async computeHealFormula(healData: SpellHealDefinition | undefined, context = {}): Promise<RolledSpellStat | string | undefined> {
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
        actions: { [actionKey: string]: SpellActionDefinition },
        context: SpellContext
    )
        : Promise<{ [actionKey: string]: ActorSpellAction } | undefined> {
        if (!actions)
            return undefined;
        let computedActions = {};

        for (let [key, action] of Object.entries(actions)) {
            computedActions[key] = <ActorSpellAction>{
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

    static getRollsInSpell(spell: ActorSpell): Roll[] {
        let rolls: Roll[] = [];

        if (spell.distance instanceof  RolledSpellStat)
            rolls.push(spell.distance.roll);
        if (spell.damage instanceof  RolledSpellStat)
            rolls.push(spell.damage.roll);
        if (spell.bonus instanceof  RolledSpellStat)
            rolls.push(spell.bonus.roll);
        if (spell.healFormula instanceof  RolledSpellStat)
            rolls.push(spell.healFormula.roll);
        if (spell.duration instanceof  RolledSpellStat)
            rolls.push(spell.duration.roll);
        if (spell.heal instanceof  RolledSpellStat)
            rolls.push(spell.heal.roll);
        if (spell.area instanceof  RolledSpellStat)
            rolls.push(spell.area.roll);
        if (spell.resilience instanceof  RolledSpellStat)
            rolls.push(spell.resilience.roll);
        if (spell.criticalSuccess instanceof  RolledSpellStat)
            rolls.push(spell.criticalSuccess.roll);

        return rolls;
    }
}
