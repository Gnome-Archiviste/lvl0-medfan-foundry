import {Injectable} from '@angular/core';
import {ActiveSkillValue} from '../data-accessor/models/lvl0-character';
import {IRoll} from '../shared/roll';

export type SkillRollOutcome = 'epicFail' | 'criticalSuccess' | 'success' | 'fail';
@Injectable({
    providedIn: 'root'
})
export class SkillRollUtil {
    getRollResult(testRoll: IRoll, activeSkillValue: ActiveSkillValue): SkillRollOutcome {
        if (testRoll.total == 12)
            return 'epicFail';
        if (testRoll.total == 2)
            return 'criticalSuccess';
        if (testRoll.total <= activeSkillValue.successValue)
            return 'success';
        return 'fail';
    }
}
