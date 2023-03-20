import {IRoll} from './roll';

export abstract class RollFactory {
    abstract createRoll(formula: string): Promise<IRoll>
}
