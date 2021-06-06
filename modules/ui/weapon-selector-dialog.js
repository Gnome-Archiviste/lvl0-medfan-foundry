import specialities from '../../data/specialities.js'

/**
 * @typedef {Object} WeaponSelectorDialogData
 * @property {Item[]} weapons
 * @property {Item[]} ammunition
 */
/**
 * @callback CompleteWeaponSelectorCallback
 * @param {Item[]} selectedWeapons
 */

export class WeaponSelectorDialog extends Application {
    /**
     * @param {WeaponSelectorDialogData} data
     * @param {CompleteWeaponSelectorCallback} onComplete
     */
    constructor(data, onComplete) {
        super();

        this.onComplete = onComplete;
        this.dialogData = data;
        this.selectedWeeapon = undefined;
    }

    /** @override */
    getData(options = {}) {
        let data = super.getData(options);

        return {
            ...data,
            weapons: this.dialogData.weapons,
            ammunition: this.dialogData.ammunition,
            specialities
        };
    }

    /** @override */
    get title() {
        return "Selection de l'arme";
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        html.find('[data-select-weapon]').click(/** @type {MouseEvent} */ ev => {
            ev.currentTarget.querySelector('input[name="weapon"]').checked = true;
            this.selectedWeeapon = this.dialogData.weapons.find(i => i._id === ev.currentTarget.dataset.itemId);
            if (this.selectedWeeapon) {
                html.find('button[data-action="confirm"]').removeAttr('disabled');
                if (this.selectedWeeapon.data.data.usedAmmunitionType) {
                    this.showAmmunitionType(html, this.selectedWeeapon.data.data.usedAmmunitionType)
                }
                else {
                    this.hideAmmunition(html);
                }
            }
            else {
                html.find('button[data-action="confirm"]').prop('disabled', true);
            }
        });
        html.find('[data-select-ammo]').click(/** @type {MouseEvent} */ ev => {
            ev.currentTarget.querySelector('input[name="ammo"]').checked = true;
            this.selectedAmmo = this.dialogData.ammunition.find(i => i._id === ev.currentTarget.dataset.itemId);
        });

        html.find('[data-action]').click(ev => {
            switch (ev.target.dataset["action"]) {
                case 'cancel': {
                    this.close();
                    break;
                }
                case 'confirm': {
                    let selectedItems = [];
                    if (this.selectedWeeapon)
                        selectedItems.push(this.selectedWeeapon);
                    if (this.selectedAmmo)
                        selectedItems.push(this.selectedAmmo);
                    this.onComplete(selectedItems);
                    this.close();
                    break;
                }
            }
        });

       html.find('button[data-action="confirm"]').prop('disabled', true);

        this.hideAmmunition(html);
    }

    showAmmunitionType(html, type) {
        if (this.selectedAmmo?.data.data.ammunitionType !== type) {
            this.selectedAmmo = undefined;
            html.find('.ammunition-line input[name="ammo"][value="default"]').prop('checked', true);
        }
        html.find('.ammunition').show();
        html.find('.ammunition-line[data-ammunition-type]').hide();
        html.find('.ammunition-line[data-ammunition-type="' + type + '"]').show();
    }

    hideAmmunition(html) {
        this.selectedAmmo = undefined;
        html.find('.ammunition').hide();
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "weaponSelector",
            template: "systems/lvl0mf-sheet/templates/ui/weapon-selector-dialog.hbs",
            popOut: true,
            width: 500,
            height: 600
        });
    }
}
