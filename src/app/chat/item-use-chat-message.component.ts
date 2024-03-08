import {Component, Input} from '@angular/core';
import {SpellRollChatMessageData} from './spell-roll-chat-message.component';

export type ItemUseChatMessageData = {
    itemSource?: {
        name: string;
        icon?: string;
        description?: string;
    },
    effect?: {
        type: 'cast-spell',
        data: SpellRollChatMessageData;
    }
}

@Component({
    selector: 'lvl0-item-use-chat-message',
    templateUrl: './item-use-chat-message.component.html',
    styleUrls: ['./item-use-chat-message.component.scss']
})
export class ItemUseChatMessageComponent {
    @Input() data!: ItemUseChatMessageData;

}
