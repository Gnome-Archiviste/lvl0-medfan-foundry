import skills from '../data/skills.js'
import jobs from '../data/jobs.js'

export class Lvl0mfActorSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["lvl0mf", "sheet", "actor"],
            template: "systems/lvl0mf-sheet/templates/actors/lvl0mf-sheet.hbs",
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

        return {...data, skills, jobs: jobs.base, jobsNamesById: jobsNamesById}
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
