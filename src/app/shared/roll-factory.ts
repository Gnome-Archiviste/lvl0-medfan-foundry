import {IRoll, SavedRoll} from './roll';

export abstract class RollFactory {
    abstract createRoll(formula: string, format?: ((roll: IRoll) => { message: string, actorId: string })): Promise<IRoll>
    abstract createSavedRoll(formula: string): Promise<SavedRoll>
}
