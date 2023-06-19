import {singleton} from 'tsyringe';
import jobs, {JobDefinition} from './data/jobs';
import {Injectable} from '@angular/core';

@singleton()
@Injectable({
    providedIn: 'root'
})
export class JobRepository {
    private jobsNamesByIdsCache?: Record<string, string>;
    private jobsByIds?: Record<string, JobDefinition>;
    private jobDefinitionCache?: Record<string, Record<string, JobDefinition>>;

    getJobCategoryIds(): string[] {
        return ['base', 'advance'];
    }

    getJobsByCategories(): Record<string, Record<string, JobDefinition>> {
        if (this.jobDefinitionCache)
            return this.jobDefinitionCache;

        let jobsByIds: Record<string, JobDefinition> = {};
        let jobDefinitionCache: Record<string, Record<string, JobDefinition>> = {
            base: {},
            advance: {}
        };
        for (let [jobId, job] of Object.entries(jobs.base)) {
            let jobDefinition = {...job, id: jobId, skillCategoryId: jobId};
            jobsByIds[jobId] = jobDefinition;
            jobDefinitionCache['base'][jobId] = jobDefinition;
        }
        for (let [jobId, job] of Object.entries(jobs.advance)) {
            let jobDefinition = {...jobsByIds[job.baseJob], ...job, id: jobId};
            jobsByIds[jobId] = jobDefinition;
            jobDefinitionCache['advance'][jobId] = jobDefinition;
        }

        this.jobDefinitionCache = jobDefinitionCache;
        this.jobsByIds = jobsByIds;
        return jobDefinitionCache;
    }

    getJobNamesByIds(): Record<string, string> {
        if (this.jobsNamesByIdsCache)
            return this.jobsNamesByIdsCache;

        let jobDefinitions = this.getJobsByIds();
        this.jobsNamesByIdsCache = Object.values(jobDefinitions)
            .reduce(((previousValue, currentValue: JobDefinition) => {
                previousValue[currentValue.id] = currentValue.name;
                return previousValue;
            }), {});

        return this.jobsNamesByIdsCache;
    }

    getJobsByIds(): Record<string, JobDefinition> {
        if (this.jobsByIds)
            return this.jobsByIds;

        this.getJobsByCategories();

        if (this.jobsByIds)
            return this.jobsByIds;

        throw new Error('Failed to get jobsByIds');
    }

    getJob(jobId: string): JobDefinition | undefined {
        return this.getJobsByIds()[jobId];
    }
}

