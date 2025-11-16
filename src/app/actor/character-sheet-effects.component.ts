import {Component, Input, OnInit} from '@angular/core';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {map, Observable} from 'rxjs';
import {Lvl0Character} from '../data-accessor/models/lvl0-character';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {CharacterEffect, selectCharacterEffects} from '../data-accessor/selectors/character-effects-selector';
import {ActorEffectService} from '../data-accessor/actor-effect.service';

@Component({
    selector: 'lvl0-character-sheet-effects',
    templateUrl: './character-sheet-effects.component.html',
    styleUrls: ['./character-sheet-effects.component.scss'],
    standalone: false
})
export class CharacterSheetEffectsComponent implements OnInit {
    @Input() characterId!: string;

    character$: Observable<Lvl0Character>;
    characterEffects$: Observable<CharacterEffect[]>;
    hasEffect$: Observable<boolean>;

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly actorEffectService: ActorEffectService,
    ) {
    }

    ngOnInit(): void {
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);
        this.characterEffects$ = this.character$.pipe(selectCharacterEffects(this.systemDataDatabaseService));
        this.hasEffect$ = this.characterEffects$.pipe(map(x => x.length > 0));
    }

    removeEffect(characterEffect: CharacterEffect) {
        this.actorEffectService.removeEffect(this.characterId, characterEffect.effectId);
    }
}
