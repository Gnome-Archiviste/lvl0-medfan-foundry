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
import {FoundryItemAccessorService} from './foundry-item-accessor.service';
import {ItemAccessorService} from '../data-accessor/item-accessor-service';
import {FoundryItemUpdaterService} from './foundry-item-updater.service';
import {ItemUpdaterService} from '../data-accessor/item-updater.service';
import {FoundryFileSelectorService} from './foundry-file-selector.service';
import {FileSelectorService} from '../data-accessor/file-selector.service';

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
            provide: ItemAccessorService,
            useClass: FoundryItemAccessorService
        },
        {
            provide: ItemUpdaterService,
            useClass: FoundryItemUpdaterService
        },
        {
            provide: FileSelectorService,
            useClass: FoundryFileSelectorService
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
