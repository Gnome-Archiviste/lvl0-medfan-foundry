import {singleton} from 'tsyringe';
import jobs, {ExtensionJobDefinition, JobDefinition} from './data/jobs';

@singleton()
export class JobRepository {
    private jobsNamesByIdsCache?: Record<string, string>;
    private jobsByIds?: Record<string, JobDefinition>;

    getJobsByCategories(): { base: Record<string, JobDefinition>, advance: Record<string, ExtensionJobDefinition> } {
        return jobs;
    }

    getJobNamesByIds(): Record<string, string> {
        if (this.jobsNamesByIdsCache)
            return this.jobsNamesByIdsCache;

        let jobsByCategories = this.getJobsByCategories();
        this.jobsNamesByIdsCache = (Object.entries(jobsByCategories.base) as [string, { name: string }][])
            .concat(Object.entries(jobsByCategories.advance))
            .reduce(((previousValue, currentValue: [jobId: string, job: JobDefinition]) => {
                previousValue[currentValue[0]] = currentValue[1].name;
                return previousValue;
            }), {})

        return this.jobsNamesByIdsCache;
    }

    getJobsByIds(): Record<string, JobDefinition> {
        if (this.jobsByIds)
            return this.jobsByIds;

        let jobsByIds: Record<string, JobDefinition> = {};
        for (let jobCategory of Object.values(this.getJobsByCategories())) {
            for (let [jobId, job] of Object.entries(jobCategory as { [jobId: string]: JobDefinition | ExtensionJobDefinition })) {
                if ('baseJob' in job) {
                    jobsByIds[jobId] = {...jobsByIds[job.baseJob], ...job};
                } else {
                    jobsByIds[jobId] = job;
                }
            }
        }

        this.jobsByIds = jobsByIds;

        return jobsByIds;
    }

    getJob(jobId: string): JobDefinition {
        let job = this.getJobsByIds()[jobId];
        if (!job)
            throw new Error(`Cannot find race ${jobId}`);
        return job;
    }
}

