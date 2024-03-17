import {Component, Input} from '@angular/core';
import {ChatRoll} from '../shared/roll';
import {SkillRollOutcome} from '../skill/skill-roll-util';
import {SkillRollChatExtraDataMessageData} from './skill-roll-chat-message.component';
import {SkillDefinition, SkillRepository, SpellDefinition, SpellRepository} from '../../repositories';
import {SpellRollChatMessageData} from './spell-roll-chat-message.component';

export type  SkillRollsChatMessageData = {
    skillId: string;
    results: {
        testRoll: ChatRoll
        result: SkillRollOutcome
    }[];
    successValue: number
    extraData: Array<SkillRollChatExtraDataMessageData | undefined>
}

@Component({
    selector: 'lvl0-skill-rolls-chat-message',
    templateUrl: './skill-rolls-chat-message.component.html',
    styleUrl: './skill-rolls-chat-message.component.scss'
})
export class SkillRollsChatMessageComponent {
    @Input() data!: SkillRollsChatMessageData;
    @Input() chatMessageId!: string;

    skillDefinition: SkillDefinition;
    detailShown = {};
    spellDefinition?: SpellDefinition;

    constructor(
        private readonly skillRepository: SkillRepository,
        private readonly spellRepository: SpellRepository
    ) {
    }

    ngOnInit(): void {
        this.skillDefinition = this.skillRepository.getSkillFromId(this.data.skillId);
        let firstExtraData = this.data.extraData[0];
        if (firstExtraData?.kind === 'cast-spell') {
            this.spellDefinition = this.spellRepository.getSpellById(firstExtraData.data.spell.spellId);
        }
    }

    $asSpellRollChatMessageData(data: any): SpellRollChatMessageData {
        return data;
    }

    showDetail(i: number) {
        this.detailShown[i] = true;
    }

    hideDetails(i: number) {
        this.detailShown[i] = false;
    }
}
