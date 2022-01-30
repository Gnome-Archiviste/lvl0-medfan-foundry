import {container} from 'tsyringe';
import {getItemExtraSkillsIfAvailable, Lvl0Item, Lvl0ItemWithModifiers} from 'models/item';
import {ElementRepository, ItemTypesConfigRepository, SkillRepository, SpellRepository} from 'repositories';
import {ItemModifierManager} from '../../../managers/modifiers';
import ClickEvent = JQuery.ClickEvent;
import {DialogAwaiter} from '../../dialog';
import {SpellDefinitionSelectorDialog} from '../../dialog/spell-definition-selector-dialog';
import {data} from 'jquery';

export class Lvl0ItemSheet extends ItemSheet {
    private readonly elementRepository: ElementRepository;
    private readonly itemTypesConfigRepository: ItemTypesConfigRepository;
    private readonly itemModifierManager: ItemModifierManager;
    private readonly skillRepository: SkillRepository;
    private readonly dialogAwaiter: DialogAwaiter;
    private readonly spellRepository: SpellRepository;

    constructor(item: Lvl0Item, options: Partial<ItemSheet.Options>) {
        super(item, options);

        this.elementRepository = container.resolve(ElementRepository);
        this.itemTypesConfigRepository = container.resolve(ItemTypesConfigRepository);
        this.itemModifierManager = container.resolve(ItemModifierManager);
        this.skillRepository = container.resolve(SkillRepository);
        this.dialogAwaiter = container.resolve(DialogAwaiter);
        this.spellRepository = container.resolve(SpellRepository);
    }

    override getData(options?: Partial<ItemSheet.Options>) {
        let templateData = super.getData(options);

        let ammunitionTypes = {
            'arrow': 'Flèche',
            'bolt': 'Carreau',
            'dart': 'Dard',
            'marble': 'Bille',
        };
        let itemTypeConfig = this.itemTypesConfigRepository.getItemTypeConfig(this.item.data.type);
        let spellDefinition;
        if (this.item.data.type === 'wand' || this.item.data.type === 'scroll') {
            if (this.item.data.data.spell) {
                spellDefinition = this.spellRepository.getSpellById(this.item.data.data.spell);
            }
        }
        return {
            ...templateData,
            spellDefinition: spellDefinition,
            isOwned: this.item.isOwned,
            canBeEquiped: this.item.isOwned && itemTypeConfig.canBeEquiped,
            itemTypeConfig: itemTypeConfig,
            extraSkills: this.skillRepository.getSkillsNamesByIds(),
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
            elements: this.elementRepository.getElementWeaponNameByElementsIds(),
            usedAmmunitionTypes: {
                '': 'Aucune',
                ...ammunitionTypes
            }
        }
    }

    override activateListeners(html: JQuery) {
        super.activateListeners(html);

        // Prevent [Enter] to "submit" the form, which in this case since there is no `submit` for this form it will
        // press the first button available and often do something unwanted
        html.find('input').on('keypress', function (event) {
            if (event.key == 'Enter') {
                event.target.blur();
                event.preventDefault();
            }
        });

        if (!this.options.editable) {
            return;
        }
        html.find("[data-lvl0-action]").on('click', async ev => {
            ev.preventDefault();
            switch (ev.currentTarget.dataset.lvl0Action) {
                case 'selectSpell':
                    let spell = await this.dialogAwaiter.openAndWaitResult(SpellDefinitionSelectorDialog, {});
                    if (spell) {
                        if (this.item.data.type === 'wand' || this.item.data.type === 'scroll') {
                            let newArcane = spell.dependsOnArcaneLevel ? this.item.data.data.arcane || spell.level : 0;
                            await this.item.update({data: {spell: spell.id, quantifiable: false, quantity: 0, arcane: newArcane}});
                        }
                    }
                    break;
                case 'copySpellInfo':
                    if (this.item.data.type !== 'wand' && this.item.data.type !== 'scroll') {
                        return;
                    }
                    if (!this.item.data.data.spell) {
                        return;
                    }
                    let spellDefinition = this.spellRepository.getSpellById(this.item.data.data.spell);
                    if (!spellDefinition) {
                        return;
                    }
                    let prefix = this.item.data.type === 'wand' ? 'Baguette' : 'Parchemin';
                    let suffix = '';
                    if (spellDefinition.dependsOnArcaneLevel) {
                        suffix = ` (Arcane: ${this.item.data.data.arcane})`;
                    }
                    await this.item.update({
                        name: `${prefix}: ${spellDefinition.name}${suffix}`,
                        img: spellDefinition.icon,
                        data: {description: spellDefinition.description}
                    }, {diff: true});

                    break
                case 'addItemModifier':
                    await this.onAddModifier(ev)
                    break;
                case 'deleteModifier':
                    await this.onRemoveModifier(ev)
                    break;
                case 'addItemExtraSkill':
                    await this.onAddExtraSkill(ev)
                    break;
                case 'deleteExtraSkill':
                    await this.onRemoveExtraSkill(ev)
                    break;
            }
        });
    }

    private async onRemoveModifier(ev: ClickEvent) {
        if (!ev.target)
            return;
        let modifierId = +$(ev.target).parents('.modifier-value').data('modifier-id');
        await this.itemModifierManager.removeModifier(this.item, modifierId);
    }

    private async onAddModifier(ev: ClickEvent) {
        await this.itemModifierManager.addModifier(this.item as Lvl0ItemWithModifiers, {stat: 'phy', value: 1});
    }

    private async onRemoveExtraSkill(ev: ClickEvent) {
        if (!ev.target)
            return;
        let extraSkillId = +$(ev.target).parents('.extra-skill-line').data('extra-skill-id');
        let extraSkills = getItemExtraSkillsIfAvailable(this.item.data) || {};
        let newExtraSkills = {...extraSkills, ['-=' + extraSkillId]: null};
        await this.item.update({data: {extraSkills: newExtraSkills}});
    }

    private async onAddExtraSkill(ev: ClickEvent) {
        if (!ev.target)
            return;
        let extraSkills = getItemExtraSkillsIfAvailable(this.item.data) || {};
        let nextId = (Object.keys(extraSkills).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        await this.item.update({data: {extraSkills: {[nextId]: {id: 'champion.shield_attack'}}}}, {diff: true});
    }

    static get defaultOptions(): ItemSheet.Options {
        return {
            ...super.defaultOptions,
            classes: ["lvl0mf", "sheet", "item"],
            template: "systems/lvl0mf-sheet/ui/sheets/item/lvl0-item-sheet.hbs",
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        };
    }
}
