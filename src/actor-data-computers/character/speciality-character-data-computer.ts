import {CharacterDataComputer} from "./character-data-computer.js";
import specialitiesDefinitions from "../../../data/specialities.js";
import {SpecialityDefinition} from '../../models/speciality/speciality-definition';

export class SpecialityCharacterDataComputer extends CharacterDataComputer {

    /**
     * @override
     */
    compute(actorData, actor) {
        let specialityLevels = actorData.computedData.bases.job?.specialityLevels;
        let specialitiesCount = 0;

        if (specialityLevels) {
            for (let i = specialityLevels.length - 1; i >= 0; i--) {
                if (actorData.level.value >= specialityLevels[i]) {
                    specialitiesCount = i + 1;
                    break;
                }
            }
        }
        let knownSpecialities: SpecialityDefinition[] = [];
        for (const specialityId of Object.values(actorData.specialities) as string[]) {
            if (specialityId in specialitiesDefinitions) {
                knownSpecialities.push({
                    ...specialitiesDefinitions[specialityId],
                    id: specialityId
                });
            } else {
                console.error('unknown speciality: ' + specialityId);
            }
        }

        actorData.computedData.speciality.knownSpecialities = knownSpecialities;
        actorData.computedData.speciality.maxSpecialities = specialitiesCount;
        actorData.computedData.speciality.canSelectNewSpeciality = specialitiesCount > Object.entries(actorData.specialities).length;
    }
}
