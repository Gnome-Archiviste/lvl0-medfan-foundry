import {container} from 'tsyringe';
import ClickEvent = JQuery.ClickEvent;
import {getItemExtraSkillsIfAvailable, getItemModifiersIfAvailable, Lvl0Item} from 'models/item';
import {ElementRepository} from 'repositories';

export class Lvl0ItemSheet extends ItemSheet {
    private readonly elementRepository: ElementRepository;

    constructor(item: Lvl0Item, options: Partial<ItemSheet.Options>) {
        super(item, options);

        this.elementRepository = container.resolve(ElementRepository);
    }

    override getData(options?: Partial<ItemSheet.Options>) {
        let templateData = super.getData(options);

        let ammunitionTypes = {
            'arrow': 'Flèche',
            'bolt': 'Carreau',
            'dart': 'Dard',
            'marble': 'Bille',
        };
        return {
            ...templateData,
            isOwned: this.item.isOwned,
            modifierSkills: {
                'protection': 'Protection',
                'damage': 'Dégâts',
                'int': 'Intelligence',
                'phy': 'Physique',
                'cha': 'Charisme',
                'per': 'Perception',
                'dex': 'Dextérité',
                'mana': 'Mana',
                'health': 'Vie',
            },
            weaponTypes: {
                'melee': 'Mêlée',
                'range': 'Distance',
                'melee-range': 'Mêlée et Distance',
            },
            ammunitionTypes,
            elements: this.elementRepository.getElementWeaponNameByElementsIds(),
            usedAmmunitionTypes: {
                '': 'Aucune',
                ...ammunitionTypes
            }
        }
    }

    override activateListeners(html: JQuery) {
        super.activateListeners(html);

        // Prevent [Enter] to "submit" the form, which in this case since there is no `submit` for this form it will
        // press the first button available and often do something unwanted
        html.find('input').on('keypress', function (event) {
            if (event.key == 'Enter') {
                event.target.blur();
                event.preventDefault();
            }
        });

        if (!this.options.editable) {
            return;
        }

        html.find("button[data-lvl0-action='addItemModifier']").on('click', ev => this._onAddModifier(ev));
        html.find("a[data-lvl0-action='deleteModifier']").on('click', ev => this._onRemoveModifier(ev));
        html.find("button[data-lvl0-action='addItemExtraSkill']").on('click', ev => this._onAddExtraSkill(ev));
        html.find("a[data-lvl0-action='deleteExtraSkill']").on('click', ev => this._onRemoveExtraSkill(ev));
    }

    _onRemoveModifier(ev: ClickEvent) {
        if (!ev.target)
            return;
        let modifierId = +$(ev.target).parents('.modifier-value').data('modifier-id');
        let modifiers = getItemModifiersIfAvailable(this.item.data) || {};
        let newModifiers = {...modifiers, ['-=' + modifierId]: null};
        this.item.update({data: {modifiers: newModifiers}});
    }

    _onAddModifier(ev: ClickEvent) {
        if (!ev.target)
            return;
        let modifiers = getItemModifiersIfAvailable(this.item.data) || {};
        let nextId = (Object.keys(modifiers).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        this.item.update({data: {modifiers: {...modifiers, [nextId]: {stat: 'phy', value: 1}}}});
    }

    _onRemoveExtraSkill(ev: ClickEvent) {
        if (!ev.target)
            return;
        let extraSkillId = +$(ev.target).parents('.extra-skill-line').data('extra-skill-id');
        let extraSkills = getItemExtraSkillsIfAvailable(this.item.data) || {};
        let newExtraSkills = {...extraSkills, ['-=' + extraSkillId]: null};
        this.item.update({data: {extraSkills: newExtraSkills}});
    }

    _onAddExtraSkill(ev: ClickEvent) {
        if (!ev.target)
            return;
        let extraSkills = getItemExtraSkillsIfAvailable(this.item.data) || {};
        let nextId = (Object.keys(extraSkills).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        this.item.update({data: {extraSkills: {...extraSkills, [nextId]: {id: 'champion.shield_attack'}}}});
    }

    static get defaultOptions(): ItemSheet.Options {
        return {
            ...super.defaultOptions,
            classes: ["lvl0mf", "sheet", "item"],
            template: "systems/lvl0mf-sheet/ui/sheets/item/lvl0-item-sheet.hbs",
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        };
    }
}
