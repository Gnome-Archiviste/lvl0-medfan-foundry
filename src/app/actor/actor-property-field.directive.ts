import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {v4 as uuid} from 'uuid';
import {Lvl0Actor} from '../data-accessor/models/lvl0-actor';

@Directive({
    selector: '[lvl0ActorPropertyField]'
})
export class ActorPropertyFieldDirective {

    @Input('lvl0ActorPropertyField')
    propertyName: string;

    @Input('lvl0Actor')
    actor: Lvl0Actor;

    constructor(
        private el: ElementRef,
        private readonly actorUpdaterService: ActorUpdaterService,
    ) {
        el.nativeElement.id = uuid();
    }

    @HostListener('change', ['$event.target'])
    onInputChange(inputElement: HTMLElement) {
        if (inputElement instanceof HTMLInputElement) {
            if (inputElement.type === 'checkbox') {
                this.actorUpdaterService.updateActor(this.actor.id, {[this.propertyName]: inputElement.checked})
            } else if (inputElement.type === 'number') {
                this.actorUpdaterService.updateActor(this.actor.id, {[this.propertyName]: +inputElement.value})
            } else {
                this.actorUpdaterService.updateActor(this.actor.id, {[this.propertyName]: inputElement.value})
            }
        } else if (inputElement instanceof HTMLTextAreaElement) {
            this.actorUpdaterService.updateActor(this.actor.id, {[this.propertyName]: inputElement.value})
        } else if (inputElement instanceof HTMLSelectElement) {
            this.actorUpdaterService.updateActor(this.actor.id, {[this.propertyName]: inputElement.value})
        }
    }
}
