import {inject, singleton} from 'tsyringe';
import {CharacterDataComputer} from "./character-data-computer";
import {Lvl0Actor} from '../../lvl0-actor';
import {Lvl0ActorCharacterData} from '../../properties-data';
import {JobRepository, RaceRepository} from 'repositories';

@singleton()
export class BaseCharacterDataComputer extends CharacterDataComputer {

    constructor(
        @inject(RaceRepository) private readonly raceRepository: RaceRepository,
        @inject(JobRepository) private readonly jobRepository: JobRepository
    ) {
        super();
    }

    override computeCharacter(actorData: Lvl0ActorCharacterData, actor: Lvl0Actor) {
        actorData.computedData.bases.race = this.raceRepository.getRace(actorData.race.id);
        actorData.computedData.bases.job = this.jobRepository.getJob(actorData.job.id);
    }
}
