import specialities from '../../data/specialities.js'

/**
 * @callback CompleteSelectSpecialityCallback
 * @param {string} selectedSpecialityName
 */

export class SelectSpecialityDialog extends Application {
    /**
     * @param {CompleteSelectSpecialityCallback} onComplete
     */
    constructor(onComplete) {
        super();

        this.onComplete = onComplete;
    }

    /** @override */
    getData(options = {}) {
        let data = super.getData(options);

        return {
            ...data,
            specialities
        };
    }

    /** @override */
    get title() {
        return "Choisir une nouvelle spécialité";
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        html.find('[data-action]').click(ev => {
            switch (ev.target.dataset["action"]) {
                case 'cancel': {
                    this.onComplete(undefined);
                    this.close();
                    break;
                }
                case 'confirm': {
                    this.onComplete(ev.target.dataset['specialityName']);
                    this.close();
                    break;
                }
            }
        });
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "selectSpeciality",
            template: "systems/lvl0mf-sheet/templates/ui/select-speciality-dialog.hbs",
            popOut: true,
            width: 500,
            height: 600
        });
    }
}
