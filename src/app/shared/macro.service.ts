import {SkillDefinition, SpecialityDefinition} from '../../repositories';

export abstract class MacroService {
    abstract createRollSkillMacro(skillDefinition: SkillDefinition): Promise<void>;
    abstract createUseSpecialityMacro(specialityDefinition: SpecialityDefinition): Promise<void>;
}
