import {singleton} from 'tsyringe';
import {Evaluated} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/foundry.js/roll';

export type RollResult = 'epicFail' | 'fail' | 'success' | 'criticalSuccess';
export type SuccessRollResult = 'success' | 'criticalSuccess';
export type FailedRollResult = 'fail' | 'epicFail';

@singleton()
export class RollUtil {
    getRollResult(value, expectedValue): RollResult {
        if (value == 12)
            return 'epicFail';
        if (value == 2)
            return 'criticalSuccess';
        if (value <= expectedValue)
            return 'success';
        return 'fail';
    }

    getTestResultMessage(result: RollResult) {
        switch (result) {
            case 'criticalSuccess':
                return `<span style="color: green; font-weight: bold">Succès critique</span>`;
            case 'success':
                return `<span style="color: green; font-weight: bold">Succès</span>`;
            case 'fail':
                return `<span style="color: darkred; font-weight: bold">Échec</span>`;
            case 'epicFail':
                return `<span style="color: darkred; font-weight: bold">Échec critique</span>`;
        }
    }

    async renderRollSmall(roll: Evaluated<Roll>): Promise<string> {
        let result = await roll.render();
        let totalIndex = result.indexOf('<h4 class="dice-total">')
        let endTotalIndex = result.indexOf('</h4>', totalIndex)
        return result.substring(0, totalIndex) + result.substring(endTotalIndex);
    }

    isSuccess(result: RollResult): result is SuccessRollResult {
        return result === 'success' || result === 'criticalSuccess';
    }

    isFailed(result: RollResult): result is FailedRollResult {
        return result === 'fail' || result === 'epicFail';
    }

    mergeRolls(rolls: Evaluated<Roll>[]) : Roll {
        let groupedRoll = new Roll('').toJSON();
        groupedRoll.terms = [PoolTerm.fromRolls(rolls)];
        groupedRoll.dice = []
        groupedRoll.evaluated = true;
        groupedRoll.total = 0;

        let formulas: string[] = [];
        for (let roll of rolls) {
            formulas.push(roll.formula);
            groupedRoll.total += roll.total;
        }
        groupedRoll.formula = `{${formulas.join(',')}}`;

        return Roll.fromJSON(JSON.stringify(groupedRoll));
    }
}
