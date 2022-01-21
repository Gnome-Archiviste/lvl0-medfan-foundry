import {RollDamageSkillScript} from "./roll-damage-skill-script";
import {SkillScript} from "./skill-script";
import {RollSpellSkillScript} from "./roll-spell-skill-script";
import {RollShieldDamageSkillScript} from "./roll-shield-damage-skill-script";
import {SkillDefinition} from '../../../repositories/data/skills';

export class SkillScriptFactory {
    createScript(token: Token, skillDefinition: SkillDefinition, options: object): SkillScript {
        if (!skillDefinition.script?.name)
            return new SkillScript(token, skillDefinition);

        switch (skillDefinition.script.name) {
            case 'damageRoll':
                return new RollDamageSkillScript(token, {...skillDefinition, script: skillDefinition.script});
            case 'castSpell':
                return new RollSpellSkillScript(token, {...skillDefinition, script: skillDefinition.script}, options);
            case 'shieldDamageRoll':
                return new RollShieldDamageSkillScript(token, {...skillDefinition, script: skillDefinition.script});
        }

        throw new Error(`skill script ${skillDefinition.script['name']} is not known`);
    }
}
