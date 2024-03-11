import {Component} from '@angular/core';
import {Lvl0ItemWand} from '../data-accessor/models/lvl0-item';

export type WandSelectorDialogData = {}

export type WandSelectorDialogResult = {
    wand: Lvl0ItemWand
}

@Component({
    selector: 'lvl0-wand-selector-dialog',
    templateUrl: './wand-selector-dialog.component.html',
    styleUrls: ['./wand-selector-dialog.component.scss']
})
export class WandSelectorDialogComponent {

}
