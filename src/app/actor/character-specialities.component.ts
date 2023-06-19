import {Component, Input, OnInit} from '@angular/core';
import {map, Observable} from 'rxjs';
import {SpecialityDefinition} from '../../repositories';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {selectCharacterSpecialityInfo} from '../data-accessor/selectors/character-specialities-selector';
import {CharacterSpecialitiesInfo, CharacterSpeciality, Lvl0Character} from '../data-accessor/models/lvl0-character';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {FoundryLvl0IdResolver} from '../foundry/foundry-lvl0-id-resolver';
import {CdkMenu} from '@angular/cdk/menu';
import {MacroService} from '../shared/macro.service';
import {SpecialityService} from '../shared/speciality.service';

@Component({
    selector: 'lvl0-character-specialities',
    templateUrl: './character-specialities.component.html',
    styleUrls: ['./character-specialities.component.scss']
})
export class CharacterSpecialitiesComponent implements OnInit {
    @Input() characterId: string;

    character$: Observable<Lvl0Character>;
    canSelectNewSpeciality$: Observable<boolean>;
    characterSpecialitiesInfo$: Observable<CharacterSpecialitiesInfo>;
    knownSpecialities$: Observable<CharacterSpeciality[]>;

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly macroService: MacroService,
        private readonly specialityService: SpecialityService,
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver, // FIXME: Temporary, will rework later to do not depend directly on foundry here
    ) {
    }

    ngOnInit() {
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);
        this.characterSpecialitiesInfo$ = this.character$.pipe(selectCharacterSpecialityInfo(this.systemDataDatabaseService));
        this.knownSpecialities$ = this.characterSpecialitiesInfo$.pipe(map(x => x.specialities));
        this.canSelectNewSpeciality$ = this.characterSpecialitiesInfo$.pipe(map(x => x.canSelectNewSpeciality));
    }

    useSpeciality(speciality: SpecialityDefinition) {
        this.foundryLvl0IdResolver.getActorFromLvl0Id(this.characterId)?.useSpeciality(speciality.id)
    }

    createMacro(menuContent: CdkMenu, specialityDefinition: SpecialityDefinition) {
        menuContent.menuStack.closeAll();
        this.macroService.createUseSpecialityMacro(specialityDefinition);
    }

    deleteSpeciality(menuContent: CdkMenu, characterSpeciality: CharacterSpeciality) {
        menuContent.menuStack.closeAll();
        this.specialityService.removeSpeciality(this.characterId, characterSpeciality.entityId);
    }
}
