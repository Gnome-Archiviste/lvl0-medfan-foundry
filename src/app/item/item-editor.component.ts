import {Component, Input, OnInit} from '@angular/core';
import {ItemAccessorService} from '../data-accessor/item-accessor-service';
import {
    Lvl0Item,
    Lvl0ItemWitExtraSkills,
    Lvl0ItemWithModifiers,
    Lvl0ItemWithUniqueCapabilities
} from '../data-accessor/models/lvl0-item';
import {map, Observable} from 'rxjs';
import {ItemUpdaterService} from '../data-accessor/item-updater.service';
import {FileSelectorService} from '../data-accessor/file-selector.service';
import {ItemModifierInfo} from '../../models/item';
import {
    ElementRepository,
    ItemTypesConfigRepository,
    SkillDefinition,
    SkillRepository,
    SpellRepository,
    StatsRepository
} from '../../repositories';
import {DialogService} from '../data-accessor/dialog-service';
import {SpellDefinitionSelectorResult} from './spell-definition-selector.component';
import {Spell} from '../spell/spell';
import {SpellUtil} from '../spell/spell-util';

@Component({
    selector: 'lvl0-item-editor',
    templateUrl: './item-editor.component.html',
    styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit {
    @Input('itemId')
    itemId: string;

    stats: readonly string[] = [];
    skillsByCategories: Record<string, Record<string, SkillDefinition>> = {};
    elementIds: string[] = [];
    ammunitionTypes = {
        'arrow': 'Flèche',
        'bolt': 'Carreau',
        'dart': 'Dard',
        'marble': 'Bille',
    };
    usedAmmunitionTypes = {
        '': 'Aucune',
        ...this.ammunitionTypes,
    };
    weaponTypes = {
        'melee': 'Mêlée',
        'range': 'Distance',
        'melee-range': 'Mêlée et Distance',
    };
    item$: Observable<Lvl0Item>;
    canHaveModifier$: Observable<boolean>;
    canHaveExtraSkills$: Observable<boolean>;
    canBeEquiped$: Observable<boolean>;
    modifiers$: Observable<{ [id: string]: ItemModifierInfo }>;
    extraSkills$: Observable<{ [id: string]: {id: string} }>;
    relatedSpell$: Observable<Spell | undefined>;

    constructor(
        private readonly itemAccessorService: ItemAccessorService,
        private readonly itemUpdaterService: ItemUpdaterService,
        private readonly fileSelectorService: FileSelectorService,
        private readonly itemTypesConfigRepository: ItemTypesConfigRepository,
        private readonly statsRepository: StatsRepository,
        private readonly skillRepository: SkillRepository,
        private readonly elementRepository: ElementRepository,
        private readonly spellRepository: SpellRepository,
        private readonly spellUtil: SpellUtil,
        private readonly dialogService: DialogService,
    ) {
    }

    ngOnInit() {
        this.stats = Object.keys(this.statsRepository.getStats().stats);
        this.skillsByCategories = this.skillRepository.getSkillsByCategories()
        this.item$ = this.itemAccessorService.selectItem(this.itemId);
        this.elementIds = this.elementRepository.getElementIds()
        this.canHaveModifier$ = this.item$.pipe(map(item => this.itemTypesConfigRepository.getItemTypeConfig(item.type).canHaveModifiers));
        this.canBeEquiped$ = this.item$.pipe(map(item => this.itemTypesConfigRepository.getItemTypeConfig(item.type).canBeEquiped && item.isOwned));
        this.canHaveExtraSkills$ = this.item$.pipe(map(item => this.itemTypesConfigRepository.getItemTypeConfig(item.type).canHaveExtraSkills));
        this.modifiers$ = this.item$.pipe(map(item => this.itemWithModifier$(item).system.modifiers || {}));
        this.extraSkills$ = this.item$.pipe(map(item => this.itemWithExtraSkills$(item).system.extraSkills || {}));
        this.relatedSpell$ = this.item$.pipe(map(item => this.getRelatedSpell(item) ));
    }

    selectImage(itemId: string, currentImagePath?: string) {
        this.fileSelectorService.selectImage(currentImagePath).subscribe((path) => {
            this.itemUpdaterService.updateItem(itemId, {img: path})
        });
    }

    removeModifier(item: Lvl0Item, modifierId: string) {
        this.itemUpdaterService.updateItem(item.id, {system: {modifiers: {['-=' + modifierId]: null as any}}});
    }

    addModifier(item: Lvl0ItemWithModifiers) {
        let nextId: number;
        if (item.system.modifiers) {
            nextId = (Object.keys(item.system.modifiers).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        } else {
            nextId = 1;
        }
        this.itemUpdaterService.updateItem(item.id, {system: {modifiers: {[nextId]: {stat: 'phy', value: 1}}}});
    }

    removeExtraSkill(item: Lvl0Item, extraSkillId: string) {
        this.itemUpdaterService.updateItem(item.id, {system: {extraSkills: {['-=' + extraSkillId]: null as any}}});
    }

    addExtraSkill(item: Lvl0ItemWitExtraSkills) {
        let nextId: number;
        if (item.system.extraSkills) {
            nextId = (Object.keys(item.system.extraSkills).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        } else {
            nextId = 1;
        }

        let skillId = Object.keys(this.skillRepository.getSkillsByIds())[0];
        this.itemUpdaterService.updateItem(item.id, {system: {extraSkills: {[nextId]: {id: skillId}}}});
    }

    openSpellSelector(item: Lvl0Item) {
        this.dialogService.openDialog<void, SpellDefinitionSelectorResult>('lvl0-spell-definition-selector', undefined, {title: 'Sélection du sort' }).subscribe((result) => {
            this.itemUpdaterService.updateItem(item.id, {system: {spell: result.spellId, arcane: result.spellContext?.arcaneLevel}});
        });
    }

    copySpellInfoToItem(item: Lvl0Item, spell: Spell) {
        switch (item.type) {
            case 'wand': {
                let itemName = 'Baguette: ' + spell.definition.name;
                if (spell.context.arcaneLevel !== spell.definition.level) {
                    itemName += ` (Arcane: ${spell.context.arcaneLevel})`;
                }
                this.itemUpdaterService.updateItem(item.id, {name: itemName, img: spell.definition.icon});
                break;
            }
            case 'scroll': {
                let itemName = 'Parchemin: ' + spell.definition.name;
                if (spell.context.arcaneLevel !== spell.definition.level) {
                    itemName += ` (Arcane: ${spell.context.arcaneLevel})`;
                }
                this.itemUpdaterService.updateItem(item.id, {name: itemName, img: spell.definition.icon});
                break;
            }
        }
    }

    private getRelatedSpell(item: Lvl0Item) {
        if (item.type === 'wand'
            || item.type === 'scroll') {
            let spellDefinition = this.spellRepository.getSpellById(item.system.spell);
            if (!spellDefinition) {
                return undefined;
            }
            return this.spellUtil.computeSpellValuesBeforeRoll(spellDefinition, {arcaneLevel: item.system.arcane || 1});
        }
        throw new Error(`Item type ${item.type} does not support extra skills`);
    }

    // region Type safe cast

    itemWithModifier$(item: Lvl0Item): Lvl0ItemWithModifiers {
        if (item.type === 'armor'
            || item.type === 'belt'
            || item.type === 'cloak'
            || item.type === 'foot'
            || item.type === 'hand'
            || item.type === 'head'
            || item.type === 'handWeapon'
            || item.type === 'necklace'
            || item.type === 'magical'
            || item.type === 'ring'
            || item.type === 'shield'
            || item.type === 'weapon')
            return item;
        throw new Error(`Item type ${item.type} does not support modifiers`);
    }

    itemWithUniqueCapabilities$(item: Lvl0Item): Lvl0ItemWithUniqueCapabilities {
        if (item.type === 'armor'
            || item.type === 'belt'
            || item.type === 'cloak'
            || item.type === 'foot'
            || item.type === 'hand'
            || item.type === 'head'
            || item.type === 'handWeapon'
            || item.type === 'necklace'
            || item.type === 'magical'
            || item.type === 'ring'
            || item.type === 'shield'
            || item.type === 'weapon')
            return item;
        throw new Error(`Item type ${item.type} does not support modifiers`);
    }

    itemWithExtraSkills$(item: Lvl0Item): Lvl0ItemWitExtraSkills {
        if (item.type === 'armor'
            || item.type === 'belt'
            || item.type === 'cloak'
            || item.type === 'foot'
            || item.type === 'hand'
            || item.type === 'head'
            || item.type === 'handWeapon'
            || item.type === 'magical'
            || item.type === 'necklace'
            || item.type === 'ring'
            || item.type === 'shield')
            return item;
        throw new Error(`Item type ${item.type} does not support extra skills`);
    }

    // endregion
}
