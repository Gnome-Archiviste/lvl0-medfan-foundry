import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ActiveSkillValue} from '../data-accessor/models/lvl0-character';
import {SkillDefinition, SkillRepository} from '../../repositories';

export type SkillRollResultData = {
    actorId: string;
    skillId: string;
    rollValue: number;
    activeSkillValue: ActiveSkillValue;
    extraCriticalSuccessConditions?: number[][];
    extraCriticalFailureConditions?: number[][];
}

@Component({
    templateUrl: './skill-roll-result.component.html',
    styleUrls: ['./skill-roll-result.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillRollResultComponent implements OnInit {
    @Input('rawData')
    rawData: string;

    data: SkillRollResultData;
    skillDefinition: SkillDefinition;

    constructor(
        private readonly skillRepository : SkillRepository
    ) {
    }
    ngOnInit() {
        console.log(this.rawData);
        this.data = JSON.parse(this.rawData);
        this.skillDefinition = this.skillRepository.getSkillFromId(this.data.skillId);
    }

}
