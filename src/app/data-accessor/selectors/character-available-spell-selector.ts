import {Lvl0Character} from '../models/lvl0-character';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterMana} from './character-selectors';
import {JobDefinition, SpellDefinition} from '../../../repositories';
import {selectCharacterArcaneLevel} from './character-arcane-level-selector';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {selectCharacterJobDefinition} from './character-job-definition-selector';
import {selectCharacterJobSpecializations} from './character-job-specializations-selector';
import _ from 'lodash';

export class CharacterAvailableSpellsSelector {
    static listAvailableSpells(
        systemDataDatabaseService: SystemDataDatabaseService,
        arcaneLevel: number,
        jobDefinition: JobDefinition | undefined,
        jobSpecializations: string[],
        manaValue: number
    ): SpellDefinition[] {
        if (!jobDefinition)
            return [];
        if (!jobDefinition.spellClass)
            return [];
        let spells: SpellDefinition[] = [];
        for (let specialization of jobSpecializations) {
            let specializationSpellsByLevels = systemDataDatabaseService.spellRepository.getSpellsByLevels(
                jobDefinition.spellClass,
                specialization
            );
            if (!specializationSpellsByLevels) {
                // FIXME: Logger ?
                console.error(`Spell not found for class: ${jobDefinition.spellClass} and spe: ${specialization}`)
                continue;
            }

            for (let [level, spellDefinitions] of Object.entries(specializationSpellsByLevels)) {
                if (+level > arcaneLevel)
                    continue;
                if (+level > manaValue)
                    continue;
                for (let spellDefinition of spellDefinitions) {
                    spells.push(spellDefinition);
                }
            }
        }
        return spells;
    }
}

export function selectAvailableSpells(systemDataDatabaseService: SystemDataDatabaseService) {
    return function (source: Observable<Lvl0Character>): Observable<SpellDefinition[]> {
        return new Observable<SpellDefinition[]>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterArcaneLevel(systemDataDatabaseService)),
                source.pipe(selectCharacterJobDefinition(systemDataDatabaseService)),
                source.pipe(selectCharacterJobSpecializations(systemDataDatabaseService)),
                source.pipe(selectCharacterMana()),
            ]).subscribe({
                next([arcaneLevel, jobDefinition, jobSpecializations, mana]: [number, JobDefinition, string[], number]) {
                    subscriber.next(CharacterAvailableSpellsSelector.listAvailableSpells(
                        systemDataDatabaseService,
                        arcaneLevel,
                        jobDefinition,
                        jobSpecializations,
                        mana
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
            distinctUntilChanged((a, b) => _.isEqual(a, b)),
            shareReplay(1)
        );
    };
}
