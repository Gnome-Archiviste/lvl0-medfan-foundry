import {createSelector} from './selector-helper';
import {Lvl0Character} from '../models/lvl0-character';
import {ActorStatNames} from '../../../models/shared';

export type ActiveCharacterModifier = {
    entityId: string;
    isPermanent: boolean;
    stat: ActorStatNames;
    value: number;
    name: string;
}

export function selectCharacterModifiers() {
    return createSelector<Lvl0Character, ActiveCharacterModifier[]>(c => Object.entries(c.data.modifiers).map(([key, value]) => ({
        entityId: key,
        ...value
    })))
}
