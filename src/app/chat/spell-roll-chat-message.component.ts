import {Component, Input, OnInit} from '@angular/core';
import {ChatSpell, SpellAction} from '../spell/spell';
import {SpellDefinition, SpellRepository} from '../../repositories';
import {SpellActionService} from '../spell/spell-action.service';

export type SpellRollChatMessageData = {
    spell: ChatSpell;
}

@Component({
    selector: 'lvl0-spell-roll-chat-message',
    templateUrl: './spell-roll-chat-message.component.html',
    styleUrls: ['./spell-roll-chat-message.component.scss']
})
export class SpellRollChatMessageComponent implements OnInit {
    @Input() data!: SpellRollChatMessageData;

    spellDefinition?: SpellDefinition;

    constructor(
        private readonly spellRepository: SpellRepository,
        private readonly spellActionService: SpellActionService
    ) {
    }

    ngOnInit(): void {
        this.spellDefinition = this.spellRepository.getSpellById(this.data.spell.spellId);
    }

    executeAction(action: SpellAction) {
        this.spellActionService.executeAction(action);
    }
}
