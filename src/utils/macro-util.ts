import {inject, singleton} from 'tsyringe';
import {MacroData} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs';
import {InitializedGame} from '../models/misc/game';

@singleton()
export class MacroUtil {
    constructor(
        @inject(InitializedGame) private readonly game: InitializedGame
    ) {
    }

    async createAndAssignMacroToFirstAvailableSlot(data: Partial<MacroData> & { name: string }): Promise<void> {
        let macro = await Macro.create(data)
        if (!macro) {
            throw new Error('Failed to create macro');
        }
        await this.game.user.assignHotbarMacro(macro, '');
    }

    guardScriptExecutionWithTokenCheck(script: string): string {
        return `if (!token) {
  ui.notifications.warn("Sélectionner un token avant d'exécuter cette macro");
} else {
    ${script}
}`;
    }
}
