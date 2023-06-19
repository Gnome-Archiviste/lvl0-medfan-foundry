import {IRoll} from './roll';

export abstract class RollFactory {
    abstract createRoll(formula: string, format?: ((roll: IRoll) => { message: string, actorId: string })): Promise<IRoll>
}
