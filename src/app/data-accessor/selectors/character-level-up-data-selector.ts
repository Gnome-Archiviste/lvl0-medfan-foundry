import _ from 'lodash';
import {createSelector} from './selector-helper';
import {Lvl0Character} from '../models/lvl0-character';
import {ActorBasicStatNames} from '../../../models/shared';

export type CharacterLevelData = {
    level: number;
    health: number;
    mana: number;
    money: number;
    additionalStat?: ActorBasicStatNames;
}

export function selectCharacterLevelUpData() {
    return createSelector<Lvl0Character, CharacterLevelData[]>(c => {
        return Object.entries(c.data.levelUpData).filter(x => !isNaN(+x[0])).map(x => ({
            ...x[1],
            level: +x[0],
        } as CharacterLevelData)).sort((a, b) => a.level - b.level)
    }, _.isEqual)
}
