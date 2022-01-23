import {DialogBase, DialogResultCallback} from './dialog-base';
import {SpecialityRepository} from '../../repositories/speciality-repository';
import {container} from 'tsyringe';

export type CompleteSelectSpecialityCallback = (selectedSpecialityName?: string) => void

export class SelectSpecialityDialog extends DialogBase<null, string> {
    private readonly specialityRepository: SpecialityRepository;

    constructor(dialogData: null, result: DialogResultCallback<string>) {
        super(dialogData, result);
        this.specialityRepository = container.resolve(SpecialityRepository);
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
