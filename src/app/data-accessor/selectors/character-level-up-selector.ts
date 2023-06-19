import {LevelValue, Lvl0Character} from '../models/lvl0-character';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {
    selectCharacterExperience,
    selectCharacterInitialBasicStatValues, selectCharacterLevel,
    selectNextLevelExperience
} from './character-selectors';
import {ActorBasicStatValues} from './character-basic-stats-selector';
import {selectCharacterJobDefinition} from './character-job-definition-selector';
import {selectCharacterRaceDefinition} from './character-race-definition-selector';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {JobDefinition, RaceDefinition} from '../../../repositories';

export class CharacterCanLevelUpSelector {
    static computeCanLevelUp(
        level: LevelValue,
        initialStats: ActorBasicStatValues,
        job: JobDefinition | undefined,
        race: RaceDefinition | undefined,
        experience: number,
        nextLevelExperience: number,
    ): boolean {
        if (level.value >= 70)
            return false;
        if (!job)
            return false;
        if (!race)
            return false;
        if (initialStats.dex === 0)
            return false;
        if (initialStats.cha === 0)
            return false;
        if (initialStats.int === 0)
            return false;
        if (initialStats.per === 0)
            return false;
        if (initialStats.phy === 0)
            return false;

        return experience >= nextLevelExperience;
    }
}

export function selectCharacterCanLevelUp(systemDataDatabaseService: SystemDataDatabaseService) {
    return function (source: Observable<Lvl0Character>): Observable<boolean> {
        return new Observable<boolean>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterLevel()),
                source.pipe(selectCharacterInitialBasicStatValues()),
                source.pipe(selectCharacterJobDefinition(systemDataDatabaseService)),
                source.pipe(selectCharacterRaceDefinition(systemDataDatabaseService)),
                source.pipe(selectCharacterExperience()),
                source.pipe(selectNextLevelExperience()),
            ]).subscribe({
                next([level, initialStats, job, race, experience, nextLevelExperience]: [LevelValue, ActorBasicStatValues, JobDefinition | undefined, RaceDefinition | undefined, number, number]) {
                    subscriber.next(CharacterCanLevelUpSelector.computeCanLevelUp(level, initialStats, job, race, experience, nextLevelExperience));
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
