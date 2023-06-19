import {inject, singleton} from 'tsyringe';
import {CharacterDataComputer} from "./character-data-computer";
import {Lvl0FoundryActor} from '../../lvl0-foundry-actor';
import {JobRepository, RaceRepository} from 'repositories';
import {Lvl0CharacterData} from '../../../../app/data-accessor/models/lvl0-character';

@singleton()
export class BaseCharacterDataComputer extends CharacterDataComputer {

    constructor(
        @inject(RaceRepository) private readonly raceRepository: RaceRepository,
        @inject(JobRepository) private readonly jobRepository: JobRepository
    ) {
        super();
    }

    override computeCharacter(actorData: Lvl0CharacterData, actor: Lvl0FoundryActor) {
        actorData.computedData.bases.race = this.raceRepository.getRace(actorData.race.id);
        actorData.computedData.bases.job = this.jobRepository.getJob(actorData.job.id);
    }
}
