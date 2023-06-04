import {ItemAccessorService} from '../data-accessor/item-accessor-service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Lvl0Item} from '../data-accessor/models/lvl0-item';
import {Injectable, NgZone} from '@angular/core';
import {FoundryToLvl0Mapper} from './foundry-to-lvl0-mapper';
import {Lvl0FoundryItem} from '../../models/item';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';

@Injectable({
    providedIn: 'root'
})
export class FoundryItemAccessorService extends ItemAccessorService {
    private readonly itemSubjectByIds: Map<string, Subject<Lvl0Item>> = new Map<string, Subject<Lvl0Item>>();

    constructor(
        private readonly ngZone: NgZone,
        private readonly foundryToLvl0Mapper: FoundryToLvl0Mapper,
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver,
    ) {
        super();
        Hooks.on('updateItem', (item: Lvl0FoundryItem, _change: any, _options: { diff: boolean, render: boolean }, _userId: string) => {
            this.ngZone.run(() => {
                this.updateItem(item);
            })
        })
    }

    selectItem(id: string): Observable<Lvl0Item> {
        if (!id) {
            throw new Error(`Invalid actor id. Undefined or empty: '${id}'`);
        }
        let existingSubject = this.itemSubjectByIds.get(id);
        if (existingSubject) {
            return existingSubject;
        }
        let item = this.foundryLvl0IdResolver.getItemFromLvl0Id(id);
        if (!item) {
            throw new Error(`Item '${id}' not found`);
        }
        let lvl0Character = this.foundryToLvl0Mapper.createLvl0ItemFromFoundryItem(item);

        let subject = new BehaviorSubject<Lvl0Item>(lvl0Character);
        this.itemSubjectByIds.set(id, subject);
        return subject;
    }


    private updateItem(item?: Lvl0FoundryItem | null) {
        if (!item) {
            return;
        }

        let itemId = item.lvl0Id;
        if (!itemId) {
            console.warn(`Item '${item}' have a null id`)
            return;
        }

        let subject = this.itemSubjectByIds.get(itemId);
        if (!subject) {
            return;
        }

        subject.next(this.foundryToLvl0Mapper.createLvl0ItemFromFoundryItem(item as Lvl0FoundryItem));
    }
}
