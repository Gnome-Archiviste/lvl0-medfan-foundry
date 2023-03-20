import {SpellDefinition} from '../../repositories';

export class Spell {
    readonly definition: SpellDefinition;
    readonly context: SpellContext;
    readonly computedData: ComputedSpellDataBeforeRoll;
}

export class SpellContext {
    arcaneLevel: number;
}

export class ComputedSpellDataBeforeRoll {
    effectiveCost: number;
    description?: string;
    distance?: string | RollableSpellValue;
    damage?: string | RollableSpellValue;
    bonus?: string | RollableSpellValue;
    duration?: string | RollableSpellValue;
    heal?: string | RollableSpellValue;
    area?: string | RollableSpellValue;
    resilience?: string | RollableSpellValue;
    criticalSuccess?: string | RollableSpellValue;
}

export class RollableSpellValue {
    constructor(
        public readonly formula: string,
        public readonly suffix?: string,
        public readonly unit?: string,
    ) {
    }

    toDisplayString() {
        let result = this.formula;
        if (this.unit)
            result += ' ' + this.unit
        if (this.suffix)
            result += ' (' + this.suffix + ')'
        return result;
    }
}
