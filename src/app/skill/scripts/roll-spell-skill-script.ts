import {SkillScript} from "./skill-script";
import {CastSpellSkillScriptData, SkillDefinition} from 'repositories/data';
import {
    SpellCastAction,
    SpellSelectorDialogData,
    SpellSelectorDialogResult
} from '../../spell/spell-selector-dialog.component';
import {RolledSpell, Spell} from '../../spell/spell';
import {SpellRepository} from '../../../repositories';
import {SpellUtil} from '../../spell/spell-util';
import {DialogService} from '../../data-accessor/dialog-service';
import {CharacterAccessorService} from '../../data-accessor/character-accessor.service';
import {firstValueFrom} from 'rxjs';
import {selectCharacterArcaneLevel} from '../../data-accessor/selectors/character-arcane-level-selector';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {PlayerNotificationService} from '../../shared/player-notification.service';
import {selectCharacterItemsOfType, selectCharacterMana} from '../../data-accessor/selectors/character-selectors';
import {
    selectCharacterFillableWandsForSpell
} from '../../data-accessor/selectors/character-fillable-wand-for-spell-selector';
import {Lvl0ItemScroll, Lvl0ItemWand} from '../../data-accessor/models/lvl0-item';
import {WandSelectorDialogData, WandSelectorDialogResult} from '../wand-selector-dialog.component';
import {ItemUpdaterService} from '../../data-accessor/item-updater.service';
import {ItemService} from '../../data-accessor/item.service';
import { SkillRollChatExtraDataMessageData } from "app/chat/skill-roll-chat-message.component";
import { IRoll } from "app/shared/roll";
import {SpellChatService} from '../../spell/spell-chat.service';
import {MacroService} from '../../shared/macro.service';
import {SkillRollOutcome} from '../skill-roll-util';
import {ActorUpdaterService} from '../../data-accessor/actor-updater.service';

export type SpellScriptOptions = {
    spellId?: string
}
export type SpellScriptResult = {
    spell: RolledSpell
    additionalAction?: 'fill-wand' | 'create-scroll';
}

export class RollSpellSkillScript extends SkillScript<SpellScriptResult, SpellScriptOptions> {
    data: CastSpellSkillScriptData;
    spell: Spell;
    action: SpellCastAction = 'cast';
    wandInfo?: {
        wand: Lvl0ItemWand;
        chargeCount: number;
    }
    emptyScroll?: Lvl0ItemScroll;
    existingScroll?: Lvl0ItemScroll;
    casterId?: string;

    constructor(
        private readonly skillDefinition: SkillDefinition,
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly playerNotificationService: PlayerNotificationService,
        private readonly spellRepository: SpellRepository,
        private readonly itemUpdaterService: ItemUpdaterService,
        private readonly itemService: ItemService,
        private readonly spellUtil: SpellUtil,
        private readonly dialogService: DialogService,
        private readonly spellChatService: SpellChatService,
        private readonly macroService: MacroService,
        private readonly actorUpdaterService: ActorUpdaterService,
    ) {
        super();
    }

    override async prepare(actorId: string, options?: SpellScriptOptions): Promise<number> {
        let spell: Spell | undefined;
        let action: SpellCastAction = 'cast';
        this.casterId = actorId;

        let arcaneLevel = await firstValueFrom(this.characterAccessorService.selectCharacter(actorId).pipe(selectCharacterArcaneLevel(this.systemDataDatabaseService)));
        if (options?.spellId) {
            let spellDefinition = this.spellRepository.getSpellById(options.spellId);
            spell = this.spellUtil.computeSpellValuesBeforeRoll(spellDefinition!, {arcaneLevel: arcaneLevel});
        }

        if (!spell) {
            const result = await firstValueFrom(this.dialogService.openDialog<SpellSelectorDialogData, SpellSelectorDialogResult>('lvl0-spell-selector-dialog', {characterId: actorId!}, {title: 'Select spell'}), {defaultValue: undefined})
            if (result) {
                spell = result.spell;
                action = result.action;
            }
        }
        if (!spell) {
            return 0;
        }
        let mana = await firstValueFrom(this.characterAccessorService.selectCharacter(actorId).pipe(selectCharacterMana()));
        if (spell.computedData.effectiveCost > mana) {
            this.playerNotificationService.showError('not_enough_mana');
            return 0;
        }

        switch (action) {
            case "fillWand": {
                const fillableWands = await firstValueFrom(this.characterAccessorService.selectCharacter(actorId).pipe(selectCharacterFillableWandsForSpell(spell.definition.id, this.systemDataDatabaseService)), {defaultValue: [] as Lvl0ItemWand[]});
                if (fillableWands.length === 0) {
                    this.playerNotificationService.showWarning('no_wand_available');
                    return 0;
                }
                const result = await firstValueFrom(this.dialogService.openDialog<WandSelectorDialogData, WandSelectorDialogResult>('lvl0-wand-selector-dialog', {
                    wands: fillableWands,
                    spell: spell,
                    availableMana: mana
                }, {title: 'Select wand'}), {defaultValue: undefined})
                if (!result) {
                    return 0;
                }
                this.wandInfo = {
                    wand: result.wand,
                    chargeCount: result.chargeCount
                };
                break;
            }
            case "createScroll": {
                const scrolls = await firstValueFrom(this.characterAccessorService.selectCharacter(actorId).pipe(selectCharacterItemsOfType<Lvl0ItemScroll>('scroll')), {defaultValue: [] as Lvl0ItemScroll[]});
                let emptyScrolls = scrolls.filter((scroll: Lvl0ItemScroll) => scroll.system.quantity > 0 && !scroll.system.spell)
                let existingScrolls = scrolls.filter((scroll: Lvl0ItemScroll) => scroll.system.spell == spell!.definition.id)
                if (emptyScrolls.length === 0) {
                    this.playerNotificationService.showWarning('no_scroll_available');
                    return 0;
                }
                this.emptyScroll = emptyScrolls[0];
                this.existingScroll = existingScrolls[0];
                break;
            }
            case "cast": {
                break;
            }
            case "createMacro": {
                await this.macroService.createRollSkillMacro(this.skillDefinition, {spellId: spell.definition.id} as SpellScriptOptions);
                return 0;
            }
        }

        this.spell = spell;
        this.action = action;
        return this.wandInfo?.chargeCount ?? 1;
    }

    override async postRoll(rollResult: SkillRollOutcome): Promise<SpellScriptResult> {
        let context = {
            criticalSuccess: rollResult === 'criticalSuccess',
            epicFail: rollResult === 'epicFail',
        };
        let rolledSpell = await this.spellUtil.rollSpell(this.spell, context);
        let additionalAction: 'fill-wand' | 'create-scroll' | undefined = undefined;

        if (this.emptyScroll) {
            additionalAction = 'create-scroll';
            if (this.emptyScroll.system.quantity === 1) {
                await this.itemService.deleteItem(this.emptyScroll);
            } else {
                await this.itemUpdaterService.updateItem(this.emptyScroll.id, {system: {quantity: this.emptyScroll.system.quantity - 1}});
            }
            if (this.existingScroll) {
                await this.itemUpdaterService.updateItem(this.existingScroll.id, {system: {quantity: this.existingScroll.system.quantity + 1}});
            } else {
                await this.itemService.createItemFrom(this.emptyScroll, {
                    name: rolledSpell.definition.name,
                    system: {
                        quantifiable: true,
                        quantity: 1,
                        spell: rolledSpell.definition.id,
                        description: rolledSpell.definition.description,
                    },
                });
            }
        }
        if (this.wandInfo) {
            additionalAction = 'fill-wand';
            await this.fillWand(rolledSpell, rollResult);
        }

        if (rollResult !== 'fail') {
            if (this.casterId)
                await this.actorUpdaterService.updateActorFromCurrent(this.casterId, actor => ({
                    system: {
                        mana: {
                            value: actor.system.mana.value - rolledSpell.data.effectiveCost
                        }
                    }
                }))
        }

        return {spell: rolledSpell, additionalAction: additionalAction};
    }

    override stopAfterEpicFail(): boolean {
        if (this.wandInfo)
            return true;
        return false;
    }

    private async fillWand(rolledSpell: RolledSpell, rollResult: "epicFail" | "criticalSuccess" | "success" | "fail") {
        if (!this.wandInfo) {
            return;
        }
        if (this.wandInfo.wand.system.spell === rolledSpell.definition.id) {
            if (rollResult === 'epicFail') {
                await this.itemUpdaterService.updateItem<Lvl0ItemWand>(this.wandInfo.wand.id, {
                    system: {
                        blocked: true
                    }
                })
            } else if (rollResult !== 'fail') {
                await this.itemUpdaterService.updateItemFromLastVersion<Lvl0ItemWand>(this.wandInfo.wand, w => ({
                    system: {
                        charge: w.system.charge + 1
                    }
                }))
            }
        } else if (!this.wandInfo.wand.system.spell) {
            if (rollResult !== 'fail') {
                await this.itemUpdaterService.changeQuantity(this.wandInfo.wand, -1);
                this.wandInfo.wand = await this.itemService.createItemFrom(this.wandInfo.wand, {
                    name: rolledSpell.definition.name,
                    img: rolledSpell.definition.icon,
                    system: {
                        arcane: this.spell.context.arcaneLevel,
                        quantifiable: false,
                        quantity: undefined,
                        spell: rolledSpell.definition.id,
                        description: rolledSpell.definition.description,
                        charge: rollResult === 'epicFail' ? 0 : 1,
                        blocked: rollResult === 'epicFail'
                    },
                });
            }
        }
    }

    getRolls(data: SpellScriptResult): IRoll[] {
        return this.spellUtil.getRollsInSpell(data.spell);
    }

    getChatData(data: SpellScriptResult): SkillRollChatExtraDataMessageData {
        return {
            kind: 'cast-spell',
            data: {
                spell: this.spellChatService.mapToChatSpell(data.spell),
                additionalAction: data.additionalAction
            }
        }
    }

}
