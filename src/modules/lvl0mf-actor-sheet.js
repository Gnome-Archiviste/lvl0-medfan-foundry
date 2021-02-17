import skills from '../data/skills.js'
import jobs from '../data/jobs.js'

export class Lvl0mfActorSheet extends ActorSheet {
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
        let jobsNamesById = Object.entries(jobs.base).reduce(((previousValue, currentValue) => {
            previousValue[currentValue[0]] = currentValue[1].name;
            return previousValue;
        }), {})

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
        let skillsByIds = {};
        for (let [skillCategoryId, categorySkills] of Object.entries(skills)) {
            for (let [skillId, skill] of Object.entries(categorySkills)) {
                skillsByIds[skillCategoryId + '.' + skillId] = skill.name;
            }
        }
        let armorSlots = ['head', 'cloak', 'necklace', 'armor', 'belt', 'hand', 'shield', 'ring', 'foot'];

        return {
            ...data,
            skills,
            skillsByIds,
            jobs: jobs.base,
            jobsNamesById: jobsNamesById,
            itemTypes,
            itemsByType,
            equipedItemsByType,
            armorSlots
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
