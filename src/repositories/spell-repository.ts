import {singleton} from 'tsyringe';
import spellsDefinitions, {SpellDefinition} from './data/spells'
import {SpellClass} from './data';

@singleton()
export class SpellRepository {
    getSpellById(spellId: string): SpellDefinition | undefined {
        let [spellClass, speciality, level, id] = spellId.split('.', 4);
        return spellsDefinitions[spellClass][speciality][level]?.find(s => s.id === id);
    }

    getSpellsByLevels(spellClass: SpellClass, speciality): Record<number, SpellDefinition[]> {
        return spellsDefinitions[spellClass][speciality];
    }
}
