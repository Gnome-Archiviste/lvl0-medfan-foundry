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
        systemDataDatabaseService: SystemDataDatabaseService
    ): ActiveSkillValue {
        let skillDefinition = systemDataDatabaseService.skillRepository.getSkill(skillCategoryId, id);
        let totalValue = +skillValue.value + +basicStats[skillDefinition.stat];

        let activeSkillValue: ActiveSkillValue = {
            ...skillValue,
            masterUsed: usedSkillMastery,
            prodigyUsed: usedSkillProdigy,
            totalValue: totalValue
        };
        if (pendingSkillValue) {
            activeSkillValue = {
                ...activeSkillValue,
                value: +activeSkillValue.value + (+pendingSkillValue.value ?? 0),
                master: activeSkillValue.master || pendingSkillValue.master,
                prodigy: activeSkillValue.prodigy || pendingSkillValue.prodigy,
            } as ActiveSkillValue;
        }
        let skillId = `${skillCategoryId}.${id}`;
        for (let characterEffect of characterEffects) {
            for (let modifier of characterEffect.modifiers) {
                if (modifier.skill?.skillId == skillId) {
                    activeSkillValue.totalValue += +modifier.value;
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
            ]).subscribe({
                next([basicStats, skillValue, pendingSkillValue, isMasterUsed, isProdigyUsed, characterEffects]:
                         [ActorBasicStatValues, SkillValue, PendingSkillValue, boolean, boolean, CharacterEffect[]]) {
                    subscriber.next(CharacterActiveSkillValueSelector.selectCharacterActiveSkillValue(
                        basicStats,
                        skillCategoryId,
                        id,
                        skillValue,
                        pendingSkillValue,
                        isMasterUsed,
                        isProdigyUsed,
                        characterEffects,
                        systemDataDatabaseService
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
