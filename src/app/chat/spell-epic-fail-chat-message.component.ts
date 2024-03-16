import {Component, Input, OnInit} from '@angular/core';
import {MagicEpicFailDefinition, MagicEpicFailRepository} from '../../repositories';
import {ChatRoll} from '../shared/roll';

export type SpellEpicFailChatMessageData = {
    roll: ChatRoll
    epicFailEffectId: string
}

@Component({
    selector: 'lvl0-spell-epic-fail-chat-message',
    templateUrl: './spell-epic-fail-chat-message.component.html',
    styleUrl: './spell-epic-fail-chat-message.component.scss'
})
export class SpellEpicFailChatMessageComponent implements OnInit {
    @Input() data!: SpellEpicFailChatMessageData;

    magicEpicFailEffect: MagicEpicFailDefinition;

    constructor(
        private readonly magicEpicFailRepository: MagicEpicFailRepository
    ) {
    }

    ngOnInit(): void {
        this.magicEpicFailEffect = this.magicEpicFailRepository.getMagicEpicFailEffectById(this.data.epicFailEffectId);
    }
}
