import {Injectable} from '@angular/core';
import {
    ComputableSpellValue,
    ElementRepository,
    SpellDefinition,
    SpellDefinitionArea,
    SpellDefinitionCritical,
    SpellHealDefinition,
    SpellRepository
} from '../../repositories';
import {RollableSpellValue, Spell, SpellContext} from './spell';

@Injectable({
    providedIn: 'root'
})
export class SpellUtil {

    constructor(
        private readonly spellRepository: SpellRepository,
        private readonly elementRepository: ElementRepository,
    ) {
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

}
