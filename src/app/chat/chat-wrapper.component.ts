import {Component, Input, OnInit} from '@angular/core';
import {Lvl0MessageTypes, SpecialityRollChatMessageType} from './lvl0-chat-message.types';
import {SpecialityRollChatMessageData} from './speciality-roll-chat-message.component';

@Component({
    templateUrl: './chat-wrapper.component.html',
    styleUrls: ['./chat-wrapper.component.scss']
})
export class ChatWrapperComponent implements OnInit {
    @Input('type')
    messageType: Lvl0MessageTypes;

    @Input('rawData')
    rawData: string;

    messageData: {
        type: SpecialityRollChatMessageType
        data: SpecialityRollChatMessageData
    };

    ngOnInit(): void {
        this.messageData = {
            type: this.messageType,
            data: JSON.parse(this.rawData)
        }
    }
}
