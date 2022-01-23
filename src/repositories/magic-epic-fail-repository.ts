import {singleton} from 'tsyringe';
import magicEpicFailEffects from './data/magic-epic-fail-effects';

export interface MagicEpicFailDefinition {
    name: string;
    description: string;
}

@singleton()
export class MagicEpicFailRepository {
    getMagicEpicFailEffect(rollValue: number): MagicEpicFailDefinition {
        return magicEpicFailEffects[rollValue];
    }
}
