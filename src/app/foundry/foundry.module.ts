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
import {FoundryActorUpdaterService} from './foundry-actor-udpater.service';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {ActorEffectService} from '../data-accessor/actor-effect.service';
import {FoundryActorEffectService} from './foundry-actor-effect.service';
import {ChatService} from '../chat/chat.service';
import {FoundryChatService} from './foundry-chat.service';
import {MacroService} from '../shared/macro.service';
import {FoundryMacroService} from './foundry-macro.service';
import {FoundrySpecialityService} from './foundry-speciality.service';
import {SpecialityService} from '../speciality/speciality.service';
import {ItemService} from '../data-accessor/item.service';
import {FoundryItemService} from './foundry-item.service';
import {PlayerNotificationService} from '../shared/player-notification.service';
import {FoundryPlayerNotificationService} from './foundry-player-notification.service';

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
            provide: ActorEffectService,
            useClass: FoundryActorEffectService
        },
        {
            provide: ChatService,
            useClass: FoundryChatService
        },
        {
            provide: MacroService,
            useClass: FoundryMacroService
        },
        {
            provide: ActorUpdaterService,
            useClass: FoundryActorUpdaterService
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
            provide: PlayerNotificationService,
            useClass: FoundryPlayerNotificationService
        },
        {
            provide: ItemUpdaterService,
            useClass: FoundryItemUpdaterService
        },
        {
            provide: SpecialityService,
            useClass: FoundrySpecialityService
        },
        {
            provide: FileSelectorService,
            useClass: FoundryFileSelectorService
        },
        {
            provide: ItemService,
            useClass: FoundryItemService
        },
        {
            provide: RollFactory,
            useClass: FoundryRollFactory
        },
        {
            provide: TranslateService,
            useClass: FoundryTranslateService
        },
    ]
})
export class FoundryModule {
}
