import {singleton} from 'tsyringe';
import wandConfig, {WandConfig} from './data/wand-config';
import {Injectable} from '@angular/core';

@singleton()
@Injectable({
    providedIn: 'root'
})
export class WandConfigRepository {
    getWandConfigs(): { [arcaneLevel: number]: WandConfig } {
        return wandConfig;
    }

    getWandConfig(arcane: number): WandConfig | undefined {
        return wandConfig[arcane]
    }
}
