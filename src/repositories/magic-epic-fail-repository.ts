import magicEpicFailEffects from './data/magic-epic-fail-effects';

export interface MagicEpicFailDefinition {
    name: string;
    description: string;
}

export class MagicEpicFailRepository {
    static getMagicEpicFailEffect(rollValue: number): MagicEpicFailDefinition {
        return magicEpicFailEffects[rollValue];
    }
}
