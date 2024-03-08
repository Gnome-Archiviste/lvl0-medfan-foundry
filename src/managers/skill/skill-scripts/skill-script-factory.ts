import {inject, singleton} from 'tsyringe';
import {RollDamageSkillScript} from "./roll-damage-skill-script";
import {SkillScript} from "./skill-script";
import {RollSpellSkillScript} from "./roll-spell-skill-script";
import {RollShieldDamageSkillScript} from "./roll-shield-damage-skill-script";
import {SkillDefinition} from 'repositories/data';
import {RollUtil} from 'utils/roll-util';
import {RollFactory} from 'utils/roll-factory';
import {ScrollUtil, SpellChat, WandUtil} from 'managers/spell';
import {EffectManager} from 'managers/effects';
import {WeaponDamageRollUtil} from 'utils/weapon-damage-roll-util';
import {WeaponSelector} from 'utils/weapon-selector';
import {ElementRepository, SpellRepository} from 'repositories';
import {ItemSelector} from '../../../utils/item-selector';

@singleton()
export class SkillScriptFactory {

    constructor(
        @inject(RollUtil) private readonly rollUtil: RollUtil,
        @inject(RollFactory) private readonly rollFactory: RollFactory,
        @inject(SpellChat) private readonly spellChat: SpellChat,
        @inject(ScrollUtil) private readonly scrollUtil: ScrollUtil,
        @inject(SpellRepository) private readonly spellRepository: SpellRepository,
        @inject(WeaponDamageRollUtil) private readonly weaponDamageRollUtil: WeaponDamageRollUtil,
        @inject(WeaponSelector) private readonly weaponSelector: WeaponSelector,
        @inject(EffectManager) private readonly effectManager: EffectManager,
        @inject(ElementRepository) private readonly elementRepository: ElementRepository,
        @inject(WandUtil) private readonly wandUtil: WandUtil,
        @inject(ItemSelector) private readonly itemSelector: ItemSelector,
    ) {
    }

    createScript(token: Token, skillDefinition: SkillDefinition, options: object): SkillScript {
        if (!skillDefinition.script?.name)
            return new SkillScript(token, skillDefinition, this.rollUtil);

        switch (skillDefinition.script.name) {
            case 'damageRoll':
                return new RollDamageSkillScript(
                    token,
                    {...skillDefinition, script: skillDefinition.script},
                    this.rollUtil,
                    this.rollFactory,
                    this.weaponDamageRollUtil,
                    this.weaponSelector,
                    this.effectManager,
                    this.elementRepository
                );
            case 'castSpell':
                return new RollSpellSkillScript(
                    token,
                    {...skillDefinition, script: skillDefinition.script},
                    this.rollUtil,
                    options,
                    this.spellChat,
                    this.scrollUtil,
                    this.spellRepository,
                    this.wandUtil,
                    this.itemSelector
                );
            case 'shieldDamageRoll':
                return new RollShieldDamageSkillScript(
                    token,
                    {...skillDefinition, script: skillDefinition.script},
                    this.rollUtil,
                    this.rollFactory,
                    this.effectManager
                );
        }

        throw new Error(`skill script ${skillDefinition.script['name']} is not known`);
    }
}
