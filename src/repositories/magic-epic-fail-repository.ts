import {singleton} from 'tsyringe';
import magicEpicFailEffects from './data/magic-epic-fail-effects';
import {Injectable} from '@angular/core';

export interface MagicEpicFailDefinition {
    name: string;
    description: string;
}

@singleton()
@Injectable({
    providedIn: 'root'
})
export class MagicEpicFailRepository {
    getMagicEpicFailEffect(rollValue: number): MagicEpicFailDefinition {
        return magicEpicFailEffects[rollValue];
    }
}
