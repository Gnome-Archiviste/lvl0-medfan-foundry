import {Lvl0Character} from '../models/lvl0-character';
import {Lvl0Item} from '../models/lvl0-item';
import {createSelector} from './selector-helper';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {WandItemProperties} from '../../../models/item';

class CharacterFillableWandSelector {
    static selectFillableWands(
        systemDataDatabaseService: SystemDataDatabaseService,
        character: Lvl0Character
    ): (Lvl0Item & WandItemProperties)[] {
        let fillableWands: (Lvl0Item & WandItemProperties)[] = [];
        for (let wand of character.itemsByType['wand']) {
            if (wand.system.blocked)
                continue;

            if (!wand.system.spell) {
                continue;
            }

            let wandConfig = systemDataDatabaseService.wandConfigRepository.getWandConfig(wand.system.arcane);
            if (!wandConfig) {
                continue;
            }

            if (wand.system.charge < wandConfig.maxChargesPerWand) {
                fillableWands.push(wand)
            }
        }
        return fillableWands;
    }
}

export function selectCharacterFillableWands(systemDataDatabaseService: SystemDataDatabaseService) {
    return createSelector<Lvl0Character, (Lvl0Item & WandItemProperties)[]>(
        c => CharacterFillableWandSelector.selectFillableWands(systemDataDatabaseService, c)
    )
}

