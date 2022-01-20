import skills from '../../../../data/skills.js'
import jobs from '../../../../data/jobs.js'
import races from '../../../../data/races.js'
import statsDefinition from '../../../../data/stats.js'
import {Lvl0CharacterData} from '../../../models/character/character';
import {SkillDefinition} from '../../../models/all';
import {RaceDefinition} from '../../../models/data/race/race';
import {JobDefinition} from '../../../models/data/job/job-definition';
import {RollSkillManager} from '../../../managers/roll-skill-manager';
import {RollSpecialityManager} from '../../../managers/roll-speciality-manager';
import {SkillValue} from '../../../models/data/skill/skill';

export interface Lvl0mfActorSheetData extends ActorSheet.Data {
    actorData: Lvl0CharacterData,
    skills: { [skillCategoryId: string]: { [skillId: string]: SkillValue } },
    nonEquipableItemType: { [typeName: string]: boolean },
    actionableItemType: { [typeName: string]: boolean },
    canLevelUp: boolean,
    canChangeStats: boolean,
    canSelectRace: boolean,
    canSelectJob: boolean,
    canEditLevel: boolean,
    canEditModifiers: boolean,
    statsDefinition: { stats: { [statId: string]: string } },
    modifierSkills: { [statId: string]: string },
    skillsByIds: { [skillId: string]: SkillDefinition },
    jobs: typeof jobs,
    jobsNamesById: { [jobId: string]: string },
    races: { [categoryId: string]: { [raceId: string]: RaceDefinition } },
    racesByIds: { [raceId: string]: RaceDefinition },
    itemTypes: string[],
    itemTypesInInventoryTabs: string[],
    itemsByType: { [itemType: string]: Item[] },
    equipedItemsByType: { [itemType: string]: Item[] },
    armorSlots: string[]
}

// FIXME: Rename to character
export class Lvl0CharacterActorSheet<Options extends ActorSheet.Options = ActorSheet.Options> extends ActorSheet<Options, Lvl0mfActorSheetData> {

    static skillsByIds: { [skillId: string]: SkillDefinition };
    static jobsNamesById: { [jobId: string]: string };
    static races = races;
    static armorSlots = ['head', 'cloak', 'necklace', 'armor', 'belt', 'hand', 'shield', 'ring', 'foot'];
    static racesByIds: { [raceId: string]: RaceDefinition };

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["lvl0mf", "sheet", "actor"],
            template: "systems/lvl0mf-sheet/ui/sheets/actor/lvl0-character-actor-sheet.hbs",
            blockFavTab: true,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
            scrollY: [".stats", ".items", ".inventory"],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }

    /**
     * @override
     */
    getData(options?: Partial<Options>): Lvl0mfActorSheetData | Promise<Lvl0mfActorSheetData> {
        const context = super.getData(options);

        let itemsByType = this.actor.itemTypes;
        let itemTypes = Object.keys(itemsByType);
        let equipedItemsByType = {};
        let itemTypesInInventoryTabs: string[] = [];
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

        let canSelectJob = this.actor.data.data.level.value === 0 || game.user?.isGM;
        let canSelectRace = this.actor.data.data.level.value === 0 || game.user?.isGM;
        let canChangeStats = this.actor.data.data.level.value === 0;
        let canEditModifiers = game.user?.isGM;
        let canEditLevel = game.user?.isGM && this.actor.data.data.level.value > 0;
        let canLevelUp = this.canLevelUp(this.actor.data.data);
        let nonEquipableItemType = {
            'misc': true,
            'magical': true,
            'wand': true,
            'scroll': true
        };
        let actionableItemType = {
            'wand': true,
            'scroll': true
        };
        let modifierSkills = {
            'protection': 'Protection',
            'damage': 'Dégâts',
            'int': 'Intelligence',
            'phy': 'Physique',
            'cha': 'Charisme',
            'per': 'Perception',
            'dex': 'Dextérité',
            'mana': 'Mana',
            'health': 'Vie',
        };

        return <Lvl0mfActorSheetData>{
            ...context,
            actorData: this.actor.data.data,
            skills,
            canLevelUp,
            canChangeStats,
            nonEquipableItemType,
            actionableItemType,
            canSelectRace,
            canSelectJob,
            canEditLevel,
            statsDefinition,
            canEditModifiers,
            modifierSkills,
            skillsByIds: Lvl0CharacterActorSheet.skillsByIds,
            jobs: jobs,
            jobsNamesById: Lvl0CharacterActorSheet.jobsNamesById,
            races: Lvl0CharacterActorSheet.races,
            racesByIds: Lvl0CharacterActorSheet.racesByIds,
            itemTypes,
            itemTypesInInventoryTabs,
            itemsByType,
            equipedItemsByType,
            armorSlots: Lvl0CharacterActorSheet.armorSlots
        }
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('[data-update-item-quantity]').change(ev => {
            ev.stopImmediatePropagation();
            ev.stopPropagation();

            const itemId = $(ev.currentTarget).data('update-item-quantity');
            const item = this.actor.items.get(itemId);
            if (!item)
                throw new Error(`Failed to get item '${itemId}' when trying to update quantity`)
            let quantityInput = $(ev.currentTarget).val() as string;
            if (!quantityInput) {
                ui.notifications?.error('Invalid quantity');
                return;
            }

            let newQuantity = 0;
            if (quantityInput.startsWith('+')) {
                newQuantity = item.data.data.quantity + (+quantityInput.substr(1));
            } else if (quantityInput.startsWith('-')) {
                newQuantity = item.data.data.quantity - (+quantityInput.substr(1));
            } else {
                newQuantity = +quantityInput;
            }
            item.update({data: {quantity: newQuantity}}).then();
        });

        html.find('[data-action]').on('click', async ev => {
            switch (ev.target.dataset.action) {
                case "levelUp":
                    this.actor.openLevelUpPopup();
                    break;
                case "generateMissingLevelUpData":
                    this.actor.openGenerateMissingLevelUpDataPopup();
                    break;
                case "useSpeciality":
                    await this.actor.useSpeciality(ev.target.dataset.specialityId);
                    break;
                case "createSpecialityMacro": {
                    let specialityId = ev.target.dataset.specialityId;
                    let speciality = RollSpecialityManager.getSpecialityFromId(specialityId);
                    const macro = await Macro.create({
                        name: speciality.name,
                        type: "script",
                        img: speciality.icon,
                        scope: "actor",
                        command: `token.actor.useSpeciality('${specialityId}')`
                    });
                    if (!macro) {
                        ui.notifications?.error('Failed to create macro');
                        return;
                    }
                    await game.user?.assignHotbarMacro(macro, '');
                    break;
                }
                case "selectSpeciality":
                    this.actor.openSelectSpecialityDialog();
                    break;
            }
        });

        html.find('[data-item-action]').on('click', async ev => {
            const itemLine = $(ev.currentTarget).parents("[data-item-id]");
            const item = this.actor.items.get(itemLine.data("item-id"));
            if (!item) {
                return;
            }
            switch (ev.currentTarget.dataset.itemAction) {
                case 'use':
                    await item.use();
                    break;
                case 'share':
                    let copy = await Item.create(item.toObject());
                    if (copy) {
                        await ChatMessage.create({
                            type: CONST.CHAT_MESSAGE_TYPES.OTHER,
                            content: `@Item[${copy.id}]{${copy.name}}`
                        });
                    }
                    break;
                case 'edit':
                    item.sheet?.render(true);
                    break;
                case 'delete':
                    Dialog.confirm({
                        title: 'Supression', content: 'Voulez vous supprimer ' + item?.name, yes: () => {
                            this.actor.items.get(itemLine.data("item-id"))?.delete();
                        }
                    });
                    break;
            }
        });


        html.find('[data-equip-item-checkbox]').click(ev => {
            const itemId = $(ev.currentTarget).data('equip-item-checkbox');
            const item = this.actor.items.get(itemId);
            if (!item)
                throw new Error(`Failed to get item '${itemId}' when trying to equip it`)
            item.update({data: {equiped: !item.data.data.equiped}}).then();
        });

        html.find("button[data-lvl0-action='addActorModifier']").on('click', ev => this._onAddModifier(ev));
        html.find("a[data-lvl0-action='deleteActorModifier']").on('click', ev => this._onRemoveModifier(ev));
        html.find("a[data-lvl0-action='deleteActorEffect']").on('click', ev => this._onRemoveEffect(ev));

        html.find('[data-permanent-modifier-checkbox]').on('click', ev => {
            const modifierId = $(ev.currentTarget).data('permanent-modifier-checkbox');
            this.actor.update({data: {modifiers: {[modifierId]: {isPermanent: !this.actor.data.data.modifiers[modifierId].isPermanent}}}});
        });

        new ContextMenu(html.find('.lvl0mf-sheet .sheet-body'), "[data-skill]", this._getSkillContextMenu());
        new ContextMenu(html.find('.lvl0mf-sheet .sheet-body'), "[data-speciality]", this._getSpecialityContextMenu());
    }

    _onRemoveEffect(ev: MouseEvent): void {
        if (!ev.target)
            return;
        let effectId = +$(ev.target).parents('.effect-value').data('effect-id');
        let effects = this.actor.data.data.effects || {};
        let newModifiers = {...effects, ['-=' + effectId]: null};
        this.actor.update({data: {effects: newModifiers}});
    }

    _onRemoveModifier(ev: MouseEvent): void {
        if (!ev.target)
            return;
        let modifierId = +$(ev.target).parents('.modifier-value').data('modifier-id');
        let modifiers = this.actor.data.data.modifiers || {};
        let newModifiers = {...modifiers, ['-=' + modifierId]: null};
        this.actor.update({data: {modifiers: newModifiers}});
    }

    _onAddModifier(ev: MouseEvent): void {
        if (!ev.target)
            return;
        let modifiers = this.actor.data.data.modifiers || {};
        let nextId = (Object.keys(modifiers).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        this.actor.update({data: {modifiers: {...modifiers, [nextId]: {stat: 'phy', value: 1}}}});
    }

    canLevelUp(data: Lvl0CharacterData): boolean {
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
                    RollSkillManager.rollSkill(this.actor.getActiveTokens()[0], el.data('skill'));
                }
            },
            {
                name: 'Créer une macro',
                icon: '<i class="fas fa-scroll"></i>',
                callback: async el => {
                    let skillId = el.data('skill');
                    let skillDefinition = RollSkillManager.getSkillFromId(skillId);
                    const macro = await Macro.create({
                        name: skillDefinition.name,
                        type: "script",
                        img: skillDefinition.icon,
                        scope: "actor",
                        command: `rollSkillManager.rollSkill(token, '${skillId}')`
                    });
                    if (!macro) {
                        ui.notifications?.error('Failed to create macro');
                        return;
                    }
                    await game.user?.assignHotbarMacro(macro, '');
                }
            }
        ];

        if (game.user?.isGM) {
            skillContextMenu.push({
                name: 'Changer la valeur sans limitation',
                icon: '<i class="fas fa-cog"></i>',
                callback: el => {
                    let [skillCategory, skillName] = RollSkillManager.splitSkill(el.data('skill'));
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
                    let specialityDefinition = RollSpecialityManager.getSpecialityFromId(specialityId);
                    const macro = await Macro.create({
                        name: specialityDefinition.name,
                        type: "script",
                        scope: "actor",
                        command: `rollSpecialityManager.rollSpeciality(token, '${specialityId}')`
                    });
                    if (!macro) {
                        ui.notifications?.error('Failed to create macro');
                        return;
                    }

                    await game.user?.assignHotbarMacro(macro, '');
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

Lvl0CharacterActorSheet.skillsByIds = {};
for (let [skillCategoryId, categorySkills] of Object.entries(skills)) {
    for (let [skillId, skill] of Object.entries(categorySkills as { [skillId: string]: SkillDefinition })) {
        Lvl0CharacterActorSheet.skillsByIds[skillCategoryId + '.' + skillId] = skill;
    }
}
Lvl0CharacterActorSheet.jobsNamesById = Object.entries(jobs.base)
    .concat(Object.entries(jobs.advance))
    .reduce(((previousValue, currentValue: [jobId: string, job: JobDefinition]) => {
        previousValue[currentValue[0]] = currentValue[1].name;
        return previousValue;
    }), {})

Lvl0CharacterActorSheet.racesByIds = {};
for (let raceCategory of Object.values(races)) {
    for (let [raceId, race] of Object.entries(raceCategory as { [raceId: string]: RaceDefinition })) {
        Lvl0CharacterActorSheet.racesByIds[raceId] = race;
    }
}
