import {singleton} from 'tsyringe';
import races, {RaceDefinition} from './data/races';
import {Injectable} from '@angular/core';

@singleton()
@Injectable({
    providedIn: 'root'
})
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

    getRace(id: string): RaceDefinition | undefined {
        return this.getRacesByIds()[id];
    }
}

