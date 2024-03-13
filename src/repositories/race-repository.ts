import races, {RaceDefinition, RaceDefinitionBase} from './data/races';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RaceRepository {
    private racesByIdsCache?: Record<string, RaceDefinition>
    private raceDefinitionCache?: Record<string, Record<string, RaceDefinition>>

    getRacesByCategories(): Record<string, Record<string, RaceDefinition>> {
        if (this.raceDefinitionCache)
            return this.raceDefinitionCache;

        let raceDefinitionCache: Record<string, Record<string, RaceDefinition>> = {};
        for (let [categoryId, raceCategory] of Object.entries(races)) {
            raceDefinitionCache[categoryId] = {};
            for (let [raceId, race] of Object.entries(raceCategory as Record<string, RaceDefinitionBase>)) {
                raceDefinitionCache[categoryId][raceId] = {...race, id: raceId};
            }
        }

        this.raceDefinitionCache = raceDefinitionCache;
        return raceDefinitionCache;
    }

    getRacesByIds(): Record<string, RaceDefinition> {
        if (this.racesByIdsCache)
            return this.racesByIdsCache;

        let racesByIds: Record<string, RaceDefinition> = {};
        for (let raceCategory of Object.values(races)) {
            for (let [raceId, race] of Object.entries(raceCategory as Record<string, RaceDefinitionBase>)) {
                racesByIds[raceId] = {...race, id: raceId};
            }
        }
        this.racesByIdsCache = racesByIds;
        return racesByIds;
    }

    getRace(id: string): RaceDefinition | undefined {
        return this.getRacesByIds()[id];
    }
}

