import skills from "../data/skills.js";

export class Lvl0mfItemSheet extends ItemSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["lvl0mf", "sheet", "item"],
            template: "systems/lvl0mf-sheet/templates/items/item-sheet.hbs",
            blockFavTab: true,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    /** @override */
    getData(options) {
        let data = super.getData(options);
        data.isOwned = this.entity.isOwned;
        data.modifierSkills = {
            'protection': 'Protection',
            'int': 'Intelligence',
            'phy': 'Physique',
            'cha': 'Charisme',
            'per': 'Perception',
            'dex': 'Dextérité',
            'mana': 'Mana',
            'health': 'Vie',
        };
        data.extraSkills = {};
        for (let [skillCategoryId, categorySkills] of Object.entries(skills))
            for (let [skillId, skill] of Object.entries(categorySkills)) {
                data.extraSkills[skillCategoryId + '.' + skillId] = skill.name;
            }
        return data;
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

    /** @param {MouseEvent} ev */
    _onRemoveModifier(ev) {
        let modifierId = +$(ev.target).parents('.modifier-value').data('modifier-id');
        let modifiers = this.item.data.data.modifiers || {};
        let newModifiers = {...modifiers, ['-='+modifierId]: null};
        this.item.update({data: {modifiers: newModifiers}});
    }

    _onAddModifier(ev) {
        let modifiers = this.item.data.data.modifiers || {};
        let nextId = (Object.keys(modifiers).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        this.item.update({data: {modifiers: {...modifiers, [nextId]: {stat: 'phy', value: 1}}}});
    }

    /** @param {MouseEvent} ev */
    _onRemoveExtraSkill(ev) {
        let extraSkillId = +$(ev.target).parents('.extra-skill-line').data('extra-skill-id');
        let extraSkills = this.item.data.data.extraSkills || {};
        let newModifiers = {...extraSkills, ['-='+extraSkillId]: null};
        this.item.update({data: {extraSkills: newModifiers}});
    }

    _onAddExtraSkill(ev) {
        let extraSkills = this.item.data.data.extraSkills || {};
        let nextId = (Object.keys(extraSkills).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        this.item.update({data: {extraSkills: {...extraSkills, [nextId]: {id: 'champion.shield_attack'}}}});
    }
}
