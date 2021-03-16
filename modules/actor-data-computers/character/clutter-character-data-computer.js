import {CharacterDataComputer} from "./character-data-computer.js";

export class ClutterCharacterDataComputer extends CharacterDataComputer {

    /**
     * @override
     */
    compute(actorData, actor) {
        let totalSpace = 0;
        let columnsPhy = [];
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
        /** @type {Object.<string, number>} */
        let usedSpacesByItemType = {};

        for (let item of actor.items) {
            if (item.data.data.equiped) {
                if (item.type === 'bag') {
                    rowCount += +item.data.data.extraRows;
                    columnCount += +item.data.data.extraColumns;
                    if (item.data.data.noLimit === true) {
                        noLimit = true;
                    }
               }
                continue;
            }

            usedSpacesByItemType[item.type] = (usedSpacesByItemType[item.type] || 0) + item.data.data.clutter
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
