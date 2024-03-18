import {Component, Input, OnInit} from '@angular/core';
import {map, Observable, take} from 'rxjs';
import {SpecialityDefinition} from '../../repositories';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {selectCharacterSpecialityInfo} from '../data-accessor/selectors/character-specialities-selector';
import {CharacterSpecialitiesInfo, CharacterSpeciality, Lvl0Character} from '../data-accessor/models/lvl0-character';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {CdkMenu} from '@angular/cdk/menu';
import {MacroService} from '../shared/macro.service';
import {SpecialityService} from '../speciality/speciality.service';
import {DialogService} from '../data-accessor/dialog-service';
import {
    SelectSpecialityDialogData,
    SelectSpecialityDialogResult
} from '../speciality/select-speciality-dialog.component';
import {UserService} from '../shared/user-service';

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
        private readonly dialogService: DialogService,
        private readonly macroService: MacroService,
        private readonly specialityService: SpecialityService,
        private readonly userService: UserService,
    ) {
    }

    ngOnInit() {
        this.character$ = this.characterAccessorService.selectCharacter(this.characterId);
        this.characterSpecialitiesInfo$ = this.character$.pipe(selectCharacterSpecialityInfo(this.systemDataDatabaseService));
        this.knownSpecialities$ = this.characterSpecialitiesInfo$.pipe(map(x => x.specialities));
        this.canSelectNewSpeciality$ = this.characterSpecialitiesInfo$.pipe(map(x => x.canSelectNewSpeciality));
    }

    useSpeciality(speciality: SpecialityDefinition) {
        this.specialityService.useSpeciality(this.characterId, speciality.id);
    }

    createMacro(menuContent: CdkMenu, specialityDefinition: SpecialityDefinition) {
        menuContent.menuStack.closeAll();
        this.macroService.createUseSpecialityMacro(specialityDefinition);
    }

    deleteSpeciality(menuContent: CdkMenu, characterSpeciality: CharacterSpeciality) {
        menuContent.menuStack.closeAll();
        this.specialityService.removeSpeciality(this.characterId, characterSpeciality.entityId);
    }

    selectSpeciality() {
        this.knownSpecialities$.pipe(take(1)).subscribe(knownSpecialities => {
            let dialogData: SelectSpecialityDialogData = {
                knownSpecialityIds: knownSpecialities.map(x => x.speciality.id)
            };
            this.dialogService.openDialog<SelectSpecialityDialogData, SelectSpecialityDialogResult>('lvl0-select-speciality-dialog', dialogData, {title: 'Select speciality'}).subscribe((result) => {
                this.specialityService.addSpeciality(this.characterId, result.specialityId);
            });
        })
    }

    canForgetSpeciality() {
        return this.userService.isGm();
    }
}
