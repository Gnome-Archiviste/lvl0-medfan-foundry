import {RollDamageSkillResult, RollDamageSkillScript} from "./roll-damage-skill-script";
import {SkillScript} from "./skill-script";
import {RollSpellSkillScript, SpellScriptResult} from "./roll-spell-skill-script";
import {RollShieldDamageScriptResult, RollShieldDamageSkillScript} from "./roll-shield-damage-skill-script";
import {SkillDefinition} from 'repositories/data';
import {Injectable} from '@angular/core';
import {WeaponSelectorService} from '../../item/weapon-selector.service';
import {ItemUpdaterService} from '../../data-accessor/item-updater.service';
import {CharacterAccessorService} from '../../data-accessor/character-accessor.service';
import {PlayerNotificationService} from '../../shared/player-notification.service';
import {SystemDataDatabaseService} from '../../system-data/system-data-database.service';
import {SpellRepository} from '../../../repositories';
import {ItemService} from '../../data-accessor/item.service';
import {SpellUtil} from '../../spell/spell-util';
import {DialogService} from '../../data-accessor/dialog-service';
import {RollFactory} from '../../shared/roll-factory';
import {WeaponDamageRollUtil} from '../../item/weapon-damage-roll-util.service';
import {SpellChatService} from '../../spell/spell-chat.service';
import {MacroService} from '../../shared/macro.service';

@Injectable({
    providedIn: 'root'
})
export class SkillScriptFactory {

    constructor(
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly dialogService: DialogService,
        private readonly itemService: ItemService,
        private readonly itemUpdaterService: ItemUpdaterService,
        private readonly playerNotificationService: PlayerNotificationService,
        private readonly rollFactory: RollFactory,
        private readonly spellRepository: SpellRepository,
        private readonly spellUtil: SpellUtil,
        private readonly systemDataDatabaseService: SystemDataDatabaseService,
        private readonly weaponDamageRollUtil: WeaponDamageRollUtil,
        private readonly weaponSelectorService: WeaponSelectorService,
        private readonly spellChatService: SpellChatService,
        private readonly macroService: MacroService,
    ) {
    }

    createScript(
        skillDefinition: SkillDefinition,
    ): SkillScript<RollDamageSkillResult | SpellScriptResult | RollShieldDamageScriptResult, any> | undefined {
        if (!skillDefinition.script?.name)
            return undefined;

        switch (skillDefinition.script.name) {
            case 'damageRoll':
                return new RollDamageSkillScript(
                    skillDefinition.script.data,
                    this.rollFactory,
                    this.weaponSelectorService,
                    this.weaponDamageRollUtil,
                    this.itemUpdaterService
                );
            case 'castSpell':
                return new RollSpellSkillScript(
                    skillDefinition,
                    this.characterAccessorService,
                    this.systemDataDatabaseService,
                    this.playerNotificationService,
                    this.spellRepository,
                    this.itemUpdaterService,
                    this.itemService,
                    this.spellUtil,
                    this.dialogService,
                    this.spellChatService,
                    this.macroService
                );
            case 'shieldDamageRoll':
                return new RollShieldDamageSkillScript(
                    this.rollFactory,
                    this.characterAccessorService,
                    this.playerNotificationService,
                    this.systemDataDatabaseService
                );
        }
    }
}
