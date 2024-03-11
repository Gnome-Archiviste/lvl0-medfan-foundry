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

    rollEpicFail() {
        // FIXME: Update this message with the roll
        //
        // let epiFailRoll = await this.rollFactory.createRoll('2d6');
        // const messageData = epiFailRoll.toMessage({}, {create: false});

        // let effect = this.magicEpicFailRepository.getMagicEpicFailEffect(epiFailRoll.total!);
        // private readonly magicEpicFailRepository: MagicEpicFailRepository

        /*
        *
    async roll(): Promise<void> {
        let epiFailRoll = await this.rollFactory.createRoll('2d6');
        const messageData = epiFailRoll.toMessage({}, {create: false});

        let effect = this.magicEpicFailRepository.getMagicEpicFailEffect(epiFailRoll.total!);

        let content = `<div class="critical-failure-chat">
    <div class="title">Echec critique</div>
    <div class="result"><i class="fas fa-dice"></i> ${epiFailRoll.total}</div>
    <div class="description"><span class="label">${effect.name}</span> ${effect.description}</div>
    <div class="roll">${await epiFailRoll.render()}</div>
</div>`;
        await ChatMessage.create({...messageData, content});
    }*/
    }
}
