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

        let totalSpace = 0;
        let columnsPhy: number[] = [];
        let columnPerPhy = [2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
        let phy = basicStats.phy;
        let columnCount = 0;
        for (let i = 0; i < phy && i < columnPerPhy.length; i++) {
            columnCount += columnPerPhy[i];
            for (let j = 0; j < columnPerPhy[i]; j++)
                columnsPhy.push(i + 1);
        }
        let rowCount = 6;
        let noLimit = false;
        let usedSpacesByItemType: { [itemType: string]: number } = {};

        for (let item of items) {
            if (item.data.equiped) {
                if (item.type === 'bag') {
                    rowCount += +item.data.extraRows;
                    columnCount += +item.data.extraColumns;
                    if (item.data.noLimit) {
                        noLimit = true;
                    }
                }
                continue;
            }

            let quantity = 1;
            if (item.data.quantifiable) {
                quantity = item.data.quantity;
            }
            usedSpacesByItemType[item.type] = (usedSpacesByItemType[item.type] || 0) + item.data.clutter * quantity
        }

        usedSpacesByItemType['money'] =
            staticInventoryData.money * 0.01
            + staticInventoryData.money100 * 0.1
            + staticInventoryData.money500 * 0.1
            + staticInventoryData.money1000 * 0.1

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
