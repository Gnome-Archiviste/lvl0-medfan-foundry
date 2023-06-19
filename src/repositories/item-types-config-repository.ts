import {singleton} from 'tsyringe';
import {ItemTypeConfig} from './data';
import itemConfig from './data/item-config';
import {Injectable} from '@angular/core';
import {UnionKeys} from '../utils/util';
import {Lvl0Item} from '../app/data-accessor/models/lvl0-item';

@singleton()
@Injectable({
    providedIn: 'root'
})
export class ItemTypesConfigRepository {
    private defaultConfig = {
        canBeEquiped: true,
    };

    getItemTypesConfigs(): Record<UnionKeys<Lvl0Item, 'type'>, ItemTypeConfig> {
        return itemConfig;
    }

    getItemTypeConfig(itemType: string): ItemTypeConfig {
        return itemConfig[itemType] || this.defaultConfig;
    }
}
