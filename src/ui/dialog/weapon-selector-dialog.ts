import specialities from '../../../data/specialities.js'
import {DialogBase} from './dialog-base';
import {AmmunitionType} from '../../models/item/properties/ammunition-item-properties';

export interface WeaponSelectorDialogData {
    weapons: Item[],
    weaponType: 'range' | 'melee',
    ammunition: Item[],
}

export class WeaponSelectorDialog extends DialogBase<WeaponSelectorDialogData, [weapon?: Item, ammunition?: Item]> {
    private selectedWeapon?: Item = undefined;
    private selectedAmmo?: Item = undefined;

    override getData(options?: Partial<Application.Options>): object | Promise<object> {
        return {
            ...super.getData(options),
            weapons: this.dialogData.weapons,
            weaponType: this.dialogData.weaponType,
            ammunition: this.dialogData.ammunition,
            specialities
        };
    }

    protected override getResult(): [weapon?: Item, ammunition?: Item] {
        let selectedItems: [Item | undefined, Item | undefined] = [undefined, undefined];
        if (this.selectedWeapon)
            selectedItems[0] = this.selectedWeapon;
        if (this.selectedAmmo)
            selectedItems[1] = this.selectedAmmo;
        return selectedItems;
    }

    override activateListeners(html: JQuery): void {
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

        let defaultWeapon = this.dialogData.weapons[0];
        html.find(`.weapon-line input[name="weapon"][value="${defaultWeapon.id}"]`).prop('checked', true);
        this.selectWeapon(html, defaultWeapon);
    }

    private selectWeapon(html: JQuery, selectedWeapon: Item) {
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

    private showAmmunitionType(html, type: AmmunitionType) {
        if (this.selectedAmmo && this.selectedAmmo.data.type === 'ammunition' && this.selectedAmmo?.data.data.ammunitionType !== type) {
            this.selectedAmmo = undefined;
            html.find('.ammunition-line input[name="ammo"][value="default"]').prop('checked', true);
        }
        html.find('.ammunition').show();
        html.find('.ammunition-line[data-ammunition-type]').hide();
        html.find('.ammunition-line[data-ammunition-type="' + type + '"]').show();
    }

    private hideAmmunition(html) {
        this.selectedAmmo = undefined;
        html.find('.ammunition').hide();
    }

    static get defaultOptions(): Application.Options {
        return {
            ...super.defaultOptions,
            id: "weaponSelector",
            title: "Selection de l'arme",
            template: "systems/lvl0mf-sheet/ui/dialog/weapon-selector-dialog.hbs",
            popOut: true,
            width: 500,
            height: 600
        };
    }
}
