import {Component, Input, OnInit} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Lvl0Item} from '../data-accessor/models/lvl0-item';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {ItemUpdaterService} from '../data-accessor/item-updater.service';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {Lvl0Character} from '../data-accessor/models/lvl0-character';
import {selectCharacterItemsByType} from '../data-accessor/selectors/character-selectors';
import {ItemTypeConfig, ItemTypesConfigRepository} from '../../repositories';
import {ItemService} from '../data-accessor/item.service';
import {CharacterClutterData, selectCharacterClutter} from '../data-accessor/selectors/character-clutter-selector';
import {Lvl0FoundryItemScroll, Lvl0FoundryItemWand} from '../../models/item';

@Component({
    selector: 'lvl0-character-sheet-inventory',
    templateUrl: './character-sheet-inventory.component.html',
    styleUrls: ['./character-sheet-inventory.component.scss']
})
export class CharacterSheetInventoryComponent implements OnInit {
    @Input() characterId!: string;
    character$: Observable<Lvl0Character>;

    itemsByType$: Observable<Record<string, Lvl0Item[]>>;
    itemTypesConfigs: Record<string, ItemTypeConfig>
    clutter$: Observable<CharacterClutterData>;
    usedInventorySpace$: Observable<number>;
    inventoryTotalSpace$: Observable<number>;
    isBagFull$: Observable<boolean>;
    inventoryRowCount$: Observable<number>;
    inventoryLetters$: Observable<string[]>
    inventoryColumnCount$: Observable<number>;
    inventoryColumnNumbers$: Observable<number[]>;
    usedCell$: Observable<Record<string, string>>;

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly itemUpdaterService: ItemUpdaterService,
        private readonly itemService: ItemService,
        private readonly actorUpdaterService: ActorUpdaterService,
        private readonly itemTypesConfigRepository: ItemTypesConfigRepository,
    ) {
    }

    ngOnInit(): void {
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);
        this.itemsByType$ = this.character$.pipe(selectCharacterItemsByType());
        this.itemTypesConfigs = this.itemTypesConfigRepository.getItemTypesConfigs();

        this.clutter$ = this.character$.pipe(selectCharacterClutter());
        this.usedInventorySpace$ = this.clutter$.pipe(map(x => x.usedSpace));
        this.inventoryTotalSpace$ = this.clutter$.pipe(map(x => x.totalSpace));
        this.isBagFull$ = this.clutter$.pipe(map(x => x.totalSpace < x.usedSpace));
        this.inventoryColumnNumbers$ = this.clutter$.pipe(map(x => x.columnsPhy));
        this.inventoryLetters$ = this.clutter$.pipe(map(x => Array.fromRange(x.rowCount).map(x => String.fromCharCode('A'.charCodeAt(0) + x))));
        this.usedCell$ = this.clutter$.pipe(map(x => x.usedCells));
    }

    updateItemQuantity(item: Lvl0Item, newQuantity: number) {
        this.itemUpdaterService.updateItem(item.id, {
            data: {
                quantity: newQuantity
            }
        })
    }

    isItemActionnable(item: Lvl0Item) {
        if (item.type === 'wand' && item.data.charge > 0 && item.data.spell) {
            return true;
        }
        if (item.type === 'scroll' && item.data.spell) {
            return true;
        }
        return false;
    }

    useItem(item: Lvl0Item) {
        this.itemService.useItem(item);
    }

    shareItem(item: Lvl0Item) {
        this.itemService.shareItem(item);
    }

    editItem(item: Lvl0Item) {
        this.itemService.editItem(item);
    }

    deleteItem(item: Lvl0Item) {
        this.itemService.deleteItem(item);
    }

    equipItem(item: Lvl0Item, event: Event) {
        if (event.target instanceof HTMLInputElement) {
            this.itemUpdaterService.updateItem(item.id, {data: {equiped: event.target.checked}})
        }
    }

    // Workaround to fix typings in template
    $items(items: Lvl0Item[]): Lvl0Item[] {
        return items;
    }
}
