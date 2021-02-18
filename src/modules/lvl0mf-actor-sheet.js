import skills from '../data/skills.js'
import jobs from '../data/jobs.js'
import races from '../data/races.js'

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

        return {
            ...data,
            skills,
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
