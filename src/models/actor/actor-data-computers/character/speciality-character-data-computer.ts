import {CharacterDataComputer} from "./character-data-computer";
import {Lvl0Actor} from '../../lvl0-actor';
import {Lvl0ActorCharacterData} from '../../properties-data/lvl0-actor-character-data';
import {SpecialityDefinition} from '../../../../repositories/data/specialities';
import {SpecialityRepository} from '../../../../repositories/speciality-repository';

export class SpecialityCharacterDataComputer extends CharacterDataComputer {

    override computeCharacter(actorData: Lvl0ActorCharacterData, actor: Lvl0Actor) {
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
            let speciality = SpecialityRepository.getSpecialityFromId(specialityId);
            if (speciality) {
                knownSpecialities.push(speciality);
            } else {
                console.error('unknown speciality: ' + specialityId);
            }
        }

        actorData.computedData.speciality.knownSpecialities = knownSpecialities;
        actorData.computedData.speciality.maxSpecialities = specialitiesCount;
        actorData.computedData.speciality.canSelectNewSpeciality = specialitiesCount > Object.entries(actorData.specialities).length;
    }
}
