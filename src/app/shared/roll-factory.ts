import {ChatRoll, IRoll} from './roll';

export abstract class RollFactory {
    abstract createRoll(formula: string, format?: ((roll: IRoll) => {
        message: string,
        actorId: string
    })): Promise<IRoll>

    abstract convertToRollChat(roll: IRoll): ChatRoll;
}
