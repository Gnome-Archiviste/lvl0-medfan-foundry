import {CharacterDataComputer} from "./character-data-computer";
import {Lvl0Actor} from '../../lvl0-actor';
import {Lvl0ActorCharacterData} from '../../properties-data/lvl0-actor-character-data';
import {RaceRepository} from '../../../../repositories/race-repository';
import {JobRepository} from '../../../../repositories/job-repository';

export class BaseCharacterDataComputer extends CharacterDataComputer {
    override computeCharacter(actorData: Lvl0ActorCharacterData, actor: Lvl0Actor) {
        actorData.computedData.bases.race = RaceRepository.getRace(actorData.race.id);
        actorData.computedData.bases.job = JobRepository.getJob(actorData.job.id);
    }
}
