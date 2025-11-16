import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {ActiveSkillValue, Lvl0Character, PendingSkillValue, SkillValue} from '../models/lvl0-character';
import {ActorBasicStatValues, selectCharacterBasicStats} from './character-basic-stats-selector';
import {
    selectCharacterPendingSkillValue,
    selectCharacterSkillValue,
    selectIsSkillMasterUsed,
    selectIsSkillProdigyUsed
} from './character-selectors';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {CharacterEffect, selectCharacterEffects} from './character-effects-selector';
import {selectCharacterEquipedItems} from './character-equiped-items-selector';
import {Lvl0Item} from '../models/lvl0-item';

export class CharacterActiveSkillValueSelector {
    static selectCharacterActiveSkillValue(
        basicStats: ActorBasicStatValues,
        skillCategoryId: string,
        id: string,
        skillValue: SkillValue,
        pendingSkillValue: PendingSkillValue,
        usedSkillMastery: boolean,
        usedSkillProdigy: boolean,
        characterEffects: CharacterEffect[],
        systemDataDatabaseService: SystemDataDatabaseService,
        equipedItems: Lvl0Item[]
    ): ActiveSkillValue {
        let skillDefinition = systemDataDatabaseService.skillRepository.getSkill(skillCategoryId, id);
        let totalValue = +skillValue.value + +basicStats[skillDefinition.stat];

        let activeSkillValue: ActiveSkillValue = {
            ...skillValue,
            masterUsed: usedSkillMastery,
            prodigyUsed: usedSkillProdigy,
            successValue: totalValue
        };
        if (pendingSkillValue) {
            let pendingSkillLevel = +pendingSkillValue.value;
            activeSkillValue = {
                ...activeSkillValue,
                value: +activeSkillValue.value + pendingSkillLevel,
                successValue: activeSkillValue.successValue + pendingSkillLevel,
                master: activeSkillValue.master || pendingSkillValue.master,
                prodigy: activeSkillValue.prodigy || pendingSkillValue.prodigy,
            } as ActiveSkillValue;
        }
        let skillId = `${skillCategoryId}.${id}`;
        for (let characterEffect of characterEffects) {
            for (let modifier of characterEffect.modifiers) {
                if (modifier.skill?.skillId == skillId) {
                    activeSkillValue.successValue += +modifier.value;
                }
            }
        }
        if (activeSkillValue.value < 3) {
            outerBlock: {
                for (let equipedItem of equipedItems) {
                    if ('extraSkills' in equipedItem.system) {
                        for (let extraSkill of Object.values(equipedItem.system.extraSkills)) {
                            if (extraSkill.id === skillId) {
                                activeSkillValue.successValue += 1;
                                activeSkillValue.value += 1;
                                break outerBlock;
                            }
                        }
                    }
                }
            }
        }

        return activeSkillValue;
    }
}

export function selectCharacterActiveSkillValue(skillCategoryId: string, id: string, systemDataDatabaseService: SystemDataDatabaseService) {
    return function (source: Observable<Lvl0Character>): Observable<ActiveSkillValue> {
        return new Observable<ActiveSkillValue>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterBasicStats()),
                source.pipe(selectCharacterSkillValue(skillCategoryId, id)),
                source.pipe(selectCharacterPendingSkillValue(skillCategoryId, id)),
                source.pipe(selectIsSkillMasterUsed(skillCategoryId, id)),
                source.pipe(selectIsSkillProdigyUsed(skillCategoryId, id)),
                source.pipe(selectCharacterEffects(systemDataDatabaseService)),
                source.pipe(selectCharacterEquipedItems()),
            ]).subscribe({
                next([basicStats, skillValue, pendingSkillValue, isMasterUsed, isProdigyUsed, characterEffects, equipedItems]:
                         [ActorBasicStatValues, SkillValue, PendingSkillValue, boolean, boolean, CharacterEffect[], Lvl0Item[]]) {
                    subscriber.next(CharacterActiveSkillValueSelector.selectCharacterActiveSkillValue(
                        basicStats,
                        skillCategoryId,
                        id,
                        skillValue,
                        pendingSkillValue,
                        isMasterUsed,
                        isProdigyUsed,
                        characterEffects,
                        systemDataDatabaseService,
                        equipedItems
                    ));
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        }).pipe(
            distinctUntilChanged(),
            shareReplay(1)
        );
    };
}
