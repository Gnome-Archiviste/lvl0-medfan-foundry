import {Injectable} from '@angular/core';
import {SpecialityService} from '../shared/speciality.service';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';

@Injectable()
export class FoundrySpecialityService extends SpecialityService {
    constructor(
        private readonly actorUpdaterService: ActorUpdaterService
    ) {
        super();
    }

    removeSpeciality(characterId: string, specialityEntityId: string): Promise<void> {
        this.actorUpdaterService.updateActor(characterId, {
            data: {
                specialities: {
                    ['-=' + specialityEntityId]: null as any
                }
            }
        })
        return Promise.resolve(undefined);
    }

}
