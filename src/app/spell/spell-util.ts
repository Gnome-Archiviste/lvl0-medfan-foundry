import {Injectable} from '@angular/core';
import {
    AddEffectActionModifierDefinition,
    ComputableSpellValue,
    ElementRepository,
    SpellActionDefinition,
    SpellActionMagicArmorDefinition,
    SpellDefinition,
    SpellDefinitionArea,
    SpellDefinitionCritical,
    SpellHealDefinition
} from '../../repositories';
import {
    ChatSpell,
    RollableSpellValue,
    RolledSpell,
    RolledSpellValue,
    RollSpellContext,
    Spell,
    SpellAction,
    SpellContext
} from './spell';
import {RollFactory} from '../shared/roll-factory';
import {Lvl0ActorEffectArmor, Lvl0ActorEffectModifier} from '../data-accessor/actor-effect.service';
import {IRoll} from '../shared/roll';

@Injectable({
    providedIn: 'root'
})
export class SpellUtil {
    constructor(
        private readonly rollFactory: RollFactory,
        private readonly elementRepository: ElementRepository,
    ) {
    }

    async rollSpell(
        spell: Spell,
        rollContext?: { epicFail?: boolean, criticalSuccess?: boolean }
    ): Promise<RolledSpell> {
        let context = {...spell.context, ...rollContext};
        let area = await this.rollSpellValue(this.computeArea(spell.definition.area, context));
        let rolledSpell: RolledSpell = {
            definition: spell.definition,
            context: context,
            data: {
                effectiveCost: spell.computedData.effectiveCost,
                area: area,
                description: this.computeSpellDescription(spell.definition, area, context),
                bonus: await this.rollSpellValue(this.computeComplex(spell.definition.bonus, context)),
                criticalSuccess: await this.rollSpellValue(this.computeCritical(spell.definition.criticalSuccess, context)),
                damage: await this.rollSpellValue(this.computeDamageFormula(spell.definition.damage, context)),
                distance: await this.rollSpellValue(this.computeSpellDistance(spell.definition, context)),
                duration: await this.rollSpellValue(this.computeComplex(spell.definition.duration, context)),
                heal: await this.rollSpellValue(this.computeHealFormula(spell.definition.heal, context)),
                resilience: await this.rollSpellValue(this.computeComplex(spell.definition.resilience, context)),
            }
        };
        let actions = await this.computeActions(spell.definition.actions, context, spell.definition.icon);
        let implicitActions = this.getImplicitActions(rolledSpell);
        rolledSpell.data.actions = [...actions, ...implicitActions];
        return rolledSpell
    }

    async computeActions(
        actions: { [actionKey: string]: SpellActionDefinition },
        context: SpellContext,
        spellIcon: string
    )  : Promise<SpellAction[]> {
        if (!actions)
            return [];
        let computedActions: SpellAction[] = [];

        for (let [key, action] of Object.entries(actions)) {
            let magicArmor: Lvl0ActorEffectArmor | undefined;
            if (action.data.magicArmor) {
                magicArmor = await this.computeMagicArmor(action.data.magicArmor, context);
            }
            computedActions.push({
                name: action.name,
                type: action.type,
                data: {
                    effectName: action.data.effectName,
                    duration: await this.computeComplex(action.data.duration, context),
                    icon: action.data.icon || spellIcon,
                    modifiers: action.data.modifiers?.map(m => this.computeModifier(m, context)) || [],
                    magicArmor
                }
            } as SpellAction);
        }

        return computedActions;
    }

    getImplicitActions(spell: RolledSpell): SpellAction[] {
        let actions: SpellAction[] = [];

        if (spell.data.heal && 'roll' in spell.data.heal) {
            actions.push({
                name: 'Soigner le token sélectionné',
                type: 'heal',
                data: {
                    value: spell.data.heal.roll.total,
                }
            })
        }

        return actions;
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

    private computeModifier(modifier: AddEffectActionModifierDefinition, context): Lvl0ActorEffectModifier {
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

    computeSpellValuesBeforeRoll(
        spellDefinition: SpellDefinition,
        context: SpellContext
    ): Spell {
        try {
            let area = this.computeArea(spellDefinition.area, context);
            return {
                definition: spellDefinition,
                context: {...context},
                computedData: {
                    effectiveCost: spellDefinition.level,
                    area: area,
                    bonus: this.computeComplex(spellDefinition.bonus, context),
                    criticalSuccess: this.computeCritical(spellDefinition.criticalSuccess, context),
                    damage: this.computeDamageFormula(spellDefinition.damage, context),
                    description: this.computeSpellDescription(spellDefinition, area, context),
                    distance: this.computeSpellDistance(spellDefinition, context),
                    duration: this.computeComplex(spellDefinition.duration, context),
                    heal: this.computeHealFormula(spellDefinition.heal, context),
                    resilience: this.computeComplex(spellDefinition.resilience, context),
                }
            } as Spell;
        } catch (e) {
            // FIXME: logger
            console.error(`Error while processing spell ${spellDefinition.id}`, e);
            return this.safeIncompleteSpell(spellDefinition, context);
        }
    }

    private safeIncompleteSpell(
        spellDefinition: SpellDefinition,
        context: SpellContext
    ): Spell {
        return {
            definition: spellDefinition,
            context: context,
            computedData: {
                effectiveCost: spellDefinition.level,
            }
        };
    }

    private computeSpellDescription(spellDefinition, area, context = {}): string | undefined {
        if (typeof spellDefinition.description === 'string')
            return spellDefinition.description.replace('{{spell.area}}', `<em>${area}</em>`);
        if (spellDefinition.description.formula) {
            return this.computeFormula(spellDefinition.description.formula, context);
        }
        return undefined;
    }

    private computeSpellDistance(spellDefinition: SpellDefinition, context = {}): string | RollableSpellValue | undefined {
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

    private computeDamageFormula(damageData, context = {}): string | RollableSpellValue | undefined {
        if (!damageData) {
            return undefined;
        }
        if (damageData.rollFormula) {
            let rollFormula = this.computeFormula(damageData.rollFormula, context);
            return new RollableSpellValue(rollFormula, this.elementRepository.getElementName(damageData.element));
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

    private computeHealFormula(healData: SpellHealDefinition | undefined, context = {}): RollableSpellValue | string | undefined {
        if (!healData) {
            return undefined;
        }
        if (healData.rollFormula) {
            let rollFormula = this.computeFormula(healData.rollFormula, context);
            return new RollableSpellValue(rollFormula);
        }
        if (healData.formula) {
            return this.computeFormula(healData.formula, context);
        }

        return undefined;
    }

    private computeArea(areaDefinition: SpellDefinitionArea, context: SpellContext): string;
    private computeArea(areaDefinition: SpellDefinitionArea | undefined, context: SpellContext): undefined;
    private computeArea(
        areaDefinition: SpellDefinitionArea | undefined,
        context: SpellContext
    ): string | undefined {
        try {
            if (!areaDefinition) {
                return undefined;
            }
            /*if (context.criticalSuccess && areaDefinition.criticalSuccessArea) {
                return this.computeArea(areaDefinition.criticalSuccessArea, context)
            }*/
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

    private computeComplex(
        computable: ComputableSpellValue | undefined,
        context: SpellContext
    ): string | RollableSpellValue | undefined {
        try {
            if (!computable) {
                return undefined;
            }
            let value: string | undefined = undefined;
            if (computable.formula) {
                value = this.computeFormula(computable.formula, context);
            } else if (computable.rollFormula) {
                return new RollableSpellValue(computable.rollFormula, undefined, computable.unit);
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

    private computeCritical(
        computable: SpellDefinitionCritical | undefined,
        context: SpellContext
    ): string | RollableSpellValue | undefined {
        try {
            if (!computable) {
                return undefined;
            }
            if (computable.area) {
                return 'Zone = ' + this.computeArea(computable.area, context);
            }
            return this.computeComplex(computable, context);
        } catch (e) {
            throw new Error("Error during computeComplex for data " + JSON.stringify(computable) + "\n" + e + "\n" + e.stack + "\n")
        }
    }

    private computeFormula(body, context) {
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

    private pluralize(unit) {
        if (unit.endsWith('s'))
            return unit;
        return unit + 's';
    }

    private async rollSpellValue(value: string | RollableSpellValue | undefined): Promise<RolledSpellValue | undefined> {
        if (value === undefined)
            return undefined;
        if (value instanceof RollableSpellValue) {
            let roll = await this.rollFactory.createRoll(value.formula);
            return {
                roll: roll,
                suffix: value.suffix,
                unit: value.unit,
            };
        }
        return {text: value};
    }

    getRollsInSpell(spell: RolledSpell): IRoll[] {
        let rolls: IRoll[] = [];

        if (spell.data.distance && 'roll' in spell.data.distance) {
            rolls.push(spell.data.distance.roll);
        }
        if (spell.data.damage && 'roll' in spell.data.damage) {
            rolls.push(spell.data.damage.roll);
        }
        if (spell.data.bonus && 'roll' in spell.data.bonus) {
            rolls.push(spell.data.bonus.roll);
        }
        if (spell.data.duration && 'roll' in spell.data.duration) {
            rolls.push(spell.data.duration.roll);
        }
        if (spell.data.heal && 'roll' in spell.data.heal) {
            rolls.push(spell.data.heal.roll);
        }
        if (spell.data.area && 'roll' in spell.data.area) {
            rolls.push(spell.data.area.roll);
        }
        if (spell.data.resilience && 'roll' in spell.data.resilience) {
            rolls.push(spell.data.resilience.roll);
        }
        if (spell.data.criticalSuccess && 'roll' in spell.data.criticalSuccess) {
            rolls.push(spell.data.criticalSuccess.roll);
        }

        return rolls;
    }
}
