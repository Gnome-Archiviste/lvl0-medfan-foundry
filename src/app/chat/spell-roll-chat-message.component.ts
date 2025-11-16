import {Component, Input, OnInit} from '@angular/core';
import {ChatSpell, SpellAction} from '../spell/spell';
import {SpellDefinition, SpellRepository} from '../../repositories';
import {SpellActionService} from '../spell/spell-action.service';
import {SpellChatService} from '../spell/spell-chat.service';

export type SpellRollChatMessageData = {
    spell: ChatSpell;
    additionalAction?: 'fill-wand' | 'create-scroll';
}

@Component({
    selector: 'lvl0-spell-roll-chat-message',
    templateUrl: './spell-roll-chat-message.component.html',
    styleUrls: ['./spell-roll-chat-message.component.scss'],
    standalone: false
})
export class SpellRollChatMessageComponent implements OnInit {
    @Input() data!: SpellRollChatMessageData;
    @Input() chatMessageId!: string;

    spellDefinition?: SpellDefinition;

    constructor(
        private readonly spellRepository: SpellRepository,
        private readonly spellActionService: SpellActionService,
        private readonly spellChatService: SpellChatService,
    ) {
    }

    ngOnInit(): void {
        this.spellDefinition = this.spellRepository.getSpellById(this.data.spell.spellId);
    }

    executeAction(action: SpellAction) {
        this.spellActionService.executeAction(action);
    }

    rollEpicFail() {
        this.spellChatService.rollSpellCriticalFailureAndSendToChat(this.data.spell);
    }
}
