import {RollFactory} from '../shared/roll-factory';
import {IRoll} from '../shared/roll';
import {Evaluated} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/client/dice/roll';

class FoundryRoll implements IRoll {
    readonly foundryRoll: Roll;
    get total(): number {
        return this.foundryRoll.total!;
    }

    constructor(roll: Evaluated<Roll>) {
        this.foundryRoll = roll;
    }
}

export class FoundryRollFactory extends RollFactory {
    async createRoll(formula: string): Promise<IRoll> {
        let roll = new Roll(formula);
        return new FoundryRoll(await roll.roll({async: true}));
    }
}
