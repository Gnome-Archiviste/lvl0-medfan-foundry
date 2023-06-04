import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {FoundryCharacterAccessorService} from './foundry-character-accessor.service';
import {RollFactory} from '../shared/roll-factory';
import {FoundryRollFactory} from './foundry-roll-factory';
import {TranslateService} from '../shared/translate.service';
import {FoundryTranslateService} from './foundry-translate-service';
import {FoundryDialogService} from './foundry-dialog-service';
import {DialogService} from '../data-accessor/dialog-service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        {
            provide: CharacterAccessorService,
            useClass: FoundryCharacterAccessorService
        },
        {
            provide: DialogService,
            useClass: FoundryDialogService
        },
        {
            provide: RollFactory,
            useClass: FoundryRollFactory
        },
        {
            provide: TranslateService,
            useClass: FoundryTranslateService
        }
    ]
})
export class FoundryModule {
}
