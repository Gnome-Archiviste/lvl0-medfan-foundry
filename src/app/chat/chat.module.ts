import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatWrapperComponent} from './chat-wrapper.component';
import {SpecialityModule} from '../speciality/speciality.module';
import {SpecialityRollChatMessageComponent} from './speciality-roll-chat-message.component';
import {SharedModule} from '../shared/shared.module';
import { RollDetailComponent } from './roll-detail.component';

@NgModule({
    declarations: [
        ChatWrapperComponent,
        SpecialityRollChatMessageComponent,
        RollDetailComponent,
    ],
    imports: [
        CommonModule,
        SpecialityModule,
        SharedModule
    ]
})
export class ChatModule {
}
