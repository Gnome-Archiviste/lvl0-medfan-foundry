import skills from "../../../../data/skills.js";
import elements from "../../../../data/elements.js";
import {getItemExtraSkillsIfAvailable, getItemModifiersIfAvailable} from '../../../models/item/item-data';
import {SkillDefinition} from '../../../models/all';

export class Lvl0ItemSheet extends ItemSheet {
    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["lvl0mf", "sheet", "item"],
            template: "systems/lvl0mf-sheet/ui/sheets/item/lvl0-item-sheet.hbs",
            blockFavTab: true,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    /** @override */
    getData(options?: Partial<ItemSheet.Options>) {
        let templateData = super.getData(options);

        let extraSkills = {};
        for (let [skillCategoryId, categorySkills] of Object.entries(skills) as [string, { [id: string]: SkillDefinition }][])
            for (let [skillId, skill] of Object.entries(categorySkills)) {
                extraSkills[skillCategoryId + '.' + skillId] = skill.name;
            }

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
            elements: Object.entries(elements).reduce((previousValue, [key, value]) => {
                previousValue[key] = value.nameForWeapon;
                return previousValue;
            }, {}),
            usedAmmunitionTypes: {
                '': 'Aucune',
                ...ammunitionTypes
            }
        }
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        if (!this.options.editable) return;
        html.find("button[data-lvl0-action='addItemModifier']").click(ev => this._onAddModifier(ev));
        html.find("a[data-lvl0-action='deleteModifier']").click(ev => this._onRemoveModifier(ev));
        html.find("button[data-lvl0-action='addItemExtraSkill']").click(ev => this._onAddExtraSkill(ev));
        html.find("a[data-lvl0-action='deleteExtraSkill']").click(ev => this._onRemoveExtraSkill(ev));
    }

    _onRemoveModifier(ev: MouseEvent) {
        if (!ev.target)
            return;
        let modifierId = +$(ev.target).parents('.modifier-value').data('modifier-id');
        let modifiers = getItemModifiersIfAvailable(this.item.data) || {};
        let newModifiers = {...modifiers, ['-=' + modifierId]: null};
        this.item.update({data: {modifiers: newModifiers}});
    }

    _onAddModifier(ev: MouseEvent) {
        if (!ev.target)
            return;
        let modifiers = getItemModifiersIfAvailable(this.item.data) || {};
        let nextId = (Object.keys(modifiers).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        this.item.update({data: {modifiers: {...modifiers, [nextId]: {stat: 'phy', value: 1}}}});
    }

    _onRemoveExtraSkill(ev: MouseEvent) {
        if (!ev.target)
            return;
        let extraSkillId = +$(ev.target).parents('.extra-skill-line').data('extra-skill-id');
        let extraSkills = getItemExtraSkillsIfAvailable(this.item.data) || {};
        let newExtraSkills = {...extraSkills, ['-=' + extraSkillId]: null};
        this.item.update({data: {extraSkills: newExtraSkills}});
    }

    _onAddExtraSkill(ev: MouseEvent) {
        if (!ev.target)
            return;
        let extraSkills = getItemExtraSkillsIfAvailable(this.item.data) || {};
        let nextId = (Object.keys(extraSkills).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        this.item.update({data: {extraSkills: {...extraSkills, [nextId]: {id: 'champion.shield_attack'}}}});
    }
}
