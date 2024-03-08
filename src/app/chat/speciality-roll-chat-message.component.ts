import {Component, Input, OnInit} from '@angular/core';
import {SpecialityDefinition, SpecialityRepository} from '../../repositories';
import {ArrowVolleyResult} from '../speciality/speciality-arrow-volley-util';
import {ChatRoll} from '../shared/roll';

export type SpecialityRollChatMessageData = {
    specialityId: string;
    manaUsed: number;
    specificExtraData?: ArrowVolleyResultMessageData
}

export type ArrowVolleyResultMessageData = {
    arrows: ArrowResultMessageData[];
    skillSuccessValue: number;
    weapon: {
        name: string;
        icon?: string;
    };
}

export type ArrowResultMessageData = {
    result: 'fail' | 'epicFail';
    testRoll: ChatRoll;
    arrowNumber: number;
} | {
    result: 'success' | 'criticalSuccess';
    testRoll: ChatRoll;
    arrowNumber: number;
    damageRollFormula: string;
    damage: number;
    element: string;
    damageRoll: ChatRoll;
    ammunition?: {
        name: string;
        extraDamage: string;
        icon?: string;
    };
};

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

    arrowVolleyData(data: SpecialityRollChatMessageData): ArrowVolleyResultMessageData {
        return data.specificExtraData as ArrowVolleyResultMessageData;
    }
}
