import {Component, Input} from '@angular/core';
import {ChatRoll} from '../shared/roll';

@Component({
    selector: 'lvl0-roll-detail',
    templateUrl: './roll-detail.component.html',
    styleUrls: ['./roll-detail.component.scss']
})
export class RollDetailComponent {
    @Input('roll')
    roll: ChatRoll;
    showDetails: boolean

    toggleDetails() {
        this.showDetails = !this.showDetails;
    }
}
