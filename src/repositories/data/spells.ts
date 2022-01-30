import mage from './spells/mage/mage.js';
import champion from "./spells/champion/champion";

export interface SpellData {
    readonly id: string;
    readonly icon: string;
    readonly name: string;
    readonly description: string;
    readonly actions: { [actionName: string]: SpellActionDefinition };
    readonly distance: SpellDefinitionDistance;
    readonly duration?: ComputableSpellValue;
    readonly area?: ComputableSpellValue;
    readonly bonus?: ComputableSpellValue;
    readonly resilience?: ComputableSpellValue;
    readonly criticalSuccess?: ComputableSpellValue;
    readonly damage?: SpellDamageDefinition;
    readonly heal?: SpellHealDefinition;
    readonly dependsOnArcaneLevel: boolean;
}

export interface SpellActionDefinition {
    readonly name: string;
    readonly type: 'addEffect';
    readonly data: AddEffectActionDefinitionData;
}

export interface AddEffectActionDefinitionData {
    readonly effectName: string;
    readonly icon?: string;
    readonly duration?: ComputableSpellValue;
    readonly modifiers?: AddEffectActionModifierDefinition[];
    readonly magicArmor?: SpellActionMagicArmorDefinition;
}

export interface SpellActionMagicArmorDefinition {
    readonly rollFormula?: string;
    readonly formula?: string;
    readonly value?: number
}

export interface AddEffectActionModifierDefinition {
    readonly stat?: string;
    readonly skill?: string;
    readonly valueFormula?: string;
    readonly value?: number;
}

export interface SpellDamageDefinition {
    readonly rollFormula: string | null;
    readonly element: string | null;
}

export interface SpellHealDefinition {
    readonly rollFormula?: string;
    readonly formula?: string;
}

export interface SpellDefinitionDistance {
    readonly type: 'self' | 'touch';
    readonly formula?: string;
    readonly value?: number;
    readonly text?: string;
    readonly unit?: string;
}

export interface ComputableSpellValue {
    readonly formula?: string;
    readonly rollFormula?: string;
    readonly text?: string;
    readonly value?: string;
    readonly unit?: string;
}

export default {
    mage: mage as Record<string, Record<number, SpellData[]>>,
    champion: champion as Record<string, Record<number, SpellData[]>>
}
