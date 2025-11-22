import {Lvl0Character, StaticInventoryData} from '../models/lvl0-character';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import _ from 'lodash';
import {selectCharacterItems, selectStaticInventory} from './character-selectors';
import {Lvl0Item} from '../models/lvl0-item';
import {ActorBasicStatValues, selectCharacterBasicStats} from './character-basic-stats-selector';


export type CharacterClutterData = {
    totalSpace: number;
    usedSpace: number;
    rowCount: number;
    columnCount: number;
    columnsPhy: number[];
    usedCells: { [key: string]: string };
}


export class CharacterClutterSelector {
    static getCharacterClutter(
        basicStats: ActorBasicStatValues,
        items: Lvl0Item[],
        staticInventoryData: StaticInventoryData,
    ): CharacterClutterData {

        let columnsPhy: number[] = [];
        let columnPerPhy = [2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
        let columnNumberPerIndex: number[] = [];
        for (let i = 0; i < columnPerPhy.length; i++) {
            for (let j = 0; j < columnPerPhy[i]; j++)
                columnNumberPerIndex.push(i+1);
        }

        let effectivePhy = basicStats.phy;
        let bagExtraRows = 0;
        let bagExtraColumns = 0;
        let noLimit = false;

        let activeBag = items.filter(item => item.type === 'bag').find(item => item.system.equiped);
        if (activeBag) {
            bagExtraRows = +activeBag.system.extraRows;
            bagExtraColumns = +activeBag.system.extraColumns;
            if (activeBag.system.unlockedColumnNumber) {
                effectivePhy = activeBag.system.unlockedColumnNumber;
            }
            if (activeBag.system.noLimit) {
                noLimit = true;
            }
        }

        let usedSpacesByItemType: { [itemType: string]: number } = {};
        let rowCount = 6 + bagExtraRows;
        let columnCount = 0;

        for (let i = 0; i < effectivePhy && i < columnPerPhy.length; i++) {
            columnCount += columnPerPhy[i];
            for (let j = 0; j < columnPerPhy[i]; j++)
                columnsPhy.push(i + 1);
        }

        columnCount += bagExtraColumns;
        for (let i = 0; i < bagExtraColumns; i++) {
            columnsPhy.push(columnNumberPerIndex[columnsPhy.length]);
        }

        for (let item of items) {
            let quantity = 1;
            if (item.system.quantifiable) {
                quantity = item.system.quantity;
            }
            usedSpacesByItemType[item.type] = (usedSpacesByItemType[item.type] || 0) + item.system.clutter * quantity
        }

        usedSpacesByItemType['money'] =
            staticInventoryData.money * 0.01
            + staticInventoryData.money100 * 0.1
            + staticInventoryData.money500 * 0.1
            + staticInventoryData.money1000 * 0.1

        let totalSpace = 0;
        if (noLimit) {
            totalSpace = -1;
        } else {
            totalSpace = rowCount * columnCount;
        }

        let row = 0;
        let column = 0;
        let usedCells = {};
        for (let [itemType, value] of Object.entries(usedSpacesByItemType)) {
            for (let i = 0; i < value; i++) {
                usedCells[column + ',' + row] = itemType;
                row++;
                if (row === rowCount) {
                    row = 0;
                    column++
                }
            }
        }

        return {
            totalSpace,
            usedSpace: Object.keys(usedCells).length,
            rowCount,
            columnCount,
            usedCells,
            columnsPhy
        } as CharacterClutterData;
    }
}

export function selectCharacterClutter() {
    return function (source: Observable<Lvl0Character>): Observable<CharacterClutterData> {
        return new Observable<CharacterClutterData>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterBasicStats()),
                source.pipe(selectCharacterItems()),
                source.pipe(selectStaticInventory()),
            ]).subscribe({
                next([basicStats, items, staticInventory]: [ActorBasicStatValues, Lvl0Item[], StaticInventoryData]) {
                    subscriber.next(CharacterClutterSelector.getCharacterClutter(basicStats, items, staticInventory));
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        }).pipe(
            distinctUntilChanged((a, b) => _.isEqual(a, b)),
            shareReplay(1)
        );
    };
}
