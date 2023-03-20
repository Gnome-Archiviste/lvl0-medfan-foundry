import {singleton} from 'tsyringe';
import {Evaluated} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/client/dice/roll';

@singleton()
export class RollFactory {
    public async createRoll(formula: string): Promise<Evaluated<Roll>> {
        let roll = new Roll(formula);
        return await roll.roll({async: true});
    }
}
