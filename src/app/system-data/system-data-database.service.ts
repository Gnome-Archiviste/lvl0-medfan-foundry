import {Injectable} from '@angular/core';
import {JobRepository, RaceRepository, SpellRepository, WandConfigRepository} from '../../repositories';

@Injectable({
    providedIn: 'root'
})
export class SystemDataDatabaseService {
    constructor(
        public readonly jobRepository: JobRepository,
        public readonly raceRepository: RaceRepository,
        public readonly spellRepository: SpellRepository,
        public readonly wandConfigRepository: WandConfigRepository
    ) {
    }
}
