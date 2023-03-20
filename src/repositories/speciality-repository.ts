import {singleton} from 'tsyringe';
import specialitiesDefinitions, {SpecialityDefinition} from './data/specialities';
import {Injectable} from '@angular/core';

@singleton()
@Injectable({
    providedIn: 'root'
})
export class SpecialityRepository {
    specialitiesByIdsCache?: Record<string, SpecialityDefinition>;

    getSpecialityFromId(specialityId: string): SpecialityDefinition {
        return {...specialitiesDefinitions[specialityId], id: specialityId};
    }

    getSpecialitiesById(): Record<string, SpecialityDefinition> {
        if (this.specialitiesByIdsCache)
            return this.specialitiesByIdsCache;

        let specialitiesById = {};
        for (let [specialityId, speciality] of Object.entries(specialitiesDefinitions)) {
            specialitiesById[specialityId] = {...speciality, id: specialityId};
        }

        this.specialitiesByIdsCache = specialitiesById;

        return specialitiesById;
    }
}
