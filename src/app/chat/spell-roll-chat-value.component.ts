import {Component, Input} from '@angular/core';
import {ChatSpellValue} from '../spell/spell';

@Component({
    selector: 'lvl0-spell-roll-chat-value',
    templateUrl: './spell-roll-chat-value.component.html',
    styleUrls: ['./spell-roll-chat-value.component.scss'],
    standalone: false
})
export class SpellRollChatValueComponent {
    @Input() value!: ChatSpellValue;
    @Input() name!: string;

}
