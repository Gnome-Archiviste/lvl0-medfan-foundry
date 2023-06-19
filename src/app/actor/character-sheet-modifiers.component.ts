import {Component, Input, OnInit} from '@angular/core';
import {map, Observable, of, take} from 'rxjs';
import {CharacterModifierInfo, LevelUpData, LevelValue, Lvl0Character} from '../data-accessor/models/lvl0-character';
import {selectCharacterLevel} from '../data-accessor/selectors/character-selectors';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {FoundryLvl0IdResolver} from '../foundry/foundry-lvl0-id-resolver';
import {
    ActiveCharacterModifier,
    selectCharacterModifiers
} from '../data-accessor/selectors/character-modifiers-selector';
import {StatsRepository} from '../../repositories';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {ActorStatNames} from '../../models/shared';
import {
    CharacterLevelData,
    selectCharacterLevelUpData
} from '../data-accessor/selectors/character-level-up-data-selector';

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

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly actorUpdaterService: ActorUpdaterService,
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver, // FIXME: Remove foundry dependency
        private readonly statsRepository: StatsRepository,
    ) {

    }

    ngOnInit() {
        this.stats = Object.keys(this.statsRepository.getStats().stats);
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);
        this.modifiers$ = this.character$.pipe(selectCharacterModifiers());
        this.level$ = this.character$.pipe(selectCharacterLevel());
        this.levelUpData$ = this.character$.pipe(selectCharacterLevelUpData());
        this.canEditLevel$ = this.level$.pipe(map(x => x.value > 0)) // FIXME && isGM;
        this.canEditModifiers$ = of(true);
    }

    generateMissingLevelUpData() {
        this.foundryLvl0IdResolver.getActorFromLvl0Id(this.characterId)?.openGenerateMissingLevelUpDataPopup();
    }

    addActorModifier() {
        this.modifiers$.pipe(take(1)).subscribe(modifiers => {
            let nextId = (modifiers.reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) ?? 1;
            let modifier: CharacterModifierInfo = {name: '', isPermanent: false, stat: 'phy', value: 0};
            this.actorUpdaterService.updateActor(this.characterId, {data: {modifiers: {[nextId]: modifier}}});
        })
    }

    deleteActorModifier(modifierEntityId: string) {
        this.actorUpdaterService.updateActor(this.characterId, {data: {modifiers: {['-='+modifierEntityId]: null as any}}});
    }

    updateModifierValue(modifierEntityId: string, event: Event) {
        if (event.target instanceof HTMLInputElement)
            this.actorUpdaterService.updateActor(this.characterId, {data: {modifiers: {[modifierEntityId]: {value: +event.target.value}}}});
    }

    updateModifierStat(modifierEntityId: string, event: Event) {
        if (event.target instanceof HTMLSelectElement)
            this.actorUpdaterService.updateActor(this.characterId, {data: {modifiers: {[modifierEntityId]: {stat: event.target.value as ActorStatNames}}}});
    }

    updateModifierName(modifierEntityId: string, event: Event) {
        if (event.target instanceof HTMLInputElement)
            this.actorUpdaterService.updateActor(this.characterId, {data: {modifiers: {[modifierEntityId]: {name: event.target.value}}}});
    }

    updateModifierIsPermanent(modifierEntityId: string, event: Event) {
        if (event.target instanceof HTMLInputElement)
            this.actorUpdaterService.updateActor(this.characterId, {data: {modifiers: {[modifierEntityId]: {isPermanent: event.target.checked}}}});
    }
}
