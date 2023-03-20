import {TranslateService} from '../shared/translate.service';

// This allow `game` to be resolved
declare global {
    interface LenientGlobalVariableTypes {
        game: never; // the type doesn't matter
    }
}

export class FoundryTranslateService extends TranslateService {
    translate(label: string): string {
        return game.i18n.localize('LVL0MF.' + label);
    }
}
