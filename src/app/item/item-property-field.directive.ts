import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {ItemUpdaterService} from '../data-accessor/item-updater.service';
import {Lvl0Item} from '../data-accessor/models/lvl0-item';
import {v4 as uuid} from 'uuid';

@Directive({
    selector: '[lvl0ItemPropertyField]',
    standalone: false
})
export class ItemPropertyFieldDirective {

    @Input('lvl0ItemPropertyField')
    propertyName: string;

    @Input('lvl0Item')
    item: Lvl0Item;

    constructor(
        private el: ElementRef,
        private readonly itemUpdaterService: ItemUpdaterService,
    ) {
        el.nativeElement.id = uuid();
    }

    @HostListener('change', ['$event.target'])
    onInputChange(inputElement: HTMLElement) {
        if (inputElement instanceof HTMLInputElement) {
            if (inputElement.type === 'checkbox') {
                this.itemUpdaterService.updateItem(this.item.id, {[this.propertyName]: inputElement.checked})
            } else if (inputElement.type === 'number') {
                this.itemUpdaterService.updateItem(this.item.id, {[this.propertyName]: +inputElement.value})
            } else {
                this.itemUpdaterService.updateItem(this.item.id, {[this.propertyName]: inputElement.value})
            }
        } else if (inputElement instanceof HTMLTextAreaElement) {
            this.itemUpdaterService.updateItem(this.item.id, {[this.propertyName]: inputElement.value})
        } else if (inputElement instanceof HTMLSelectElement) {
            this.itemUpdaterService.updateItem(this.item.id, {[this.propertyName]: inputElement.value})
        }
    }
}
