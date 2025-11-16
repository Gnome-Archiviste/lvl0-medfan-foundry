import {Component, Input} from '@angular/core';
import {Spell} from './spell';

@Component({
    selector: 'lvl0-spell',
    templateUrl: './spell.component.html',
    styleUrls: ['./spell.component.scss'],
    standalone: false
})
export class SpellComponent {
    @Input('spell')
    spell: Spell;
    @Input('overrideSpellName')
    overrideSpellName?: string;
    @Input('overrideDescription')
    overrideDescription?: string;
}
