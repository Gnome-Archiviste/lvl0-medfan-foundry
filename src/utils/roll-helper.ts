export type RollResult = 'epicFail' | 'fail' | 'success' | 'criticalSuccess';
export type SuccessRollResult = 'success' | 'criticalSuccess';
export type FailedRollResult = 'fail' | 'epicFail';

export class RollHelper {
    static getRollResult(value, expectedValue): RollResult {
        if (value == 12)
            return 'epicFail';
        if (value == 2)
            return 'criticalSuccess';
        if (value <= expectedValue)
            return 'success';
        return 'fail';
    }


    static getTestResultMessage(result: RollResult) {
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

    static async renderRollSmall(roll: Roll): Promise<string> {
        let result = await roll.render();
        let totalIndex = result.indexOf('<h4 class="dice-total">')
        let endTotalIndex = result.indexOf('</h4>', totalIndex)
        return result.substring(0, totalIndex) + result.substring(endTotalIndex);
    }

    static isSuccess(result: RollResult): result is SuccessRollResult {
        return result === 'success' || result === 'criticalSuccess';
    }
    static IsFailed(result: RollResult): result is FailedRollResult {
        return result === 'fail' || result === 'epicFail';
    }
}
