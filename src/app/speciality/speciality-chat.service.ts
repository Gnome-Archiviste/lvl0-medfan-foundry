import {Injectable} from '@angular/core';
import {ArrowResultMessageData, ArrowVolleyResultMessageData} from '../chat/speciality-roll-chat-message.component';
import {ArrowVolleyResult} from './speciality-arrow-volley-util';
import {RollFactory} from '../shared/roll-factory';

@Injectable({
    providedIn: 'root'
})
export class SpecialityChatService {
    constructor(
        private readonly rollFactory: RollFactory
    ) {

    }

    mapArrowVolleyResultToMessageData(result: ArrowVolleyResult): ArrowVolleyResultMessageData {
        let arrowsMessageData: ArrowResultMessageData[] = [];
        for (let arrow of result.arrows) {
            if (arrow.result === 'fail' || arrow.result === 'epicFail') {
                arrowsMessageData.push({
                    ...arrow,
                    testRoll: this.rollFactory.convertToRollChat(arrow.testRoll)
                });
            } else if (arrow.result === 'success' || arrow.result === 'criticalSuccess') {
                arrowsMessageData.push({
                    ...arrow,
                    testRoll: this.rollFactory.convertToRollChat(arrow.testRoll),
                    damageRoll: this.rollFactory.convertToRollChat(arrow.damageRoll)
                });
            }
        }
        let messageData: ArrowVolleyResultMessageData = {
            ...result,
            arrows: arrowsMessageData
        }
        return messageData;
    }
}
