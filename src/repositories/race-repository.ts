import {singleton} from 'tsyringe';
import races, {RaceDefinition} from './data/races';

@singleton()
export class RaceRepository {
    private racesByIdsCache?: Record<string, RaceDefinition>

    getRacesByCategories(): Record<string, Record<string, RaceDefinition>> {
        return races;
    }

    getRacesByIds(): Record<string, RaceDefinition> {
        if (this.racesByIdsCache)
            return this.racesByIdsCache;

        let racesByIds = {};
        for (let raceCategory of Object.values(races)) {
            for (let [raceId, race] of Object.entries(raceCategory as Record<string, RaceDefinition>)) {
                racesByIds[raceId] = race;
            }
        }
        this.racesByIdsCache = racesByIds;
        return racesByIds;
    }

    getRace(id: string): RaceDefinition {
        let race = this.getRacesByIds()[id];
        if (!race)
            throw new Error(`Cannot find race ${id}`);
        return race;
    }
}

