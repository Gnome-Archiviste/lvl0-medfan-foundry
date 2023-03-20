import {inject, singleton} from 'tsyringe';
import {ActorSpell, ActorSpellAction,} from './actor-spell.model';
import {Lvl0ActorEffectArmor, Lvl0ActorEffectModifier} from '../effects';
import {assertIsCharacter, Lvl0Actor} from 'models/actor';
import {
    ElementRepository,
    SpellActionMagicArmorDefinition,
    SpellDefinition,
    SpellDefinitionArea, SpellDefinitionCritical,
    SpellRepository
} from 'repositories';
import {
    AddEffectActionModifierDefinition,
    ComputableSpellValue,
    SpellActionDefinition,
    SpellClass,
    SpellHealDefinition
} from 'repositories/data';
import {RollFactory} from 'utils/roll-factory';
import {Evaluated} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/client/dice/roll';

/**
 * @deprecated
 */
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
    constructor(
        public readonly roll: Evaluated<Roll>,
        public readonly suffix?: string,
        public readonly unit?: string,
    ) {
    }

    toDisplayString() {
        let result = this.roll.total.toString();
        if (this.unit)
            result += ' ' + this.unit
        if (this.suffix)
            result += ' (' + this.suffix + ')'
        return result;
    }

    toDisplayDefinitionString() {
        let result = this.roll.formula;
        if (this.unit)
            result += ' ' + this.unit
        if (this.suffix)
            result += ' (' + this.suffix + ')'
        return result;
    }
}

@singleton()
export class SpellManager {

    constructor(
        @inject(RollFactory) private readonly rollFactory: RollFactory,
        @inject(SpellRepository) private readonly spellRepository: SpellRepository,
        @inject(ElementRepository) private readonly elementRepository: ElementRepository,
    ) {
    }

    async computeSpellForActor(
        spellDefinition: SpellDefinition,
        context: SpellContext
    ): Promise<ActorSpell> {
        try {
            let actorSpell: ActorSpell = {
                id: spellDefinition.id,
                actions: await this.computeActions(spellDefinition.actions, context, spellDefinition.icon),
                area: await this.computeArea(spellDefinition.area, context),
                bonus: await this.computeComplex(spellDefinition.bonus, context),
                cost: spellDefinition.level,
                criticalSuccess: await this.computeCritical(spellDefinition.criticalSuccess, context),
                damage: await this.computeDamageFormula(spellDefinition.damage, context),
                description: "",
                distance: this.computeSpellDistance(spellDefinition, context),
                duration: await this.computeComplex(spellDefinition.duration, context),
                heal: await this.computeHealFormula(spellDefinition.heal, context),
                icon: spellDefinition.icon,
                name: spellDefinition.name,
                resilience: await this.computeComplex(spellDefinition.resilience, context),
                definition: spellDefinition,
                dependsOnArcaneLevel: spellDefinition.dependsOnArcaneLevel
            };
            actorSpell.description = this.computeSpellDescription(actorSpell, spellDefinition, context);

            return actorSpell;
        } catch (e) {
            console.error(`Error while processing spell ${spellDefinition.id}`, e);
            return this.safeIncompleteSpell(spellDefinition);
        }
    }

    async safeIncompleteSpell(
        spellDefinition: SpellDefinition,
    ): Promise<ActorSpell> {
        return {
            id: spellDefinition.id,
            cost: spellDefinition.level,
            description: "",
            icon: spellDefinition.icon,
            name: spellDefinition.name,
            definition: spellDefinition,
            dependsOnArcaneLevel: spellDefinition.dependsOnArcaneLevel
        };
    }

    async reComputeSpellAfterRoll(actorSpell, context: SpellContext) {
        let updatedActorSpell = {
            ...actorSpell,
            actions: await this.computeActions(actorSpell.definition.actions, context, actorSpell.definition.icon),
            area: await this.computeArea(actorSpell.definition.area, context),
            bonus: await this.computeComplex(actorSpell.definition.bonus, context),
            criticalSuccess: await this.computeCritical(actorSpell.definition.criticalSuccess, context),
            damage: await this.computeDamageFormula(actorSpell.definition.damage, context),
            distance: this.computeSpellDistance(actorSpell.definition, context),
            duration: await this.computeComplex(actorSpell.definition.duration, context),
            heal: await this.computeHealFormula(actorSpell.definition.heal, context),
            resilience: await this.computeComplex(actorSpell.definition.resilience, context),
        };

        this.addAdditionalActions(actorSpell.definition.actions, context, updatedActorSpell)

        updatedActorSpell.description = this.computeSpellDescription(updatedActorSpell, actorSpell.definition, context);

        return updatedActorSpell;
    }

    async getComputedSpellForActorById(spellId: string, context: SpellContext): Promise<ActorSpell | undefined> {
        let spellDefinition = this.spellRepository.getSpellById(spellId);
        if (!spellDefinition)
            return undefined;
        return await this.computeSpellForActor(spellDefinition, context);
    }

    computeSpellDescription(actorSpell, spellDefinition, context = {}): string | undefined {
        if (typeof spellDefinition.description === 'string')
            return spellDefinition.description
                .replace('{{spell.area}}', `<em>${actorSpell.area}</em>`);
        if (spellDefinition.description.formula) {
            return this.computeFormula(spellDefinition.description.formula, context);
        }
        return undefined;
    }

    async getAvailableSpells(actor: Lvl0Actor, spellClass: SpellClass): Promise<ActorSpell[]> {
        assertIsCharacter(actor);
        let actorData = actor.data.data;
        if (!actorData.computedData.bases.job) {
            return [];
        }

        let specializations: string[];
        if (actorData.computedData.bases.job.spellSpecialization === 'useSpecializations') {
            specializations = actorData.job.specializations;
        } else if (actorData.computedData.bases.job.spellSpecialization) {
            specializations = [actorData.computedData.bases.job.spellSpecialization];
        } else {
            return [];
        }

        if (actorData.computedData.bases.job.spellClass != spellClass) {
            return [];
        }

        let actorSpells: ActorSpell[] = [];
        for (let specialization of specializations) {
            let specializationSpellsByLevels = this.spellRepository.getSpellsByLevels(spellClass, specialization);
            if (!specializationSpellsByLevels) {
                console.error(`Spell not found for class: ${spellClass} and spe: ${specialization}`)
                continue;
            }
            for (let [level, spellDefinitions] of Object.entries(specializationSpellsByLevels)) {
                if (+level > actorData.computedData.magic.arcaneLevel)
                    continue;
                if (+level > actorData.mana.value)
                    continue;
                for (let spellDefinition of spellDefinitions) {
                    let actorSpell = await this.computeSpellForActor(
                        spellDefinition,
                        SpellContext.fromActor(actor)
                    );
                    actorSpells.push(actorSpell);
                }
            }
        }
        return actorSpells;
    }

    computeSpellDistance(spellDefinition: SpellDefinition, context = {}): string | RolledSpellStat | undefined {
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

    pluralize(unit) {
        if (unit.endsWith('s'))
            return unit;
        return unit + 's';
    }

    async computeDamageFormula(damageData, context = {}): Promise<string | RolledSpellStat | undefined> {
        if (!damageData) {
            return undefined;
        }
        if (damageData.rollFormula) {
            let rollFormula = this.computeFormula(damageData.rollFormula, context);
            let roll = await this.rollFactory.createRoll(rollFormula);
            let rolledSpellStat = new RolledSpellStat(roll, this.elementRepository.getElementName(damageData.element));
            rolledSpellStat.roll.terms.forEach(t => t.options.flavor = damageData.element);
            return rolledSpellStat;
        }
        if (damageData.formula) {
            let value = this.computeFormula(damageData.formula, context);
            if (damageData.element)
                value += '(' + this.elementRepository.getElementName(damageData.element) + ')';
            return value;
        }
        if (damageData.text) {
            return damageData.text;
        }

        return undefined;
    }

    async computeHealFormula(healData: SpellHealDefinition | undefined, context = {}): Promise<RolledSpellStat | string | undefined> {
        if (!healData) {
            return undefined;
        }
        if (healData.rollFormula) {
            let rollFormula = this.computeFormula(healData.rollFormula, context);
            let roll = await this.rollFactory.createRoll(rollFormula);
            return new RolledSpellStat(roll);
        }
        if (healData.formula) {
            return this.computeFormula(healData.formula, context);
        }

        return undefined;
    }

    async computeArea(areaDefinition: SpellDefinitionArea, context: SpellContext): Promise<string>;
    async computeArea(areaDefinition: SpellDefinitionArea | undefined, context: SpellContext): Promise<undefined>;
    async computeArea(
        areaDefinition: SpellDefinitionArea | undefined,
        context: SpellContext
    ): Promise<string | undefined> {
        try {
            if (!areaDefinition) {
                return undefined;
            }
            if (context.criticalSuccess && areaDefinition.criticalSuccessArea) {
                return await this.computeArea(areaDefinition.criticalSuccessArea, context)
            }
            let value: string | undefined = undefined;
            if (areaDefinition.height && areaDefinition.width && areaDefinition.heightPerArcane && areaDefinition.widthPerArcane) {
                let width = areaDefinition.width + (areaDefinition.widthPerArcane * context.arcaneLevel)
                let height = areaDefinition.height + (areaDefinition.heightPerArcane * context.arcaneLevel)
                value = width + ' x ' + height + ' mètres';
            } else if (areaDefinition.height && areaDefinition.width) {
                value = areaDefinition.width + ' x ' + areaDefinition.height + ' mètres';
            } else if (areaDefinition.text) {
                value = areaDefinition.text;
            }
            if (areaDefinition.comment) {
                value = value + ' (' + areaDefinition.comment + ')';
            }
            return value;
        } catch (e) {
            throw new Error("Error during computeArea for data " + JSON.stringify(areaDefinition) + "\n" + e + "\n" + e.stack + "\n")
        }
    }

    async computeComplex(
        computable: ComputableSpellValue | undefined,
        context: SpellContext
    ): Promise<string | RolledSpellStat | undefined> {
        try {
            if (!computable) {
                return undefined;
            }
            let value: string | undefined = undefined;
            if (computable.formula) {
                value = this.computeFormula(computable.formula, context);
            } else if (computable.rollFormula) {
                let rollFormula = this.computeFormula(computable.rollFormula, context);
                let roll = await this.rollFactory.createRoll(rollFormula);
                return new RolledSpellStat(roll, undefined, computable.unit);
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

    async computeCritical(
        computable: SpellDefinitionCritical | undefined,
        context: SpellContext
    ): Promise<string | RolledSpellStat | undefined> {
        try {
            if (!computable) {
                return undefined;
            }
            if (computable.area) {
                return 'Zone = ' + await this.computeArea(computable.area, context);
            }
           return await this.computeComplex(computable, context);
        } catch (e) {
            throw new Error("Error during computeComplex for data " + JSON.stringify(computable) + "\n" + e + "\n" + e.stack + "\n")
        }
    }

    computeFormula(body, context) {
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

    computeModifier(modifier: AddEffectActionModifierDefinition, context): Lvl0ActorEffectModifier {
        let computedModifier: Lvl0ActorEffectModifier = {value: 0};
        if (modifier.stat)
            computedModifier.stat = modifier.stat;
        if (modifier.skill)
            computedModifier.skill = modifier.skill;
        if (modifier.valueFormula) {
            computedModifier.value = this.computeFormula(modifier.valueFormula, context);
        } else if (modifier.value) {
            computedModifier.value = modifier.value;
        }
        return computedModifier;
    }

    async computeActions(
        actions: { [actionKey: string]: SpellActionDefinition },
        context: SpellContext,
        spellIcon: string
    )
        : Promise<{ [actionKey: string]: ActorSpellAction } | undefined> {
        if (!actions)
            return undefined;
        let computedActions = {};

        for (let [key, action] of Object.entries(actions)) {
            let magicArmor: Lvl0ActorEffectArmor | undefined;
            if (action.data.magicArmor) {
                magicArmor = await this.computeMagicArmor(action.data.magicArmor, context);
            }
            computedActions[key] = {
                name: action.name,
                type: action.type,
                data: {
                    effectName: action.data.effectName,
                    duration: await this.computeComplex(action.data.duration, context),
                    icon: action.data.icon || spellIcon,
                    modifiers: action.data.modifiers?.map(m => this.computeModifier(m, context)) || [],
                    magicArmor
                }
            } as ActorSpellAction;
        }

        return computedActions;
    }

    addAdditionalActions(actions, context, actorSpell) {
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

    getRollsInSpell(spell: ActorSpell): Evaluated<Roll>[] {
        let rolls: Evaluated<Roll>[] = [];

        if (spell.distance instanceof RolledSpellStat)
            rolls.push(spell.distance.roll);
        if (spell.damage instanceof RolledSpellStat)
            rolls.push(spell.damage.roll);
        if (spell.bonus instanceof RolledSpellStat)
            rolls.push(spell.bonus.roll);
        if (spell.healFormula instanceof RolledSpellStat)
            rolls.push(spell.healFormula.roll);
        if (spell.duration instanceof RolledSpellStat)
            rolls.push(spell.duration.roll);
        if (spell.heal instanceof RolledSpellStat)
            rolls.push(spell.heal.roll);
        if (spell.area instanceof RolledSpellStat)
            rolls.push(spell.area.roll);
        if (spell.resilience instanceof RolledSpellStat)
            rolls.push(spell.resilience.roll);
        if (spell.criticalSuccess instanceof RolledSpellStat)
            rolls.push(spell.criticalSuccess.roll);

        return rolls;
    }

    private async computeMagicArmor(magicArmor: SpellActionMagicArmorDefinition, context: SpellContext): Promise<Lvl0ActorEffectArmor | undefined> {
        let value: number;
        if (magicArmor.value) {
            value = magicArmor.value;
        } else if (magicArmor.rollFormula) {
            let rollFormula = this.computeFormula(magicArmor.rollFormula, context);
            let roll = await this.rollFactory.createRoll(rollFormula);
            value = roll.total;
        } else if (magicArmor.formula) {
            value = this.computeFormula(magicArmor.formula, context);
        } else {
            return undefined;
        }
        return {
            remainingArmorPoint: value,
            totalArmorPoint: value
        } as Lvl0ActorEffectArmor;
    }
}
