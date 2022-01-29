import {singleton} from 'tsyringe';
import wandConfig, {WandConfig} from './data/wand-config';

@singleton()
export class WandConfigRepository {
    getWandConfigs(): { [arcaneLevel: number]: WandConfig } {
        return wandConfig;
    }

    getWandConfig(arcane: number): WandConfig | undefined {
        return wandConfig[arcane]
    }
}
