import {inject, injectable} from 'tsyringe';
import {DialogBase, DialogResultCallback} from './dialog-base';
import {SpecialityRepository} from 'repositories';

export type CompleteSelectSpecialityCallback = (selectedSpecialityName?: string) => void

@injectable()
export class SelectSpecialityDialog extends DialogBase<object, string> {
    constructor(
        @inject("DIALOG_DATA") data: object,
        @inject("DIALOG_RESULT") result: DialogResultCallback<string>,
        @inject(SpecialityRepository) private readonly specialityRepository: SpecialityRepository
    ) {
        super(data, result);
    }

    override getData(options?: Partial<Application.Options>): object | Promise<object> {
        let data = super.getData(options);

        return {
            ...data,
            specialitiesByIds: this.specialityRepository.getSpecialitiesById()
        };
    }

    override activateListeners(html: JQuery) {
        super.activateListeners(html);

        html.find('[data-action]').on('click', async ev => {
            switch (ev.target.dataset["action"]) {
                case 'selectSpeciality': {
                    this.result(ev.target.dataset['specialityName'])
                    await this.close({selected: true});
                    break;
                }
            }
        });
    }

    protected getResult(): string | undefined {
        return undefined;
    }

    static get defaultOptions(): Application.Options {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "selectSpeciality",
            template: "systems/lvl0mf-sheet/ui/dialog/select-speciality-dialog.hbs",
            title: "Choisir une nouvelle spécialité",
            popOut: true,
            width: 500,
            height: 600
        });
    }
}
