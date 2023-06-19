import {MacroData} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs';
import {Injectable} from '@angular/core';
import {MacroService} from '../shared/macro.service';
import {SkillDefinition, SpecialityDefinition} from '../../repositories';

@Injectable()
export class FoundryMacroService extends MacroService {
    async createRollSkillMacro(skillDefinition: SkillDefinition) {
        await this.createAndAssignMacroToFirstAvailableSlot({
            name: skillDefinition.name,
            type: "script",
            img: skillDefinition.icon,
            scope: "actor",
            command: this.guardScriptExecutionWithTokenCheck(`rollSkillManager.rollSkill(token, '${skillDefinition.skillId}')`)
        })
    }

    async createUseSpecialityMacro(specialityDefinition: SpecialityDefinition): Promise<void> {
        await this.createAndAssignMacroToFirstAvailableSlot({
            name: specialityDefinition.name,
            type: "script",
            img: specialityDefinition.icon,
            scope: "actor",
            command: this.guardScriptExecutionWithTokenCheck(`rollSpecialityManager.rollSpeciality(token, '${specialityDefinition.id}')`)
        })
    }

    async createAndAssignMacroToFirstAvailableSlot(data: Partial<MacroData> & { name: string }): Promise<void> {
        let macro = await Macro.create(data)
        if (!macro) {
            throw new Error('Failed to create macro');
        }
        await game.user?.assignHotbarMacro(macro, '');
    }

    public guardScriptExecutionWithTokenCheck(script: string): string {
        return `if (!token) {
  ui.notifications.warn("Sélectionner un token avant d'exécuter cette macro");
} else {
    ${script}
}`;
    }
}
