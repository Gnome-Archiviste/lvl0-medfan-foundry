import {LevelValue, Lvl0Character} from '../models/lvl0-character';
import {CharacterLevelData, selectCharacterLevelUpData} from './character-level-up-data-selector';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterLevel} from './character-selectors';
import {selectCharacterJobDefinition} from './character-job-definition-selector';
import {selectCharacterRaceDefinition} from './character-race-definition-selector';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {JobDefinition, RaceDefinition} from '../../../repositories';

export type MissingLevelData = {
    levelWithMissingData: number[],
    levelWithAdditionalPointInStat: number[],
    additionalMana: { value?: number, useStatValue?: string, diceCount?: number },
    additionalHealth: { value?: number, useStatValue?: string, diceCount?: number },
}

export class CharacterMissingLevelDataSelector {
    static computeMissingLevelData(
        level: LevelValue,
        levelUpData: CharacterLevelData[],
        job: JobDefinition | undefined,
        race: RaceDefinition | undefined
    ): MissingLevelData | undefined {
        if (!job) {
            return undefined
        }
        if (!race) {
            return undefined
        }

        let levelWithMissingData: number[] = [];
        for (let lvl = 1; lvl <= level.value; lvl++) {
            let data = levelUpData.find(x => x.level == lvl);
            if (data === undefined) {
                levelWithMissingData.push(lvl);
            }
        }

        if (levelWithMissingData.length === 0) {
            return undefined;
        }

        let missingLevelData: MissingLevelData = {
            levelWithAdditionalPointInStat: [],
            levelWithMissingData: levelWithMissingData,
            additionalMana: {},
            additionalHealth: {}
        }

        for (let lvl of levelWithMissingData) {
            missingLevelData.additionalHealth[lvl] = job.healthLevels[lvl - 1];
            missingLevelData.additionalMana[lvl] = job.manaLevels[lvl - 1];
            if (lvl % 20 == 0)
                missingLevelData.levelWithAdditionalPointInStat.push(lvl);
        }

        return missingLevelData;
    }
}


export function selectCharacterMissingLevelData(systemDataDatabaseService: SystemDataDatabaseService) {
    return function (source: Observable<Lvl0Character>): Observable<MissingLevelData | undefined> {
        return new Observable<MissingLevelData | undefined>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterLevel()),
                source.pipe(selectCharacterLevelUpData()),
                source.pipe(selectCharacterJobDefinition(systemDataDatabaseService)),
                source.pipe(selectCharacterRaceDefinition(systemDataDatabaseService)),
            ]).subscribe({
                next([level, levelUpData, job, race]: [LevelValue, CharacterLevelData[], JobDefinition | undefined, RaceDefinition | undefined]) {
                    subscriber.next(CharacterMissingLevelDataSelector.computeMissingLevelData(level, levelUpData, job, race));
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
