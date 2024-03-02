import {Component, Input, OnInit} from '@angular/core';
import {SpecialityDefinition, SpecialityRepository} from '../../repositories';
import {ArrowVolleyResult} from '../speciality/speciality-arrow-volley-util';

export type SpecialityRollChatMessageData = {
    specialityId: string;
    manaUsed: number;
    specificExtraData?: ArrowVolleyResult
}

@Component({
    selector: 'lvl0-speciality-roll-chat-message',
    templateUrl: './speciality-roll-chat-message.component.html',
    styleUrls: ['./speciality-roll-chat-message.component.scss']
})
export class SpecialityRollChatMessageComponent implements OnInit {
    @Input('data')
    data: SpecialityRollChatMessageData;

    speciality: SpecialityDefinition;

    constructor(
        private readonly specialityRepository: SpecialityRepository
    ) {
    }

    ngOnInit(): void {
        this.speciality = this.specialityRepository.getSpecialityFromId(this.data.specialityId);
    }

    arrowVolleyData(data: SpecialityRollChatMessageData): ArrowVolleyResult {
        return data.specificExtraData as ArrowVolleyResult;
    }
}
