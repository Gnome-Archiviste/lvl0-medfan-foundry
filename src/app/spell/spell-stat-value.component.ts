import {Component, Input} from '@angular/core';
import {RollableSpellValue} from './spell';

@Component({
    selector: 'lvl0-spell-stat-value',
    templateUrl: './spell-stat-value.component.html',
    styleUrls: ['./spell-stat-value.component.scss']
})
export class SpellStatValueComponent {
    @Input('value')
    value?: string | RollableSpellValue;

    @Input('label')
    label: string;

    valueType() {
        if (typeof this.value === 'string')
            return 'string';
        if (this.value instanceof RollableSpellValue)
            return 'rollable'
        return 'unk';
    }

    valueAsRollable(): RollableSpellValue {
        return <RollableSpellValue>this.value;
    }
}
