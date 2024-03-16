import {Component, Input, OnInit} from '@angular/core';
import {Lvl0ChatMessage, Lvl0MessageTypes} from './lvl0-chat-message.types';

@Component({
    templateUrl: './chat-wrapper.component.html',
    styleUrls: ['./chat-wrapper.component.scss']
})
export class ChatWrapperComponent implements OnInit {
    @Input('type')
    messageType: Lvl0MessageTypes;
    @Input('int')
    chatMessageId: string;

    @Input('rawData')
    rawData: string;

    messageData: Lvl0ChatMessage;

    ngOnInit(): void {
        this.messageData = {
            type: this.messageType,
            data: JSON.parse(this.rawData)
        }
    }
}
