import skills from '../data/skills.js'
import jobs from '../data/jobs.js'
import races from '../data/races.js'
import statsDefinition from '../data/stats.js'

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
        let itemTypesInInventoryTabs = [];
        for (let itemType of itemTypes) {
            equipedItemsByType[itemType] = [];
            for (let item of itemsByType[itemType]) {
                if (item.data.data.equiped) {
                    equipedItemsByType[itemType].push(item);
                }
            }
            if (itemsByType[itemType].length > 0 && this._isItemTypeDisplayedInInventory(itemType))
                itemTypesInInventoryTabs.push(itemType);
        }

        let canSelectJob = data.data.level.value === 0 || game.user.isGM;
        let canSelectRace = data.data.level.value === 0 || game.user.isGM;
        let canChangeStats = data.data.level.value === 0;
        let canEditModifiers = game.user.isGM;
        let canLevelUp = this.canLevelUp(data.data);
        let nonEquipableItemType = {
            'misc': true,
            'magical': true
        };
        let modifierSkills = {
            'protection': 'Protection',
            'int': 'Intelligence',
            'phy': 'Physique',
            'cha': 'Charisme',
            'per': 'Perception',
            'dex': 'Dextérité',
            'mana': 'Mana',
            'health': 'Vie',
        };

        return {
            ...data,
            skills,
            canLevelUp,
            canChangeStats,
            nonEquipableItemType,
            canSelectRace,
            canSelectJob,
            statsDefinition,
            canEditModifiers,
            modifierSkills,
            skillsByIds: Lvl0mfActorSheet.skillsByIds,
            jobs: jobs,
            jobsNamesById: Lvl0mfActorSheet.jobsNamesById,
            races: Lvl0mfActorSheet.races,
            racesByIds: Lvl0mfActorSheet.racesByIds,
            itemTypes,
            itemTypesInInventoryTabs,
            itemsByType,
            equipedItemsByType,
            armorSlots: Lvl0mfActorSheet.armorSlots
        }
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Update Inventory Item
        html.find('.item-edit').click(ev => {
            const itemLine = $(ev.currentTarget).parents("[data-item-id]");
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
                    break;
                case "useSpeciality":
                    this.actor.useSpeciality(ev.target.dataset.specialityId);
                    break;
                case "selectSpeciality":
                    this.actor.openSelectSpecialityDialog();
                    break;
            }
        });

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const itemLine = $(ev.currentTarget).parents("[data-item-id]");
            const item = this.actor.getOwnedItem(itemLine.data("item-id"));
            Dialog.confirm({
                title: 'Supression', content: 'Voulez vous supprimer ' + item.name, yes: () => {
                    this.actor.deleteOwnedItem(itemLine.data("item-id"));
                }
            });
        });

        html.find("button[data-lvl0-action='addActorModifier']").click(ev => this._onAddModifier(ev));
        html.find("a[data-lvl0-action='deleteActorModifier']").click(ev => this._onRemoveModifier(ev));

        html.find('[data-permanent-modifier-checkbox]').click(ev => {
            const modifierId = $(ev.currentTarget).data('permanent-modifier-checkbox');
            this.actor.update({data: {modifiers: {[modifierId]: {permanent: !this.actor.data.data.modifiers[modifierId].permanent}}}});
        });

        new ContextMenu(html.find('.lvl0mf-sheet .sheet-body'), "[data-skill]", this._getSkillContextMenu());
        new ContextMenu(html.find('.lvl0mf-sheet .sheet-body'), "[data-speciality]", this._getSpecialityContextMenu());
    }

    /** @param {MouseEvent} ev */
    _onRemoveModifier(ev) {
        let modifierId = +$(ev.target).parents('.modifier-value').data('modifier-id');
        let modifiers = this.actor.data.data.modifiers || {};
        let newModifiers = {...modifiers, ['-='+modifierId]: null};
        this.actor.update({data: {modifiers: newModifiers}});
    }

    _onAddModifier() {
        let modifiers = this.actor.data.data.modifiers || {};
        let nextId = (Object.keys(modifiers).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        this.actor.update({data: {modifiers: {...modifiers, [nextId]: {stat: 'phy', value: 1}}}});
    }

    /**
     * @param {Lvl0CharacterData} data
     */
    canLevelUp(data) {
        if (!data.computedData.bases.job)
            return false;
        if (!data.computedData.bases.race)
            return false;
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

        let skillContextMenu = [
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
        ];

        if (game.user.isGM) {
            skillContextMenu.push({
                name: 'Changer la valeur sans limitation',
                icon: '<i class="fas fa-cog"></i>',
                callback: el => {
                    let [skillCategory, skillName] = rollSkillManager.splitSkill(el.data('skill'));
                    let characterSkillData = this.actor.data.data.skills[skillCategory][skillName];
                    let manualMode = !!characterSkillData.manualMode;
                    let value = characterSkillData.value;
                    this.actor.update({
                        data: {
                            skills: {
                                [skillCategory]: {
                                    [skillName]: {
                                        manualMode: !manualMode,
                                        value: (manualMode && value > 3) ? 3 : value
                                    }
                                }
                            }
                        }
                    }, {diff: true});
                }
            });
        }

        return skillContextMenu;
    }

    _getSpecialityContextMenu() {
        return [
            {
                name: 'Créer une macro',
                icon: '<i class="fas fa-scroll"></i>',
                callback: async el => {
                    let specialityId = el.data('speciality');
                    let specialityDefinition = rollSpecialityManager.getSpecialityFromId(specialityId);
                    const macro = await Macro.create({
                        name: specialityDefinition.name,
                        type: "script",
                        scope: "global",
                        command: `rollSpecialityManager.rollSpeciality(token, '${specialityId}')`
                    });

                    let freeSlot = Array.fromRange(50).map(i => i + 1).find(i => !(i in game.user.data.hotbar) || !game.macros.get(game.user.data.hotbar[i]));
                    await game.user.assignHotbarMacro(macro, freeSlot);
                }
            }
        ]
    }

    /**
     * @param {String} itemType
     * @return {boolean}
     * @private
     */
    _isItemTypeDisplayedInInventory(itemType) {
        if (itemType === 'ammunition')
            return false;
        if (itemType === 'potions')
            return false;
        if (itemType === 'weapon')
            return false;
        return true;
    }
}

Lvl0mfActorSheet.skillsByIds = {};
for (let [skillCategoryId, categorySkills] of Object.entries(skills)) {
    for (let [skillId, skill] of Object.entries(categorySkills)) {
        Lvl0mfActorSheet.skillsByIds[skillCategoryId + '.' + skillId] = skill;
    }
}
Lvl0mfActorSheet.jobsNamesById = Object.entries(jobs.base).concat(Object.entries(jobs.advance)).reduce(((previousValue, currentValue) => {
    previousValue[currentValue[0]] = currentValue[1].name;
    return previousValue;
}), {})

Lvl0mfActorSheet.racesByIds = {};
for (let raceCategory of Object.values(races)) {
    for (let [raceId, race] of Object.entries(raceCategory)) {
        Lvl0mfActorSheet.racesByIds[raceId] = race;
    }
}
