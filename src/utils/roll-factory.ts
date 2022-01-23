import {singleton} from 'tsyringe';

// FIXME: Remove this type after v9
export type Evaluated<T extends Roll> = T & { _evaluated: true; _total: number; get total(): number };

@singleton()
export class RollFactory {
    public async createRoll(formula: string): Promise<Evaluated<Roll>> {
        let roll = new Roll(formula);
        await roll.roll({async: true});
        // FIXME: Remove this test after v9
        if (roll.total === undefined)
            throw new Error(`.roll() failed to provide total for formula ${formula}`)
        return roll as Evaluated<Roll>;
    }
}
