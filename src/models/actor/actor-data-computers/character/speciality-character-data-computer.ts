import {inject, singleton} from 'tsyringe';
import {CharacterDataComputer} from "./character-data-computer";
import {Lvl0Actor} from '../../lvl0-actor';
import {Lvl0ActorCharacterData} from '../../properties-data';
import {SpecialityDefinition, SpecialityRepository} from 'repositories';

@singleton()
export class SpecialityCharacterDataComputer extends CharacterDataComputer {

    constructor(
        @inject(SpecialityRepository) private readonly specialityRepository: SpecialityRepository
    ) {
        super();
    }

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
            let speciality = this.specialityRepository.getSpecialityFromId(specialityId);
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
