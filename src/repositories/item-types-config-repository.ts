import {singleton} from 'tsyringe';
import {ItemTypeConfig} from './data';
import itemConfig from './data/item-config';

@singleton()
export class ItemTypesConfigRepository {
    private defaultConfig = {
        canBeEquiped: true,
    };

    getItemTypeConfig(itemType: string): ItemTypeConfig {
        return itemConfig[itemType] || this.defaultConfig;
    }
}
