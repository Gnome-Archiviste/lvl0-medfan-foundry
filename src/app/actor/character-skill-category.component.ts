import {Component, Input} from '@angular/core';
import {SkillDefinition} from '../../repositories';
import {Observable} from 'rxjs';
import {AvailableSkillPoint} from '../data-accessor/selectors/character-available-skill-points-selector';

@Component({
    selector: 'lvl0-skill-category',
    templateUrl: './character-skill-category.component.html',
    styleUrls: ['./character-skill-category.component.scss']
})
export class CharacterSkillCategoryComponent {
    @Input() skills: SkillDefinition[];
    @Input() characterId: string;
    @Input() characterAvailableSkillPoints$: Observable<AvailableSkillPoint>;
    @Input() categoryId: string;
}
