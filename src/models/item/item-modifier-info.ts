import {ActorStatNames} from '../shared';

export interface ItemModifierInfo {
    stat: ActorStatNames;
    value: number;
    operation: 'ADD' | 'MULTIPLY';
}

