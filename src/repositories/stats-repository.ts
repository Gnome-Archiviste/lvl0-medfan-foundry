import stats from './data/stats';

export class StatsRepository {
    static getStats(): { stats: { [stat: string]: {readonly name: string} } } {
        return stats;
    }

    static getStatDisplayName(stat: string): string {
        return stats[stat].name;
    }
}
