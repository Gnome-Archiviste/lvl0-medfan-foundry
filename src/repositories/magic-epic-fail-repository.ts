import magicEpicFailEffects from './data/magic-epic-fail-effects';
import {Injectable} from '@angular/core';
import {toDictionaryByKey} from '../utils/util';

export interface MagicEpicFailDefinition {
    id: string;
    name: string;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class MagicEpicFailRepository {
    private magicEpicFailEffectByIds?: Record<string, MagicEpicFailDefinition>;

    getMagicEpicFailEffect(rollValue: number): MagicEpicFailDefinition {
        return magicEpicFailEffects[rollValue];
    }

    getMagicEpicFailEffectByIds(): Record<string, MagicEpicFailDefinition> {
        if (!this.magicEpicFailEffectByIds)
            this.magicEpicFailEffectByIds = toDictionaryByKey(Object.values(magicEpicFailEffects), x => x.id);
        return this.magicEpicFailEffectByIds;
    }

    getMagicEpicFailEffectById(elementId: string) {
        return this.getMagicEpicFailEffectByIds()[elementId];
    }
}
