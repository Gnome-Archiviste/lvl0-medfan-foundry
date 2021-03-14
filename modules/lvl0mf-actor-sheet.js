import skills from '../data/skills.js'
import jobs from '../data/jobs.js'
import races from '../data/races.js'
import {RollSkillManager} from "./managers/roll-skill-manager.js";

export class Lvl0mfActorSheet extends ActorSheet {
    /** @type Object.<string, SkillDefinition> */
    static skillsByIds;
    /** @type Object.<string, string> */
    static jobsNamesById;
    /** @type Object.<string, Object<string, RaceDefinition>> */
    static races = races;
    /** @type string[] */
    static armorSlots = ['head', 'cloak', 'necklace', 'armor', 'belt', 'hand', 'shield', 'ring', 'foot'];
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["lvl0mf", "sheet", "actor"],
            template: "systems/lvl0mf-sheet/templates/actors/actor-sheet.hbs",
            blockFavTab: true,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
            scrollY: [".stats", ".items", ".inventory"],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }

    /** @override */
    getData(options) {
        const data = super.getData(options);

        let itemsByType = this.actor.itemTypes;
        let itemTypes = Object.keys(itemsByType);
        let equipedItemsByType = {};
        for (let itemType of itemTypes) {
            equipedItemsByType[itemType] = [];
            for (let item of itemsByType[itemType]) {
                if (item.data.data.equiped) {
                    equipedItemsByType[itemType].push(item);
                }
            }
        }

        let canSelectJob = data.data.level.value === 0; // FIXME true for GM
        let canChangeStats = data.data.level.value === 0;  // FIXME true for GM
        let canLevelUp = this.canLevelUp(data.data);

        return {
            ...data,
            skills,
            canLevelUp,
            canChangeStats,
            canSelectJob,
            skillsByIds: Lvl0mfActorSheet.skillsByIds,
            jobs: jobs.base,
            jobsNamesById: Lvl0mfActorSheet.jobsNamesById,
            races: Lvl0mfActorSheet.races,
            racesByIds: Lvl0mfActorSheet.racesByIds,
            itemTypes,
            itemsByType,
            equipedItemsByType,
            armorSlots: Lvl0mfActorSheet.armorSlots
        }
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Update Inventory Item
        html.find('.item-edit').click(ev => {
            const itemLine = $(ev.currentTarget).parents(".item-line");
            const item = this.actor.getOwnedItem(itemLine.data("item-id"));
            if (item) {
                item.sheet.render(true);
            }
        });

        html.find('[data-equip-item-checkbox]').click(ev => {
            const itemId = $(ev.currentTarget).data('equip-item-checkbox');
            const item = this.actor.getOwnedItem(itemId);
            item.update({data: {equiped: !item.data.data.equiped}});
        });
        html.find('[data-update-item-quantity]').change(ev => {
            const itemId = $(ev.currentTarget).data('update-item-quantity');
            const item = this.actor.getOwnedItem(itemId);
            let newQuantity = $(ev.currentTarget).val();
            if (newQuantity.startsWith('+')) {
                newQuantity = item.data.data.quantity + (+newQuantity.substr(1));
            } else if (newQuantity.startsWith('-')) {
                newQuantity = item.data.data.quantity - (+newQuantity.substr(1));
            } else {
                newQuantity = +newQuantity;
            }
            item.update({data: {quantity: newQuantity}});
            ev.stopImmediatePropagation();
            ev.stopPropagation();
        });

        html.find('[data-action]').click(ev => {
            switch (ev.target.dataset.action) {
                case "levelUp":
                    this.actor.openLevelUpPopup();
            }
        });

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const itemLine = $(ev.currentTarget).parents(".item-line");
            const item = this.actor.getOwnedItem(itemLine.data("item-id"));
            Dialog.confirm({
                title: 'Supression', content: 'Voulez vous supprimer ' + item.name, yes: () => {
                    this.actor.deleteOwnedItem(itemLine.data("item-id"));
                }
            });
        });

        new ContextMenu(html.find('.lvl0mf-sheet .sheet-body'), "[data-skill]", this._getSkillContextMenu());
    }

    /**
     * @param {Lvl0CharacterData} data
     */
    canLevelUp(data) {
        if (data.baseStats.dex.value === 0)
            return false;
        if (data.baseStats.cha.value === 0)
            return false;
        if (data.baseStats.int.value === 0)
            return false;
        if (data.baseStats.per.value === 0)
            return false;
        if (data.baseStats.phy.value === 0)
            return false;
        return data.experience.value >= data.computedData.leveling.nextLevelExperience
    }

    _getSkillContextMenu() {

        return [
            {
                name: 'Lancer les dés',
                icon: '<i class="fas fa-dice"></i>',
                callback: el => {
                    rollSkillManager.rollSkill(this.actor.getActiveTokens()[0] || game.token, el.data('skill'));
                }
            },
            {
                name: 'Créer une macro',
                icon: '<i class="fas fa-scroll"></i>',
                callback: async el => {
                    let skillId = el.data('skill');
                    let skillDefinition = rollSkillManager.getSkillFromId(skillId);
                    const macro = await Macro.create({name: skillDefinition.name, type: "script", scope: "global", command: `rollSkillManager.rollSkill(token, '${skillId}')`});
                    let freeSlot = Array.fromRange(50).map(i => i + 1).find(i => !(i in game.user.data.hotbar) || !game.macros.get(game.user.data.hotbar[i]));
                    await game.user.assignHotbarMacro(macro, freeSlot);
                }
            }
        ]
    }
}

Lvl0mfActorSheet.skillsByIds = {};
for (let [skillCategoryId, categorySkills] of Object.entries(skills)) {
    for (let [skillId, skill] of Object.entries(categorySkills)) {
        Lvl0mfActorSheet.skillsByIds[skillCategoryId + '.' + skillId] = skill;
    }
}
Lvl0mfActorSheet.jobsNamesById = Object.entries(jobs.base).reduce(((previousValue, currentValue) => {
    previousValue[currentValue[0]] = currentValue[1].name;
    return previousValue;
}), {})

Lvl0mfActorSheet.racesByIds = {};
for (let raceCategory of Object.values(races)) {
    for (let [raceId, race] of Object.entries(raceCategory)) {
        Lvl0mfActorSheet.racesByIds[raceId] = race;
    }
}
