import {Injectable} from '@angular/core';
import {
    ItemTypesConfigRepository,
    JobRepository,
    RaceRepository,
    SkillRepository, SpecialityRepository,
    SpellRepository,
    WandConfigRepository
} from '../../repositories';

@Injectable({
    providedIn: 'root'
})
export class SystemDataDatabaseService {
    constructor(
        public readonly jobRepository: JobRepository,
        public readonly raceRepository: RaceRepository,
        public readonly spellRepository: SpellRepository,
        public readonly specialityRepository: SpecialityRepository,
        public readonly wandConfigRepository: WandConfigRepository,
        public readonly skillRepository: SkillRepository,
    ) {
    }
}
