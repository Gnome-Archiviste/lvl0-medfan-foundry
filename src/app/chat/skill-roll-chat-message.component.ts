import {Component, Input, OnInit} from '@angular/core';
import {ChatRoll} from '../shared/roll';
import {SkillDefinition, SkillRepository} from '../../repositories';
import {SpellRollChatMessageData} from './spell-roll-chat-message.component';
import {SkillRollOutcome} from '../skill/skill-roll-util';

export type  SkillRollChatMessageData = {
    skillId: string;
    testRoll: ChatRoll;
    result: SkillRollOutcome
    successValue: number
    extraData?: SkillRollChatExtraDataMessageData
}
export type SkillRollChatExtraDataMessageData = {
    kind: 'cast-spell',
    data: SpellRollChatMessageData
} | {
    kind: 'damage',
    data: SkillRollExtraDataDamageMessageData
} | {
    kind: 'shield-damage',
    data: SkillRollExtraDataShieldDamageMessageData
}

export type SkillRollExtraDataShieldDamageMessageData = {
    damageRollFormula: string;
    damageRoll?: ChatRoll;
    shield: SkillRollExtraDataItemInfoMessageData;
}

export type SkillRollExtraDataDamageMessageData = {
    damageRollFormula: string;
    damageRoll?: ChatRoll;
    damageElement?: string;
    weapon: SkillRollExtraDataItemInfoMessageData;
    ammunition?: SkillRollExtraDataItemInfoMessageData;
}

export type SkillRollExtraDataItemInfoMessageData = {
    name: string;
    icon?: string;
    damageRollFormula: string;
    element?: string;
};


@Component({
    selector: 'lvl0-skill-roll-chat-message',
    templateUrl: './skill-roll-chat-message.component.html',
    styleUrls: ['./skill-roll-chat-message.component.scss']
})
export class SkillRollChatMessageComponent implements OnInit {
    @Input() data!: SkillRollChatMessageData;

    skillDefinition: SkillDefinition;

    constructor(
        private readonly skillRepository: SkillRepository
    ) {
    }

    ngOnInit(): void {
        this.skillDefinition = this.skillRepository.getSkillFromId(this.data.skillId);
    }

    roundDamageUp(total?: number | undefined): number {
        return Math.ceil(total ?? 0);
    }
}
