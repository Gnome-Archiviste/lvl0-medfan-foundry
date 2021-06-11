import {RollDamageSkillScript} from "./roll-damage-skill-script.js";
import {SkillScript} from "./skill-script.js";
import {RollSpellSkillScript} from "./roll-spell-skill-script.js";
import {RollShieldDamageSkillScript} from "./roll-shield-damage-skill-script.js";

export class SkillScriptFactory {
    /**
     * @param {Token} token
     * @param {SkillDefinition} skillDefinition
     * @return SkillScript
     */
    getScriptByName(token, skillDefinition) {
        if (!skillDefinition.script?.name)
            return new SkillScript(token, skillDefinition);
        switch (skillDefinition.script.name) {
            case 'damageRoll':
                return new RollDamageSkillScript(token, skillDefinition);
            case 'castSpell':
                return new RollSpellSkillScript(token, skillDefinition);
            case 'shieldDamageRoll':
                return new RollShieldDamageSkillScript(token, skillDefinition);
        }

        throw new Error(`skill script ${skillDefinition.script.name} is not known`);
    }
}
