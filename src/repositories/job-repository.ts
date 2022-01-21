import jobs, {ExtensionJobDefinition, JobDefinition} from './data/jobs';
import {throwAndError} from '../utils/error';

export class JobRepository {
    private static jobsNamesByIdsCache?: Record<string, string>;
    private static jobsByIds?: Record<string, JobDefinition>;

    static getJobsByCategories(): { base: Record<string, JobDefinition>, advance: Record<string, ExtensionJobDefinition> } {
        return jobs;
    }

    static getJobNamesByIds(): Record<string, string> {
        if (JobRepository.jobsNamesByIdsCache)
            return JobRepository.jobsNamesByIdsCache;

        let jobsByCategories = JobRepository.getJobsByCategories();
        JobRepository.jobsNamesByIdsCache = (Object.entries(jobsByCategories.base) as [string, { name: string }][])
            .concat(Object.entries(jobsByCategories.advance))
            .reduce(((previousValue, currentValue: [jobId: string, job: JobDefinition]) => {
                previousValue[currentValue[0]] = currentValue[1].name;
                return previousValue;
            }), {})

        return JobRepository.jobsNamesByIdsCache;
    }

    static getJobsByIds(): Record<string, JobDefinition> {
        if (JobRepository.jobsByIds)
            return JobRepository.jobsByIds;

        let jobsByIds: Record<string, JobDefinition> = {};
        for (let jobCategory of Object.values(JobRepository.getJobsByCategories())) {
            for (let [jobId, job] of Object.entries(jobCategory as { [jobId: string]: JobDefinition | ExtensionJobDefinition })) {
                if ('baseJob' in job) {
                    jobsByIds[jobId] = {...jobsByIds[job.baseJob], ...job};
                } else {
                    jobsByIds[jobId] = job;
                }
            }
        }

        JobRepository.jobsByIds = jobsByIds;

        return jobsByIds;
    }

    static getJob(id: string): JobDefinition {
        let job = JobRepository.getJobsByIds()[id];
        if (!job)
            throwAndError(`Cannot find race ${id}`);
        return job;
    }
}

