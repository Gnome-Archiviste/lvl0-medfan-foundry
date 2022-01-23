import {RollSkillManager} from '../../../managers/skill/roll-skill-manager';
import {Lvl0ActorCharacterData} from '../../../models/actor/properties-data/lvl0-actor-character-data';
import {assertIsCharacter} from '../../../models/actor/properties/character-properties';
import {Lvl0ItemType} from '../../../models/item/lvl0-item-data';
import {JobRepository} from '../../../repositories/job-repository';
import {SkillRepository} from '../../../repositories/skill-repository';
import {StatsRepository} from '../../../repositories/stats-repository';
import {SkillDefinition} from '../../../repositories/data/skills';
import {RaceDefinition} from '../../../repositories/data/races';
import {RaceRepository} from '../../../repositories/race-repository';
import {ExtensionJobDefinition, JobDefinition} from '../../../repositories/data/jobs';
import {SpecialityRepository} from '../../../repositories/speciality-repository';
import {Lvl0Actor} from '../../../models/actor/lvl0-actor';
import {container} from 'tsyringe';
import {InitializedGame} from '../../../models/misc/game';
import {MacroUtil} from '../../../utils/macro-util';

export interface Lvl0mfActorSheetData extends ActorSheet.Data {
    actorData: Lvl0ActorCharacterData,
    skillsByCategories: Record<string, Record<string, SkillDefinition>>,
    nonEquipableItemType: Record<string, boolean>,
    actionableItemType: Record<string, boolean>,
    canLevelUp: boolean,
    canChangeStats: boolean,
    canSelectRace: boolean,
    canSelectJob: boolean,
    canEditLevel: boolean,
    canEditModifiers: boolean,
    statsDefinition: { stats: { [statId: string]: { name: string } } },
    modifierSkills: { [statId: string]: string },
    skillsByIds: { [skillId: string]: SkillDefinition },
    jobs: { base: Record<string, JobDefinition>, advance: Record<string, ExtensionJobDefinition> },
    jobsNamesById: { [jobId: string]: string },
    races: Record<string, Record<string, RaceDefinition>>,
    racesByIds: { [raceId: string]: RaceDefinition },
    itemTypes: string[],
    itemTypesInInventoryTabs: string[],
    itemsByType: { [itemType: string]: Item[] },
    equipedItemsByType: { [itemType: string]: Item[] },
    armorSlots: string[]
}

export class Lvl0CharacterActorSheet<Options extends ActorSheet.Options = ActorSheet.Options> extends ActorSheet<Options, Lvl0mfActorSheetData> {
    static armorSlots = ['head', 'cloak', 'necklace', 'armor', 'belt', 'hand', 'shield', 'ring', 'foot'];

    private readonly jobRepository: JobRepository;
    private readonly raceRepository: RaceRepository;
    private readonly skillRepository: SkillRepository;
    private readonly specialityRepository: SpecialityRepository;
    private readonly statsRepository: StatsRepository;
    private readonly rollSkillManager: RollSkillManager;
    private readonly macroUtil: MacroUtil;
    private readonly game: InitializedGame;

    constructor(actor: Lvl0Actor, options: Partial<Options>) {
        super(actor, options);

        this.jobRepository = container.resolve(JobRepository);
        this.raceRepository = container.resolve(RaceRepository);
        this.skillRepository = container.resolve(SkillRepository);
        this.specialityRepository = container.resolve(SpecialityRepository);
        this.statsRepository = container.resolve(StatsRepository);
        this.rollSkillManager = container.resolve(RollSkillManager);
        this.macroUtil = container.resolve(MacroUtil);
        this.game = container.resolve(InitializedGame);
    }

    async getData(options?: Partial<Options>): Promise<Lvl0mfActorSheetData> {
        assertIsCharacter(this.actor);

        const context = await super.getData(options);

        let itemsByType = this.actor.itemTypes;
        let itemTypes = Object.keys(itemsByType) as Lvl0ItemType[];
        let equipedItemsByType = {};
        let itemTypesInInventoryTabs: string[] = [];
        for (let itemType of itemTypes) {
            equipedItemsByType[itemType] = [];
            for (let item of itemsByType[itemType]) {
                if (item.data.data.equiped) {
                    equipedItemsByType[itemType].push(item);
                }
            }
            if (itemsByType[itemType].length > 0 && this.isItemTypeDisplayedInInventory(itemType))
                itemTypesInInventoryTabs.push(itemType);
        }

        let canSelectJob = this.actor.data.data.level.value === 0 || this.game.user.isGM;
        let canSelectRace = this.actor.data.data.level.value === 0 || this.game.user.isGM;
        let canChangeStats = this.actor.data.data.level.value === 0;
        let canEditModifiers = this.game.user.isGM;
        let canEditLevel = this.game.user.isGM && this.actor.data.data.level.value > 0;
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

        return {
            ...context,
            actorData: this.actor.data.data,
            skillsByCategories: this.skillRepository.getSkillsByCategories(),
            canLevelUp,
            canChangeStats,
            nonEquipableItemType,
            actionableItemType,
            canSelectRace,
            canSelectJob,
            canEditLevel,
            statsDefinition: this.statsRepository.getStats(),
            canEditModifiers,
            modifierSkills,
            skillsByIds: this.skillRepository.getSkillsByIds(),
            jobs: this.jobRepository.getJobsByCategories(),
            jobsNamesById: this.jobRepository.getJobNamesByIds(),
            races: this.raceRepository.getRacesByCategories(),
            racesByIds: this.raceRepository.getRacesByIds(),
            itemTypes,
            itemTypesInInventoryTabs,
            itemsByType,
            equipedItemsByType,
            armorSlots: Lvl0CharacterActorSheet.armorSlots
        } as Lvl0mfActorSheetData
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Prevent [Enter] to "submit" the form, which in this case since there is no `submit` for this form it will
        // press the first button available and often do something unwanted
        html.find('input').on('keypress', function(event) {
            if (event.key == 'Enter') {
                event.preventDefault();
            }
        });

        html.find('[data-update-item-quantity]').on('change', ev => {
            ev.stopImmediatePropagation();
            ev.stopPropagation();

            const itemId = $(ev.currentTarget).data('update-item-quantity');
            const item = this.actor.items.get(itemId);
            if (!item)
                throw new Error(`Failed to get item '${itemId}' when trying to update quantity`)
            let quantityInput = $(ev.currentTarget).val() as string;
            if (!quantityInput) {
                ui.notifications?.error('Quantité invalide');
                return;
            }

            let newQuantity: number;
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
                    await this.actor.openGenerateMissingLevelUpDataPopup();
                    break;
                case "useSpeciality":
                    await this.actor.useSpeciality(ev.target.dataset.specialityId);
                    break;
                case "createSpecialityMacro": {
                    let specialityId = ev.target.dataset.specialityId;
                    let speciality = this.specialityRepository.getSpecialityFromId(specialityId);
                    await this.macroUtil.createAndAssignMacroToFirstAvailableSlot({
                        name: speciality.name,
                        type: "script",
                        img: speciality.icon,
                        scope: "actor",
                        command: this.macroUtil.guardScriptExecutionWithTokenCheck(`token.actor.useSpeciality('${specialityId}')`)
                    });
                    break;
                }
                case "selectSpeciality":
                    await this.actor.openSelectSpecialityDialog();
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
            assertIsCharacter(this.actor);
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
        assertIsCharacter(this.actor);
        if (!ev.target)
            return;
        let modifierId = +$(ev.target).parents('.modifier-value').data('modifier-id');
        let modifiers = this.actor.data.data.modifiers || {};
        let newModifiers = {...modifiers, ['-=' + modifierId]: null};
        this.actor.update({data: {modifiers: newModifiers}});
    }

    _onAddModifier(ev: MouseEvent): void {
        assertIsCharacter(this.actor);
        if (!ev.target)
            return;
        let modifiers = this.actor.data.data.modifiers || {};
        let nextId = (Object.keys(modifiers).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        this.actor.update({data: {modifiers: {...modifiers, [nextId]: {stat: 'phy', value: 1}}}});
    }

    canLevelUp(data: Lvl0ActorCharacterData): boolean {
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
                    this.rollSkillManager.rollSkill(this.actor.getActiveTokens()[0], el.data('skill')).then();
                }
            },
            {
                name: 'Créer une macro',
                icon: '<i class="fas fa-scroll"></i>',
                callback: async el => {
                    let skillId = el.data('skill');
                    let skillDefinition = this.skillRepository.getSkillFromId(skillId);
                    await this.macroUtil.createAndAssignMacroToFirstAvailableSlot({
                        name: skillDefinition.name,
                        type: "script",
                        img: skillDefinition.icon,
                        scope: "actor",
                        command: this.macroUtil.guardScriptExecutionWithTokenCheck(`rollSkillManager.rollSkill(token, '${skillId}')`)
                    });
                }
            }
        ];

        if (this.game.user.isGM) {
            skillContextMenu.push({
                name: 'Changer la valeur sans limitation',
                icon: '<i class="fas fa-cog"></i>',
                callback: el => {
                    assertIsCharacter(this.actor);
                    let [skillCategory, skillName] = this.skillRepository.splitSkill(el.data('skill'));
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
                    let specialityDefinition = this.specialityRepository.getSpecialityFromId(specialityId);
                    await this.macroUtil.createAndAssignMacroToFirstAvailableSlot({
                        name: specialityDefinition.name,
                        type: "script",
                        scope: "actor",
                        command: this.macroUtil.guardScriptExecutionWithTokenCheck(`rollSpecialityManager.rollSpeciality(token, '${specialityId}')`)
                    });
                }
            }
        ]
    }

    private isItemTypeDisplayedInInventory(itemType: Lvl0ItemType): boolean {
        if (itemType === 'ammunition')
            return false;
        if (itemType === 'potions')
            return false;
        if (itemType === 'weapon')
            return false;
        return true;
    }

    static get defaultOptions(): ActorSheet.Options {
        return {
            ...super.defaultOptions,
            classes: ["lvl0mf", "sheet", "actor"],
            template: "systems/lvl0mf-sheet/ui/sheets/actor/lvl0-character-actor-sheet.hbs",
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
            scrollY: [".stats", ".items", ".inventory"],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        };
    }
}
