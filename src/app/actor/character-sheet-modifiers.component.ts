import {Component, Input, OnInit} from '@angular/core';
import {combineLatest, firstValueFrom, map, Observable, of, take} from 'rxjs';
import {CharacterModifierInfo, LevelValue, Lvl0Character} from '../data-accessor/models/lvl0-character';
import {selectCharacterLevel} from '../data-accessor/selectors/character-selectors';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {
    ActiveCharacterModifier,
    selectCharacterModifiers
} from '../data-accessor/selectors/character-modifiers-selector';
import {StatsRepository} from '../../repositories';
import {ActorStatNames} from '../../models/shared';
import {
    CharacterLevelData,
    selectCharacterLevelUpData
} from '../data-accessor/selectors/character-level-up-data-selector';
import {
    GenerateMissingLevelUpDataDialogData,
    GenerateMissingLevelUpDataDialogResult
} from './generate-missing-level-up-data-dialog.component';
import {
    MissingLevelData,
    selectCharacterMissingLevelData
} from '../data-accessor/selectors/character-missing-level-data-selector';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {DialogService} from '../data-accessor/dialog-service';
import {selectCharacterMaxHealth} from '../data-accessor/selectors/character-max-health-selector';
import {selectCharacterMaxMana} from '../data-accessor/selectors/character-max-mana-selector';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {
    ActorBasicStatValues,
    selectCharacterBasicStats
} from '../data-accessor/selectors/character-basic-stats-selector';

@Component({
    selector: 'lvl0-character-sheet-modifiers',
    templateUrl: './character-sheet-modifiers.component.html',
    styleUrls: ['./character-sheet-modifiers.component.scss']
})
export class CharacterSheetModifiersComponent implements OnInit {
    @Input() characterId!: string;

    character$: Observable<Lvl0Character>;
    canEditLevel$: Observable<boolean>
    canEditModifiers$: Observable<boolean>
    modifiers$: Observable<ActiveCharacterModifier[]>
    level$: Observable<LevelValue>
    levelUpData$: Observable<CharacterLevelData[]>
    stats: string[];
    characterMissingLevelData$: Observable<MissingLevelData | undefined>;
    characterBasicStats$: Observable<ActorBasicStatValues>;

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly statsRepository: StatsRepository,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly actorUpdaterService: ActorUpdaterService,
        private readonly dialogService: DialogService,
    ) {
    }

    ngOnInit() {
        this.stats = Object.keys(this.statsRepository.getStats().stats);
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);
        this.modifiers$ = this.character$.pipe(selectCharacterModifiers());
        this.level$ = this.character$.pipe(selectCharacterLevel());
        this.levelUpData$ = this.character$.pipe(selectCharacterLevelUpData());
        this.characterBasicStats$ = this.character$.pipe(selectCharacterBasicStats());
        this.characterMissingLevelData$ = this.character$.pipe(selectCharacterMissingLevelData(this.systemDataDatabaseService));
        this.canEditLevel$ = this.level$.pipe(map(x => x.value > 0)) // FIXME && isGM;
        this.canEditModifiers$ = of(true);
    }

    async generateMissingLevelUpData() {
        let missingLevelData = await firstValueFrom(this.characterMissingLevelData$, {defaultValue: undefined});
        if (!missingLevelData) {
            return;
        }

        let basicStats = await firstValueFrom(this.characterBasicStats$);

        let dialogData = {
            ...missingLevelData,
            basicStats: basicStats
        };

        let result = await firstValueFrom(this.dialogService.openDialog<GenerateMissingLevelUpDataDialogData, GenerateMissingLevelUpDataDialogResult>('lvl0-generate-missing-level-up', dialogData, {title: 'Generate missing level up'}), {defaultValue: undefined})
        if (!result)
            return;

        let totalNewHealth = 0;
        let totalNewMana = 0;
        for (let data of Object.values(result.levelUpData)) {
            totalNewHealth += data.health;
            totalNewMana += data.mana;
        }

        let [currentMaxHealth, currentMaxMana] = await firstValueFrom(combineLatest([
            this.character$.pipe(selectCharacterMaxHealth()),
            this.character$.pipe(selectCharacterMaxMana())
        ]))

        this.actorUpdaterService.updateActor(this.characterId, {
            system: {
                health: {value: currentMaxHealth + totalNewHealth},
                mana: {value: currentMaxMana + totalNewMana},
                levelUpData: result.levelUpData
            }
        });
    }

    addActorModifier() {
        this.modifiers$.pipe(take(1)).subscribe(modifiers => {
            let nextId = (modifiers.reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) ?? 1;
            let modifier: CharacterModifierInfo = {name: '', isPermanent: false, stat: 'phy', value: 0};
            this.actorUpdaterService.updateActor(this.characterId, {system: {modifiers: {[nextId]: modifier}}});
        })
    }

    deleteActorModifier(modifierEntityId: string) {
        this.actorUpdaterService.updateActor(this.characterId, {system: {modifiers: {['-=' + modifierEntityId]: null as any}}});
    }

    updateModifierValue(modifierEntityId: string, event: Event) {
        if (event.target instanceof HTMLInputElement)
            this.actorUpdaterService.updateActor(this.characterId, {system: {modifiers: {[modifierEntityId]: {value: +event.target.value}}}});
    }

    updateModifierStat(modifierEntityId: string, event: Event) {
        if (event.target instanceof HTMLSelectElement)
            this.actorUpdaterService.updateActor(this.characterId, {system: {modifiers: {[modifierEntityId]: {stat: event.target.value as ActorStatNames}}}});
    }

    updateModifierName(modifierEntityId: string, event: Event) {
        if (event.target instanceof HTMLInputElement)
            this.actorUpdaterService.updateActor(this.characterId, {system: {modifiers: {[modifierEntityId]: {name: event.target.value}}}});
    }

    updateModifierIsPermanent(modifierEntityId: string, event: Event) {
        if (event.target instanceof HTMLInputElement)
            this.actorUpdaterService.updateActor(this.characterId, {system: {modifiers: {[modifierEntityId]: {isPermanent: event.target.checked}}}});
    }
}
