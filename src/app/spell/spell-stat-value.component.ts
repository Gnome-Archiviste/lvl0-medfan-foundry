import {Component, Input} from '@angular/core';
import {RollableSpellValue} from './spell';

@Component({
    selector: 'lvl0-spell-stat-value',
    templateUrl: './spell-stat-value.component.html',
    styleUrls: ['./spell-stat-value.component.scss'],
    standalone: false
})
export class SpellStatValueComponent {
    @Input('value')
    value?: string | RollableSpellValue;

    @Input('label')
    label: string;

    valueAsRollable(): RollableSpellValue | undefined {
        if (typeof this.value === 'string')
            return undefined;
        return this.value;
    }
}
