import {inject, singleton} from 'tsyringe';
import spellsDefinitions, {SpellData} from './data/spells'
import {SpellClass} from './data';
import {JobRepository} from './job-repository';

export interface SpellDefinition extends SpellData {
    readonly level: number;
    readonly specializationName: string;
}

@singleton()
export class SpellRepository {
    constructor(
        @inject(JobRepository) private readonly jobRepository: JobRepository
    ) {
    }

    private allSpellsCache?: Record<SpellClass, Record<string, Record<number, SpellDefinition[]>>>;
    private allSpellsListCache?: SpellDefinition[];

    getAllSpells(): Record<SpellClass, Record<string, Record<number, SpellDefinition[]>>> {
        if (this.allSpellsCache)
            return this.allSpellsCache;

        let allSpells: Record<SpellClass, Record<string, Record<number, SpellDefinition[]>>> = {mage: {}, champion: {}};

        for (let spellClass in spellsDefinitions) {
            allSpells[spellClass] = {};
            for (let specialization in spellsDefinitions[spellClass]) {
                allSpells[spellClass][specialization] = {};
                for (let level in spellsDefinitions[spellClass][specialization]) {
                    allSpells[spellClass][specialization][level] = spellsDefinitions[spellClass][specialization][level].map(s => ({
                        ...s,
                        id: spellClass + '.' + specialization + '.' + level + '.' + s.id,
                        level: level,
                        specializationName: this.getSpecializationName(spellClass as SpellClass, specialization)
                    }))
                }
            }
        }

        this.allSpellsCache = allSpells;
        return allSpells;
    }

    getSpellById(spellId: string): SpellDefinition | undefined {
        let [spellClass, specialization, level] = spellId.split('.', 4);
        if (!spellClass)
            return undefined;
        let spellsByClasses = this.getAllSpells()[spellClass];
        if (!spellsByClasses)
            return undefined;
        let spellBySpecializations = spellsByClasses[specialization];
        if (!spellBySpecializations)
            return undefined;
        let spellsByLevels = spellBySpecializations[level];
        if (!spellsByLevels)
            return undefined;
        return spellsByLevels?.find(s => s.id === spellId);
    }

    getSpellsByLevels(spellClass: SpellClass, specialization: string): Record<number, SpellDefinition[]> | undefined {
        let spellsByClasses = this.getAllSpells()[spellClass];
        if (!spellsByClasses)
            return undefined;
        let spellBySpecializations = spellsByClasses[specialization];
        if (!spellBySpecializations)
            return undefined;
        return spellBySpecializations;
    }

    getListOfAllSpells(): SpellDefinition[] {
        if (this.allSpellsListCache)
            return this.allSpellsListCache;

        let allSpellsList: SpellDefinition[] = [];
        let allSpells = this.getAllSpells();

        for (let spellClass in allSpells) {
            for (let specialization in allSpells[spellClass]) {
                for (let level in allSpells[spellClass][specialization]) {
                    allSpellsList.push(...allSpells[spellClass][specialization][level]);
                }
            }
        }

        this.allSpellsListCache = allSpellsList;
        return allSpellsList;
    }

    private getSpecializationName(spellClass: SpellClass, specialization: string) {
        for (let job of Object.values(this.jobRepository.getJobsByIds())) {
            if (job.spellClass != spellClass)
                continue;
            if (job.spellSpecialization == specialization)
                return job.name;
            if (job.spellSpecialization == 'useSpecializations' && job.specializations)
                for (let [key, name] of Object.entries(job.specializations)) {
                    if (key === specialization)
                        return name;
                }
        }
        return '';
    }
}
