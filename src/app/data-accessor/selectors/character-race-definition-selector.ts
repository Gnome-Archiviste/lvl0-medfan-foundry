import {Lvl0Character} from '../models/lvl0-character';
import {RaceDefinition} from '../../../repositories';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {createSelector} from './selector-helper';

export class CharacterRaceDefinitionSelector {
    static getRaceDefinition(
        systemDataDatabaseService: SystemDataDatabaseService,
        character: Lvl0Character,
    ): RaceDefinition | undefined {
        return systemDataDatabaseService.raceRepository.getRace(character.system.race.id);
    }
}

export function selectCharacterRaceDefinition(systemDataDatabaseService: SystemDataDatabaseService) {
    return createSelector<Lvl0Character, RaceDefinition | undefined>(
        character => CharacterRaceDefinitionSelector.getRaceDefinition(systemDataDatabaseService, character)
    )
}
