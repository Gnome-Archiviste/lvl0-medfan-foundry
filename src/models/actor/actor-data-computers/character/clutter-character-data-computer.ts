import {CharacterDataComputer} from "./character-data-computer";
import {Lvl0Actor} from '../../lvl0-actor';
import {Lvl0ActorCharacterData} from '../../properties-data';
import {singleton} from 'tsyringe';

@singleton()
export class ClutterCharacterDataComputer extends CharacterDataComputer {

    override computeCharacter(actorData: Lvl0ActorCharacterData, actor: Lvl0Actor): void {
        let totalSpace = 0;
        let columnsPhy: number[] = [];
        let columnPerPhy = [2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
        let phy = actorData.computedData.stats.baseStats.phy.value;
        let columnCount = 0;
        for (let i = 0; i < phy && i < columnPerPhy.length; i++){
            columnCount += columnPerPhy[i];
            for (let j = 0; j < columnPerPhy[i]; j++)
                columnsPhy.push(i + 1);
        }
        let rowCount = 6;
        let noLimit = false;
        let usedSpacesByItemType: {[itemType: string]: number} = {};

        for (let item of actor.items) {
            if (item.data.data.equiped) {
                let itemData = item.data;
                if (itemData.type === 'bag') {
                    rowCount += +itemData.data.extraRows;
                    columnCount += +itemData.data.extraColumns;
                    if (itemData.data.noLimit) {
                        noLimit = true;
                    }
               }
                continue;
            }

            let quantity = 1;
            if (item.data.data.quantifiable) {
                quantity = item.data.data.quantity;
            }
            usedSpacesByItemType[item.type] = (usedSpacesByItemType[item.type] || 0) + item.data.data.clutter * quantity
        }

        usedSpacesByItemType['money'] = actorData.staticInventory.money * 0.01
            + actorData.staticInventory.money100 * 0.1
            + actorData.staticInventory.money500 * 0.1
            + actorData.staticInventory.money1000 * 0.1

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
                if (row  === rowCount) {
                    row = 0;
                    column++
                }
            }
        }

        actorData.computedData.clutter = {
            totalSpace,
            usedSpace: Object.keys(usedCells).length,
            rowCount,
            columnCount,
            usedCells,
            columnsPhy
        };
    }
}
