import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatWrapperComponent} from './chat-wrapper.component';
import {SpecialityModule} from '../speciality/speciality.module';
import {SpecialityRollChatMessageComponent} from './speciality-roll-chat-message.component';
import {SharedModule} from '../shared/shared.module';
import { RollDetailComponent } from './roll-detail.component';
import { SpellRollChatMessageComponent } from './spell-roll-chat-message.component';
import { SpellRollChatValueComponent } from './spell-roll-chat-value.component';
import {MarkdownModule} from '../markdown/markdown.module';
import { ItemUseChatMessageComponent } from './item-use-chat-message.component';
import { SkillRollChatMessageComponent } from './skill-roll-chat-message.component';
import {SpellEpicFailChatMessageComponent} from './spell-epic-fail-chat-message.component';

@NgModule({
    declarations: [
        ChatWrapperComponent,
        SpecialityRollChatMessageComponent,
        RollDetailComponent,
        SpellRollChatMessageComponent,
        SpellRollChatValueComponent,
        ItemUseChatMessageComponent,
        SkillRollChatMessageComponent,
        SpellEpicFailChatMessageComponent,
    ],
    imports: [
        CommonModule,
        SpecialityModule,
        SharedModule,
        MarkdownModule
    ]
})
export class ChatModule {
}
