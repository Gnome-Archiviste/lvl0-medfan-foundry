import {Component, Input} from '@angular/core';
import {Lvl0Item} from '../data-accessor/models/lvl0-item';
import {ItemModifierInfo} from '../../models/item';
import {SkillDefinition, SkillRepository} from '../../repositories';

@Component({
    selector: 'lvl0-item-details',
    templateUrl: './item-details.component.html',
    styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent {
    @Input() item!: Lvl0Item

    skillsById: Record<string, SkillDefinition>;

    constructor(
        private readonly skillRepository: SkillRepository
    ) {
        this.skillsById = this.skillRepository.getSkillsByIds()
    }

    itemModifiers(item: Lvl0Item): ItemModifierInfo[] {
        if ('modifiers' in item.system)
            return Object.values(item.system.modifiers);
        return [];
    }

    itemExtraSkills(item: Lvl0Item): string[] {
        if ('extraSkills' in item.system)
            return Object.values(item.system.extraSkills).map(x => x.id);
        return [];
    }
}
