import {TranslateService} from '../shared/translate.service';

export class FoundryTranslateService extends TranslateService {
    translate(label: string): string {
        return game.i18n?.localize('LVL0MF.' + label) ?? "no translation for " + label;
    }
}
