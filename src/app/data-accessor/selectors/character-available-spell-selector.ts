import {Lvl0Character} from '../models/lvl0-character';
import {combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {selectCharacterMana} from './character-selectors';
import {JobDefinition, SpellDefinition} from '../../../repositories';
import {selectCharacterArcaneLevel} from './character-arcane-level-selector';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {selectCharacterJobDefinition} from './character-job-definition-selector';
import {selectCharacterJobSpecializations} from './character-job-specializations-selector';
import _ from 'lodash';
import {
    selectSuperiorArcaneCapability, SuperiorArcaneCapability
} from './character-superior-arcane-capability-selector';


export type CharacterSuperiorArcaneCapability = {
    sourceType: 'item';
    sourceId: string;
    label: string;
    levelDiff: number;
    cost: number;
    damage: number;
}

export type CharacterAvailableSpell = {
    spellDefinition: SpellDefinition,
    superiorArcaneCapability?: CharacterSuperiorArcaneCapability
}

export class CharacterAvailableSpellsSelector {
    static listAvailableSpells(
        systemDataDatabaseService: SystemDataDatabaseService,
        arcaneLevel: number,
        jobDefinition: JobDefinition | undefined,
        jobSpecializations: string[],
        manaValue: number,
        superiorArcaneCapabilities: SuperiorArcaneCapability[]
    ): CharacterAvailableSpell[] {
        if (!jobDefinition)
            return [];
        if (!jobDefinition.spellClass)
            return [];
        let spells: CharacterAvailableSpell[] = [];
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
                let spellLevel = +level;
                if (spellLevel > arcaneLevel) {
                    for (let superiorArcaneCapability of superiorArcaneCapabilities) {
                        if (spellLevel > (superiorArcaneCapability.maximumArcaneLevel || 20)) {
                            continue;
                        }
                        let levelDiff = spellLevel - arcaneLevel;
                        let manaCost = spellLevel;
                        if (superiorArcaneCapability.manaMultiplier) {
                            manaCost = (superiorArcaneCapability.manaMultiplier) * manaCost;
                        }
                        let damage = 0;
                        if (superiorArcaneCapability.damagePerLevel) {
                            damage = superiorArcaneCapability.damagePerLevel * levelDiff;
                        }
                        if (manaCost > manaValue)
                            continue;
                        for (let spellDefinition of spellDefinitions) {
                            spells.push({
                                spellDefinition: spellDefinition,
                                superiorArcaneCapability: {
                                    sourceType: superiorArcaneCapability.sourceType,
                                    sourceId: superiorArcaneCapability.sourceId,
                                    label: superiorArcaneCapability.label,
                                    levelDiff: levelDiff,
                                    cost: manaCost,
                                    damage: damage,
                                }
                            });
                        }
                    }
                    continue;
                }
                if (spellLevel > manaValue)
                    continue;
                for (let spellDefinition of spellDefinitions) {
                    spells.push({spellDefinition: spellDefinition});
                }
            }
        }
        return spells;
    }
}

export function selectAvailableSpells(systemDataDatabaseService: SystemDataDatabaseService) {
    return function (source: Observable<Lvl0Character>): Observable<CharacterAvailableSpell[]> {
        return new Observable<CharacterAvailableSpell[]>(subscriber => {
            return combineLatest([
                source.pipe(selectCharacterArcaneLevel(systemDataDatabaseService)),
                source.pipe(selectCharacterJobDefinition(systemDataDatabaseService)),
                source.pipe(selectCharacterJobSpecializations(systemDataDatabaseService)),
                source.pipe(selectCharacterMana()),
                source.pipe(selectSuperiorArcaneCapability()),
            ]).subscribe({
                next([arcaneLevel, jobDefinition, jobSpecializations, mana, superiorArcaneCapabilities]: [number, JobDefinition, string[], number, SuperiorArcaneCapability[]]) {
                    subscriber.next(CharacterAvailableSpellsSelector.listAvailableSpells(
                        systemDataDatabaseService,
                        arcaneLevel,
                        jobDefinition,
                        jobSpecializations,
                        mana,
                        superiorArcaneCapabilities
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
