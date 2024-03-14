import {Lvl0Character} from '../models/lvl0-character';
import {distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {JobDefinition} from '../../../repositories';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {createSelector} from './selector-helper';

export class CharacterJobDefinitionSelector {
    static getJobDefinition(
        systemDataDatabaseService: SystemDataDatabaseService,
        character: Lvl0Character,
    ): JobDefinition | undefined {
        return systemDataDatabaseService.jobRepository.getJob(character.system.job.id);
    }
}

export function selectCharacterJobDefinition(systemDataDatabaseService: SystemDataDatabaseService) {
    return createSelector<Lvl0Character, JobDefinition | undefined>(
        character => CharacterJobDefinitionSelector.getJobDefinition(systemDataDatabaseService, character)
    )
}
