import {SpellAction} from './spell';

export abstract class SpellActionService {
    abstract executeAction(action: SpellAction);
}
