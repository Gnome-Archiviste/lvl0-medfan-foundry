import {Component, Input} from '@angular/core';
import {Lvl0Item} from '../data-accessor/models/lvl0-item';
import {ItemModifierInfo} from '../../models/item';
import {SkillDefinition, SkillRepository} from '../../repositories';
import {ItemUpdaterService} from '../data-accessor/item-updater.service';

@Component({
    selector: 'lvl0-item-details',
    templateUrl: './item-details.component.html',
    styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent {
    @Input() item!: Lvl0Item

    skillsById: Record<string, SkillDefinition>;

    constructor(
        private readonly skillRepository: SkillRepository,
        private readonly itemUpdaterService: ItemUpdaterService
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

    equipItem(item: Lvl0Item, equiped: boolean) {
        this.itemUpdaterService.updateItem(item.id, {system: {equiped: equiped}})
    }
}
