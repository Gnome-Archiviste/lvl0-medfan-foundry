import spellsDefinitions from './data/spells'
import {SpellDefinition} from '../managers/spell/spell-definition.model';
import {SpellClass} from './data/jobs';

export class SpellRepository {
    static getSpellById(spellId: string): SpellDefinition | undefined {
        let [spellClass, speciality, level, id] = spellId.split('.', 4);
        return spellsDefinitions[spellClass][speciality][level]?.find(s => s.id === id);
    }

    static getSpellsByLevels(spellClass: SpellClass, speciality): Record<number, SpellDefinition[]> {
        return spellsDefinitions[spellClass][speciality];
    }
}
