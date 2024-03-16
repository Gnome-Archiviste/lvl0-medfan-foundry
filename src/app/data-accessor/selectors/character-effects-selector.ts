import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {SkillDefinition} from '../../../repositories';
import {Lvl0Character} from '../models/lvl0-character';
import {createSelector} from './selector-helper';

export type CharacterEffect = {
    effectId: string;
    duration: string;
    effectName: string;
    icon: string;
    modifiers: CharacterEffectModifier[];
    magicArmor?: CharacterEffectArmor;
}

export interface CharacterEffectModifier {
    skill?: SkillDefinition;
    stat?: string;
    value: number;
    operation?: 'ADD' | 'MULTIPLY';
}

export interface CharacterEffectArmor {
    totalArmorPoint: number;
    remainingArmorPoint: number;
}

class CharacterEffectsSelector {
    static selectCharacterEffects(
        character: Lvl0Character,
        systemDataDatabaseService: SystemDataDatabaseService
    ): CharacterEffect[] {
        let characterEffects: CharacterEffect[] = [];
        for (let [effectId, effect] of Object.entries(character.system.effects ?? {})) {
            let characterEffect: CharacterEffect = {
                ...effect,
                effectId: effectId,
                modifiers: effect.modifiers.map(m => {
                    if (m.skill) {
                        return {
                            skill: systemDataDatabaseService.skillRepository.getSkillFromId(m.skill),
                            value: m.value
                        }
                    } else {
                        return {
                            stat: m.stat,
                            value: m.value
                        }
                    }
                })
            };
            characterEffects.push(characterEffect);
        }
        return characterEffects;
    }
}

export function selectCharacterEffects(systemDataDatabaseService: SystemDataDatabaseService) {
    return createSelector<Lvl0Character, CharacterEffect[]>(c => CharacterEffectsSelector.selectCharacterEffects(c, systemDataDatabaseService))
}

