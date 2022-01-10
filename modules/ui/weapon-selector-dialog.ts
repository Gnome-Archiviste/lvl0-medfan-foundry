import specialities from '../../data/specialities.js'
import {AmmunitionType} from '../models/item/ammunition-item-properties';

export interface WeaponSelectorDialogData {
    weapons: Item[],
    weaponType: 'range' | 'melee',
    ammunition: Item[],
}

export type CompleteWeaponSelectorCallback = (selectedWeapons: [weapon?: Item, ammunition?: Item]) => void;

export class WeaponSelectorDialog extends Application {
    private selectedWeapon?: Item = undefined;
    private selectedAmmo?: Item = undefined;

    constructor(
        private readonly dialogData: WeaponSelectorDialogData,
        private readonly onComplete: CompleteWeaponSelectorCallback
    ) {
        super();
    }

    /** @override */
    getData(options = {}) {
        let data = super.getData(options);

        return {
            ...data,
            weapons: this.dialogData.weapons,
            weaponType: this.dialogData.weaponType,
            ammunition: this.dialogData.ammunition,
            specialities
        };
    }

    /** @override */
    get title() {
        return "Selection de l'arme";
    }

    async close(options?: Application.CloseOptions & { selected: boolean }) {
        if (!options?.selected) {
            this.onComplete([]);
        }
        return super.close(options);
    }

    /** @override */
    activateListeners(html: JQuery): void {
        super.activateListeners(html);

        html.find('[data-select-weapon]').on('click', ev => {
            let checkBox = ev.currentTarget.querySelector('input[name="weapon"]') as HTMLInputElement;
            checkBox.checked = true;
            let selectWeapon = this.dialogData.weapons.find(i => i.id === ev.currentTarget.dataset.itemId);
            if (!selectWeapon) {
                throw new Error(`Failed to find weapon with id ${ev.currentTarget.dataset.itemId}`)
            }
            this.selectWeapon(html, selectWeapon);
        });
        html.find('[data-select-ammo]').on('click', ev => {
            let checkBox = ev.currentTarget.querySelector('input[name="ammo"]') as HTMLInputElement;
            checkBox.checked = true;
            this.selectedAmmo = this.dialogData.ammunition.find(i => i.id === ev.currentTarget.dataset.itemId);
        });

        html.find('[data-action]').on('click', ev => {
            switch (ev.target.dataset["action"]) {
                case 'cancel': {
                    this.close();
                    break;
                }
                case 'confirm': {
                    let selectedItems: [Item | undefined, Item | undefined] = [undefined, undefined];
                    if (this.selectedWeapon)
                        selectedItems[0] = this.selectedWeapon;
                    if (this.selectedAmmo)
                        selectedItems[1] = this.selectedAmmo;
                    this.onComplete(selectedItems);
                    this.close({selected: true});
                    break;
                }
            }
        });

        let defaultWeapon = this.dialogData.weapons[0];
        html.find(`.weapon-line input[name="weapon"][value="${defaultWeapon._id}"]`).prop('checked', true);
        this.selectWeapon(html, defaultWeapon);
    }

    selectWeapon(html: JQuery, selectedWeapon: Item) {
        this.selectedWeapon = selectedWeapon;
        if (selectedWeapon) {
            if (selectedWeapon.data.type !== 'weapon')
                return;
            html.find('button[data-action="confirm"]').removeAttr('disabled');
            if (selectedWeapon.data.data.usedAmmunitionType) {
                this.showAmmunitionType(html, selectedWeapon.data.data.usedAmmunitionType)
            } else {
                this.hideAmmunition(html);
            }
        } else {
            html.find('button[data-action="confirm"]').prop('disabled', true);
            this.hideAmmunition(html);
        }
    }

    showAmmunitionType(html, type: AmmunitionType) {
        if (this.selectedAmmo && this.selectedAmmo.data.type === 'ammunition' && this.selectedAmmo?.data.data.ammunitionType !== type) {
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
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "weaponSelector",
            template: "systems/lvl0mf-sheet/templates/ui/weapon-selector-dialog.hbs",
            popOut: true,
            width: 500,
            height: 600
        });
    }
}
