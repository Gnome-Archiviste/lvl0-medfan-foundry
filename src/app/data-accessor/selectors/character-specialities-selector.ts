import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {
    CharacterSpecialities,
    CharacterSpecialitiesInfo,
    CharacterSpeciality,
    LevelValue,
    Lvl0Character
} from '../models/lvl0-character';
import {JobDefinition} from '../../../repositories';
import {selectCharacterLevel, selectCharacterSpecialities} from './character-selectors';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterJobDefinition} from './character-job-definition-selector';

export class CharacterSpecialitiesSelector {
    static getSpecialityInfo(
        level: LevelValue,
        characterSpecialities: CharacterSpecialities,
        jobDefinition: JobDefinition | undefined,
        systemDataDatabaseService: SystemDataDatabaseService,
    ): CharacterSpecialitiesInfo {
        if  (!jobDefinition) {
            return {
                canSelectNewSpeciality: false,
                maxSpecialities: 0,
                specialities: []
            };
        }

        let specialities: CharacterSpeciality[] = [];
        for (let [entityId, specialityId] of Object.entries(characterSpecialities)) {
            let specialityDefinition = systemDataDatabaseService.specialityRepository.getSpecialityFromId(specialityId);
            specialities.push({
                entityId: entityId,
                speciality: specialityDefinition
            });
        }

        let specialityLevels = jobDefinition.specialityLevels;
        let specialitiesCount = 0;

        if (specialityLevels) {
            for (let i = specialityLevels.length - 1; i >= 0; i--) {
                if (level.value >= specialityLevels[i]) {
                    specialitiesCount = i + 1;
                    break;
                }
            }
        }

        return {
            specialities,
            maxSpecialities: specialitiesCount,
            canSelectNewSpeciality: specialitiesCount > specialities.length
        };
    }
}

export function selectCharacterSpecialityInfo(
    systemDataDatabaseService: SystemDataDatabaseService
) {
    return function (source: Observable<Lvl0Character>): Observable<CharacterSpecialitiesInfo> {
        return new Observable<CharacterSpecialitiesInfo>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterLevel()),
                source.pipe(selectCharacterSpecialities()),
                source.pipe(selectCharacterJobDefinition(systemDataDatabaseService)),
            ]).subscribe({
                next([level, characterSpecialities, jobDefinition]: [LevelValue, CharacterSpecialities, JobDefinition | undefined]) {
                    subscriber.next(CharacterSpecialitiesSelector.getSpecialityInfo(level, characterSpecialities, jobDefinition, systemDataDatabaseService));
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        }).pipe(
            distinctUntilChanged(),
            shareReplay(1)
        );
    };
}
