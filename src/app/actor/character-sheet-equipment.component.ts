import {Component, Input, OnInit} from '@angular/core';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {combineLatest, map, Observable} from 'rxjs';
import {Lvl0Character, StaticInventoryData} from '../data-accessor/models/lvl0-character';
import {
    selectCharacterItemsOfType,
    selectRationCount,
    selectStaticInventory,
    selectTorchCount
} from '../data-accessor/selectors/character-selectors';
import {Lvl0Item, Lvl0ItemAmmunition, Lvl0ItemPotions, Lvl0ItemWeapon} from '../data-accessor/models/lvl0-item';
import {UnionKeys} from '../../utils/util';
import {AmmunitionType} from '../../models/item';
import {SkillDefinition} from '../../repositories';
import {ItemUpdaterService} from '../data-accessor/item-updater.service';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {ItemService} from '../data-accessor/item.service';

const armorSlots: UnionKeys<Lvl0Item, 'type'>[] = ['head', 'cloak', 'necklace', 'armor', 'belt', 'hand', 'shield', 'ring', 'foot'];
type ArmorSlotNames = typeof armorSlots[number];


@Component({
    selector: 'lvl0-character-sheet-equipment',
    templateUrl: './character-sheet-equipment.component.html',
    styleUrls: ['./character-sheet-equipment.component.scss'],
    standalone: false
})
export class CharacterSheetEquipmentComponent implements OnInit {
    @Input() characterId!: string;

    character$: Observable<Lvl0Character>;
    weaponsItems$: Observable<Lvl0ItemWeapon[]>;
    ammunitionItems$: Observable<Lvl0ItemAmmunition[]>;
    arrowsItems$: Observable<Lvl0ItemAmmunition[]>;
    dartMarbleItems$: Observable<Lvl0ItemAmmunition[]>;
    potionItems$: Observable<Lvl0ItemPotions[]>;
    skillsById: Record<string, SkillDefinition>;
    armorItems: Record<ArmorSlotNames, Observable<Lvl0Item[]>>;
    torchCount$: Observable<number>;
    rationCount: Observable<number>;
    money$: Observable<number>;
    money100$: Observable<number>;
    money500$: Observable<number>;
    money1000$: Observable<number>;
    totalMoney$: Observable<number>;
    staticInventory$: Observable<StaticInventoryData>;

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly itemUpdaterService: ItemUpdaterService,
        private readonly actorUpdaterService: ActorUpdaterService,
        private readonly itemService: ItemService,
    ) {
    }

    ngOnInit() {
        this.skillsById = this.systemDataDatabaseService.skillRepository.getSkillsByIds()
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);
        this.weaponsItems$ = this.character$.pipe(selectCharacterItemsOfType('weapon'));
        this.ammunitionItems$ = this.character$.pipe(selectCharacterItemsOfType('ammunition'));
        this.potionItems$ = this.character$.pipe(selectCharacterItemsOfType('potions'));
        this.arrowsItems$ = this.ammunitionItems$.pipe(map(x => x.filter(i => i.system.ammunitionType === AmmunitionType.Arrow || i.system.ammunitionType === AmmunitionType.Bolt)));
        this.dartMarbleItems$ = this.ammunitionItems$.pipe(map(x => x.filter(i => i.system.ammunitionType === AmmunitionType.Marble || i.system.ammunitionType === AmmunitionType.Dart)));
        this.armorItems = {} as any;
        for (let armorSlot of armorSlots) {
            this.armorItems[armorSlot] = this.character$.pipe(selectCharacterItemsOfType(armorSlot), map(x => x.filter(i => i.system.equiped)))
        }
        this.staticInventory$ = this.character$.pipe(selectStaticInventory());
        this.torchCount$ = this.character$.pipe(selectTorchCount());
        this.rationCount = this.character$.pipe(selectRationCount());
        this.money$ = this.staticInventory$.pipe(map(x => x.money ?? 0));
        this.money100$ = this.staticInventory$.pipe(map(x => x.money100 ?? 0));
        this.money500$ = this.staticInventory$.pipe(map(x => x.money500 ?? 0));
        this.money1000$ = this.staticInventory$.pipe(map(x => x.money1000 ?? 0));
        this.totalMoney$ = combineLatest([
            this.money$,
            this.money100$,
            this.money500$,
            this.money1000$
        ]).pipe(map(([money, money100, money500, money1000]) => {
            return money
                + money100 * 100
                + money500 * 500
                + money1000 * 1000;
        }));
    }

    updateItemQuantity(item: Lvl0Item, newQuantity: number) {
        this.itemUpdaterService.updateItem(item.id, {
            system: {
                quantity: newQuantity
            }
        })
    }

    updateTorchCount(newCount: number) {
        this.actorUpdaterService.updateActor(this.characterId, {
            system: {
                staticInventory: {
                    torchCount: newCount
                }
            }
        });
    }

    updateRationCount(newCount: number) {
        this.actorUpdaterService.updateActor(this.characterId, {system: {staticInventory: {rationCount: newCount}}});
    }

    updateMoney(newCount: number) {
        this.actorUpdaterService.updateActor(this.characterId, {system: {staticInventory: {money: newCount}}});
    }

    updateMoney100(newCount: number) {
        this.actorUpdaterService.updateActor(this.characterId, {system: {staticInventory: {money100: newCount}}});
    }

    updateMoney500(newCount: number) {
        this.actorUpdaterService.updateActor(this.characterId, {system: {staticInventory: {money500: newCount}}});
    }

    updateMoney1000(newCount: number) {
        this.actorUpdaterService.updateActor(this.characterId, {system: {staticInventory: {money1000: newCount}}});
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
            this.itemUpdaterService.updateItem(item.id, {system: {equiped: event.target.checked}})
        }
    }

    // We should be able to used cdkMenuTriggerData but it seems buggy for now
    menuItem?: Lvl0Item
    selectMenuItem(item: Lvl0Item) {
        this.menuItem = item;
    }
}
