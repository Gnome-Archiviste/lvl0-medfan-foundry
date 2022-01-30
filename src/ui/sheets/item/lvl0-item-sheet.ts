import {container} from 'tsyringe';
import {getItemExtraSkillsIfAvailable, Lvl0Item, Lvl0ItemWithModifiers} from 'models/item';
import {ElementRepository, ItemTypesConfigRepository, SkillRepository} from 'repositories';
import {ItemModifierManager} from '../../../managers/modifiers';
import ClickEvent = JQuery.ClickEvent;

export class Lvl0ItemSheet extends ItemSheet {
    private readonly elementRepository: ElementRepository;
    private readonly itemTypesConfigRepository: ItemTypesConfigRepository;
    private readonly itemModifierManager: ItemModifierManager;
    private readonly skillRepository: SkillRepository;

    constructor(item: Lvl0Item, options: Partial<ItemSheet.Options>) {
        super(item, options);

        this.elementRepository = container.resolve(ElementRepository);
        this.itemTypesConfigRepository = container.resolve(ItemTypesConfigRepository);
        this.itemModifierManager = container.resolve(ItemModifierManager);
        this.skillRepository = container.resolve(SkillRepository);
    }

    override getData(options?: Partial<ItemSheet.Options>) {
        let templateData = super.getData(options);

        let ammunitionTypes = {
            'arrow': 'Flèche',
            'bolt': 'Carreau',
            'dart': 'Dard',
            'marble': 'Bille',
        };
        let itemTypeConfig = this.itemTypesConfigRepository.getItemTypeConfig(this.item.data.type);
        return {
            ...templateData,
            isOwned: this.item.isOwned,
            canBeEquiped: this.item.isOwned && itemTypeConfig.canBeEquiped,
            itemTypeConfig: itemTypeConfig,
            extraSkills: this.skillRepository.getSkillsNamesByIds(),
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

        html.find("button[data-select-spell='addItemModifier']").on('click', ev => this._onAddModifier(ev));
        html.find("button[data-lvl0-action='addItemModifier']").on('click', ev => this._onAddModifier(ev));
        html.find("a[data-lvl0-action='deleteModifier']").on('click', ev => this._onRemoveModifier(ev));
        html.find("button[data-lvl0-action='addItemExtraSkill']").on('click', ev => this._onAddExtraSkill(ev));
        html.find("a[data-lvl0-action='deleteExtraSkill']").on('click', ev => this._onRemoveExtraSkill(ev));
    }

    async _onRemoveModifier(ev: ClickEvent) {
        if (!ev.target)
            return;
        let modifierId = +$(ev.target).parents('.modifier-value').data('modifier-id');
        await this.itemModifierManager.removeModifier(this.item, modifierId);
    }

    async _onAddModifier(ev: ClickEvent) {
        await this.itemModifierManager.addModifier(this.item as Lvl0ItemWithModifiers,  {stat: 'phy', value: 1});
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
        this.item.update({data: {extraSkills: {[nextId]: {id: 'champion.shield_attack'}}}}, {diff: true});
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
