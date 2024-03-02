import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogDataService} from '../data-accessor/dialog-data-service';
import {SpecialityDefinition, SpecialityRepository} from '../../repositories';

export type SelectSpecialityDialogData = {
    knownSpecialityIds: string[]
}

export type SelectSpecialityDialogResult = {
    specialityId: string;
}

@Component({
    selector: 'lvl0-select-speciality-dialog',
    templateUrl: './select-speciality-dialog.component.html',
    styleUrls: ['./select-speciality-dialog.component.scss']
})
export class SelectSpecialityDialogComponent {
    @Input('dialogDataId')
    dialogDataId: string;
    @Output('close')
    close: EventEmitter<SelectSpecialityDialogResult> = new EventEmitter<SelectSpecialityDialogResult>();

    data: SelectSpecialityDialogData;
    availableSpecialityDefinitions: SpecialityDefinition[];

    constructor(
        private readonly dialogDataService: DialogDataService,
        private readonly specialityRepository: SpecialityRepository,
    ) {
    }

    ngOnInit(): void {
        if (this.dialogDataId) {
            this.data = this.dialogDataService.consumeData<SelectSpecialityDialogData>(this.dialogDataId);
            this.availableSpecialityDefinitions = Object.values(this.specialityRepository.getSpecialitiesById())
                .filter(s => !this.data.knownSpecialityIds.includes(s.id))
        }
    }

    selectSpeciality(speciality: SpecialityDefinition) {
        this.close.emit({specialityId: speciality.id});
    }
}
