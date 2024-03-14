import {Lvl0Character} from '../models/lvl0-character';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {JobDefinition} from '../../../repositories';
import {selectCharacterJobDefinition} from './character-job-definition-selector';
import _ from 'lodash';

export class CharacterJobSpecializationsSelector {
    static getJobSpecializations(
        character: Lvl0Character,
        jobDefinition: JobDefinition | undefined,
    ): string[] {
        if (!jobDefinition)
            return [];

        if (jobDefinition.spellSpecialization === 'useSpecializations') {
            if (jobDefinition.specializations && jobDefinition.maxSpecializations) {
                if (character.system.job.specializations.length == jobDefinition.maxSpecializations) {
                    return character.system.job.specializations;
                }
                return jobDefinition.specializations.slice(0, jobDefinition.maxSpecializations);
            }
            return [];
        } else if (jobDefinition.spellSpecialization) {
            return [jobDefinition.spellSpecialization];
        } else {
            return [];
        }
    }
}

export function selectCharacterJobSpecializations(systemDataDatabaseService: SystemDataDatabaseService) {
    return function (source: Observable<Lvl0Character>): Observable<string[]> {
        return new Observable<string[]>(subscriber => {
            return combineLatest([
                source,
                source.pipe(selectCharacterJobDefinition(systemDataDatabaseService)),
            ]).subscribe({
                next([character, jobDefinition]) {
                    subscriber.next(CharacterJobSpecializationsSelector.getJobSpecializations(character, jobDefinition));
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        }).pipe(
            distinctUntilChanged((a, b) => _.isEqual(a, b)),
            shareReplay(1)
        );
    };
}
