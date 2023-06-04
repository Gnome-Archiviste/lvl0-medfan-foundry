import {CharacterProperties, Lvl0Actor} from '../../models/actor';
import {Lvl0Character} from '../data-accessor/models/lvl0-character';
import {Lvl0FoundryItem, Lvl0ItemData, Lvl0ItemType} from '../../models/item';
import {Lvl0Item} from '../data-accessor/models/lvl0-item';
import {Injectable} from '@angular/core';
import {GroupBy, groupBy} from '../shared/group-by';

@Injectable({
    providedIn: 'root'
})
export class FoundryToLvl0Mapper {
    public createLvl0CharacterFromFoundryActor(actor: Lvl0Actor): Lvl0Character {
        let actorData = actor.data;
        if (actorData.type !== 'character') {
            throw new Error(`Actor '${actor.id}' is not a character. It was a '${actorData.type}'`)
        }

        let characterActor = actorData as CharacterProperties
        let items = actor.items.map(i => this.createLvl0ItemFromFoundryItem(i));
        let itemsByType: GroupBy<Lvl0Item, 'type'> = groupBy(items, it => it.type);

        Object.values(Lvl0ItemType).forEach(t => {
            if (itemsByType[t] === undefined) {
                itemsByType[t] = [];
            }
        })
        return {
            name: actor.name || '',
            data: characterActor.data,
            items: items,
            itemsByType: itemsByType
        };
    }

    public createLvl0ItemFromFoundryItem(item: Lvl0FoundryItem): Lvl0Item {
        let itemData = item.data;
        let lvl0ItemData = itemData as Lvl0ItemData
        return {
            ...lvl0ItemData,
            id: item.lvl0Id!,
            img: item.img,
            isOwned: item.isOwned,
            name: item.name || ''
        };
    }
}
