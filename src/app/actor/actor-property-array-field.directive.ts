import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {v4 as uuid} from 'uuid';
import {Lvl0Actor} from '../data-accessor/models/lvl0-actor';

@Directive({
    selector: '[lvl0ActorPropertyArrayField]'
})
export class ActorPropertyArrayFieldDirective {

    @Input('lvl0ActorPropertyArrayField')
    propertyName: string;

    @Input('lvl0Actor')
    actor: Lvl0Actor;

    @Input('array')
    array?: any[] | null

    @Input('index')
    index: number;

    constructor(
        private el: ElementRef,
        private readonly actorUpdaterService: ActorUpdaterService,
    ) {
        el.nativeElement.id = uuid();
    }

    @HostListener('change', ['$event.target'])
    onInputChange(inputElement: HTMLElement) {
        let newValue = this.array ? [...this.array] : [];
        while (newValue.length <= this.index) {
            newValue.push(undefined);
        }
        if (inputElement instanceof HTMLInputElement) {
            if (inputElement.type === 'checkbox') {
                newValue[this.index] = inputElement.checked;
            } else if (inputElement.type === 'number') {
                newValue[this.index] = +inputElement.value;
            } else {
                newValue[this.index] = inputElement.value;
            }
        } else if (inputElement instanceof HTMLTextAreaElement) {
            newValue[this.index] = inputElement.value;
        } else if (inputElement instanceof HTMLSelectElement) {
            newValue[this.index] = inputElement.value;
        }
        this.actorUpdaterService.updateActor(this.actor.id, {[this.propertyName]: newValue})
    }
}
