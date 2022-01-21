import {CharacterDataComputer} from "./character-data-computer.js";
import races, {RaceDefinition} from "../../../../../data/races";
import jobs, {JobDefinition} from "../../../../../data/jobs";
import {Lvl0Actor} from '../../lvl0-actor';
import {Lvl0ActorCharacterData} from '../../properties-data/lvl0-actor-character-data';

export class BaseCharacterDataComputer extends CharacterDataComputer {
    static racesByIds = {};
    static jobsByIds = {};

    override computeCharacter(actorData: Lvl0ActorCharacterData, actor: Lvl0Actor) {
        actorData.computedData.bases.race = BaseCharacterDataComputer.racesByIds[actorData.race.id];
        let job = BaseCharacterDataComputer.jobsByIds[actorData.job.id];
        if (job.baseJob) {
            job = {...BaseCharacterDataComputer.jobsByIds[job.baseJob], ...job};
        }
        actorData.computedData.bases.job = job;
    }
}

BaseCharacterDataComputer.racesByIds = {};
for (let raceCategory of Object.values(races)) {
    for (let [raceId, race] of Object.entries(raceCategory as { [raceId: string]: RaceDefinition })) {
        BaseCharacterDataComputer.racesByIds[raceId] = race;
    }
}
BaseCharacterDataComputer.jobsByIds = {};
for (let jobCategory of Object.values(jobs)) {
    for (let [jobId, job] of Object.entries(jobCategory as { [jobId: string]: JobDefinition })) {
        BaseCharacterDataComputer.jobsByIds[jobId] = job;
    }
}
