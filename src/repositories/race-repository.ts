import races, {RaceDefinition} from './data/races';
import {throwAndError} from '../utils/error';

export class RaceRepository {
    private static racesByIdsCache?: Record<string, RaceDefinition>

    static getRacesByCategories(): Record<string, Record<string, RaceDefinition>> {
        return races;
    }

    static getRacesByIds(): Record<string, RaceDefinition> {
        if (RaceRepository.racesByIdsCache)
            return RaceRepository.racesByIdsCache;

        let racesByIds = {};
        for (let raceCategory of Object.values(races)) {
            for (let [raceId, race] of Object.entries(raceCategory as Record<string, RaceDefinition>)) {
                racesByIds[raceId] = race;
            }
        }
        RaceRepository.racesByIdsCache = racesByIds;
        return racesByIds;
    }

    static getRace(id: string): RaceDefinition {
        let race = RaceRepository.getRacesByIds()[id];
        if (!race)
            throwAndError(`Cannot find race ${id}`);
        return race;
    }
}

