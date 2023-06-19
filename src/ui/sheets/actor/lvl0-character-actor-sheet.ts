import {container} from 'tsyringe';
import {RollSkillManager} from 'managers/skill';
import {assertIsCharacter, Lvl0Actor} from 'models/actor';
import {Lvl0ItemType} from 'models/item';
import {
    ExtensionJobDefinition,
    ItemTypeConfig,
    ItemTypesConfigRepository,
    JobDefinition,
    JobRepository,
    RaceDefinition,
    RaceRepository,
    SkillDefinition,
    SkillRepository,
    SpecialityRepository,
    StatsRepository
} from 'repositories';
import {InitializedGame} from 'models/misc/game';
import {MacroUtil} from 'utils/macro-util';
import {EffectManager} from 'managers/effects';
import {ActorModifierManager} from 'managers/modifiers';
import {SpecialityUtil} from '../../../managers/speciality/speciality-util';
import {Lvl0CharacterData} from '../../../app/data-accessor/models/lvl0-character';

export interface Lvl0mfActorSheetData extends ActorSheet.Data {
    actorData: Lvl0CharacterData,
    skillsByCategories: Record<string, Record<string, SkillDefinition>>,
    itemTypesConfigs: Record<string, ItemTypeConfig>,
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
    private readonly effectManager: EffectManager;
    private readonly modifierManager: ActorModifierManager;
    private readonly itemTypesConfigRepository: ItemTypesConfigRepository;
    private readonly specialityUtil: SpecialityUtil;

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
        this.effectManager = container.resolve(EffectManager);
        this.modifierManager = container.resolve(ActorModifierManager);
        this.itemTypesConfigRepository = container.resolve(ItemTypesConfigRepository);
        this.specialityUtil = container.resolve(SpecialityUtil);
    }

    async getData(options?: Partial<Options>): Promise<Lvl0mfActorSheetData> {
        assertIsCharacter(this.actor);

        const context = await super.getData(options);

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
            if (itemsByType[itemType].length > 0 && this.isItemTypeDisplayedInInventory(itemType as any as Lvl0ItemType))
                itemTypesInInventoryTabs.push(itemType);
        }

        let canSelectJob = this.actor.data.data.level.value === 0 || this.game.user.isGM;
        let canSelectRace = this.actor.data.data.level.value === 0 || this.game.user.isGM;
        let canChangeStats = this.actor.data.data.level.value === 0;
        let canEditModifiers = this.game.user.isGM;
        let canEditLevel = this.game.user.isGM && this.actor.data.data.level.value > 0;
        let canLevelUp = this.canLevelUp(this.actor.data.data);
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
            lvl0CharacterId: this.actor.lvl0Id,
            actorData: this.actor.data.data,
            skillsByCategories: this.skillRepository.getSkillsByCategories(),
            canLevelUp,
            canChangeStats,
            itemTypesConfigs: this.itemTypesConfigRepository.getItemTypesConfigs(),
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
                event.target.blur();
                event.preventDefault();
            }
        });

        html.find('[data-magic-armor]').on('change', async ev => {
            assertIsCharacter(this.actor);
            let value = +($(ev.currentTarget).val() as string);
            if (this.actor.data.data.effects) {
                for (let [effectId, effect] of Object.entries(this.actor.data.data.effects)) {
                    if (effect.magicArmor?.remainingArmorPoint) {
                        if (value > 0) {
                            await this.effectManager.updateEffect(this.actor, +effectId, {magicArmor: {remainingArmorPoint: value}});
                        } else {
                            await this.effectManager.removeEffect(this.actor, +effectId);
                        }
                    }
                }
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
                case "rollStats":
                    this.actor.openRollStatsDialog();
                    break;
                case "levelUp":
                    this.actor.openLevelUpPopup();
                    break;
                case "generateMissingLevelUpData":
                    await this.actor.openGenerateMissingLevelUpDataPopup();
                    break;
                case "useSpeciality":
                    await this.actor.useSpeciality(ev.target.dataset.specialityId);
                    break;
                case "selectSpeciality":
                    await this.actor.openSelectSpecialityDialog();
                    break;
            }
        });

        html.find('[data-item-action]').on('click', async ev => {
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();
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
                    await Dialog.confirm({
                        title: 'Supression', content: 'Voulez vous supprimer ' + item?.name, yes: () => {
                            this.actor.items.get(itemLine.data("item-id"))?.delete();
                        }
                    });
                    break;
            }
        });


        html.find('[data-equip-item-checkbox]').on('click', ev => {
            const itemId = $(ev.currentTarget).data('equip-item-checkbox');
            const item = this.actor.items.get(itemId);
            if (!item)
                throw new Error(`Failed to get item '${itemId}' when trying to equip it`)
            item.update({data: {equiped: !item.data.data.equiped}}).then();
        });

        html.find("button[data-lvl0-action='addActorModifier']").on('click', _ev => this._onAddModifier());
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

    private async _onRemoveEffect(ev: MouseEvent): Promise<void> {
        if (!ev.target)
            return;
        let effectId = $(ev.target).parents('.effect-value').data('effect-id');
        await this.effectManager.removeEffect(this.actor, effectId);
    }

    private async _onRemoveModifier(ev: MouseEvent): Promise<void> {
        assertIsCharacter(this.actor);
        if (!ev.target)
            return;
        let modifierId = +$(ev.target).parents('.modifier-value').data('modifier-id');
        await this.modifierManager.removeModifier(this.actor, modifierId);
    }

    private async _onAddModifier(): Promise<void> {
        assertIsCharacter(this.actor);
        await this.modifierManager.addModifier(this.actor, {name: '', stat: 'phy', value: 1, isPermanent: false});
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
        let skillContextMenu =  [
            {
                name: 'Créer une macro',
                icon: '<i class="fas fa-scroll"></i>',
                callback: async el => {
                    let specialityId = el.data('speciality');
                    let specialityDefinition = this.specialityRepository.getSpecialityFromId(specialityId);
                    await this.macroUtil.createAndAssignMacroToFirstAvailableSlot({
                        name: specialityDefinition.name,
                        type: "script",
                        img: specialityDefinition.icon,
                        scope: "actor",
                        command: this.macroUtil.guardScriptExecutionWithTokenCheck(`token.actor.useSpeciality('${specialityId}')`)
                    });
                }
            }
        ]

        if (this.game.user.isGM) {
            skillContextMenu.push({
                name: 'Supprimer',
                icon: '<i class="fas fa-trash"></i>',
                callback: async el => {
                    let specialityId = el.data('speciality');
                    assertIsCharacter(this.actor);
                    await this.specialityUtil.removeSpeciality(this.actor, specialityId);
                }
            })
        }
        return skillContextMenu;
    }

    private isItemTypeDisplayedInInventory(itemType: Lvl0ItemType): boolean {
        if (itemType === Lvl0ItemType.ammunition)
            return false;
        if (itemType === Lvl0ItemType.potions)
            return false;
        if (itemType === Lvl0ItemType.weapon)
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
