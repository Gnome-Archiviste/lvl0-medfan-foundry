import stats from './data/stats';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StatsRepository {
    getStats(): { stats: { [stat: string]: { readonly name: string } } } {
        return stats;
    }

    getStatDisplayName(stat: string): string {
        if (!(stat in stats.stats)) {
            throw new Error(`Invalid stat ${stat}`);
        }
        return stats.stats[stat].name;
    }
}
