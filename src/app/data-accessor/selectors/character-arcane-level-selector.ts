import {LevelValue, Lvl0Character} from '../models/lvl0-character';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterLevel} from './character-selectors';
import {JobDefinition} from '../../../repositories';
import {selectCharacterJobDefinition} from './character-job-definition-selector';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';

export class CharacterArcaneLevelSelector {
    static selectArcaneLevel(
        level: LevelValue,
        jobDefinition: JobDefinition | undefined,
    ): number {
        if (!jobDefinition)
            return 0;

        if (level.value >= 70)
            return 20;

        if (jobDefinition.arcaneLevels) {
            for (let i = jobDefinition.arcaneLevels.length - 1; i >= 0; i--) {
                if (level.value >= jobDefinition.arcaneLevels[i]) {
                    return i + 1;
                }
            }
        }

        return 0;
    }
}

export function selectCharacterArcaneLevel(systemDataDatabaseService: SystemDataDatabaseService) {
    return function (source: Observable<Lvl0Character>): Observable<number> {
        return new Observable<number>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterLevel()),
                source.pipe(selectCharacterJobDefinition(systemDataDatabaseService)),
            ]).subscribe({
                next([level, jobDefinition]) {
                    subscriber.next(CharacterArcaneLevelSelector.selectArcaneLevel(level, jobDefinition));
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
