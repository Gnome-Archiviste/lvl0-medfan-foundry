import {RollDamageSkillScript} from "./roll-damage-skill-script";
import {SkillScript} from "./skill-script";
import {RollSpellSkillScript} from "./roll-spell-skill-script";
import {RollShieldDamageSkillScript} from "./roll-shield-damage-skill-script";
import {SkillDefinition} from '../../repositories/data/skills';

export class SkillScriptFactory {
    createScript(token: Token, skillDefinition: SkillDefinition, options: object): SkillScript {
        if (!skillDefinition.script?.name)
            return new SkillScript(token, skillDefinition);

        switch (skillDefinition.script.name) {
            case 'damageRoll':
                // @ts-ignore
                return new RollDamageSkillScript(token, skillDefinition);
            case 'castSpell':
                // @ts-ignore
                return new RollSpellSkillScript(token, skillDefinition, options);
            case 'shieldDamageRoll':
                // @ts-ignore
                return new RollShieldDamageSkillScript(token, skillDefinition);
        }

        throw new Error(`skill script ${skillDefinition.script['name']} is not known`);
    }
}
