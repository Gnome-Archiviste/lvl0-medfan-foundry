import {CharacterDataComputer} from "./character-data-computer.js";
import races from "../../../data/races.js";
import jobs from "../../../data/jobs.js";

export class BaseCharacterDataComputer extends CharacterDataComputer {
    static racesByIds = {};
    static jobsByIds = {};

    /**
     * @override
     */
    compute(actorData, actor) {
        actorData.computedData.bases.race = BaseCharacterDataComputer.racesByIds[actor.data.data.race.id];
        let job = BaseCharacterDataComputer.jobsByIds[actor.data.data.job.id];
        if (job.baseJob) {
            job = {...BaseCharacterDataComputer.jobsByIds[job.baseJob], ...job};
        }
        actorData.computedData.bases.job = job;
    }
}

BaseCharacterDataComputer.racesByIds = {};
for (let raceCategory of Object.values(races)) {
    for (let [raceId, race] of Object.entries(raceCategory)) {
        BaseCharacterDataComputer.racesByIds[raceId] = race;
    }
}
BaseCharacterDataComputer.jobsByIds = {};
for (let jobCategory of Object.values(jobs)) {
    for (let [jobId, job] of Object.entries(jobCategory)) {
        BaseCharacterDataComputer.jobsByIds[jobId] = job;
    }
}
