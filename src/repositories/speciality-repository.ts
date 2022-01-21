import specialitiesDefinitions, {SpecialityDefinition} from './data/specialities';

export class SpecialityRepository {
    static specialitiesByIdsCache?: Record<string, SpecialityDefinition>;

    static getSpecialityFromId(specialityId: string): SpecialityDefinition {
        return {...specialitiesDefinitions[specialityId], id: specialityId};
    }

    static getSpecialitiesById(): Record<string, SpecialityDefinition> {
        if (SpecialityRepository.specialitiesByIdsCache)
            return SpecialityRepository.specialitiesByIdsCache;

        let specialitiesById = {};
        for (let [specialityId, speciality] of Object.entries(specialitiesDefinitions)) {
            specialitiesById[specialityId] = {...speciality, id: specialityId};
        }

        SpecialityRepository.specialitiesByIdsCache = specialitiesById;

        return specialitiesById;
    }
}
