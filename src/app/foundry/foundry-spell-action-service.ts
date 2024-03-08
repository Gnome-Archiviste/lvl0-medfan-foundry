import {SpellAction} from 'app/spell/spell';
import {SpellActionService} from '../spell/spell-action.service';
import {ActorEffectService} from '../data-accessor/actor-effect.service';
import {PlayerNotificationService} from '../shared/player-notification.service';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {take} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class FoundrySpellActionService extends SpellActionService {
    constructor(
        private readonly actorEffectService: ActorEffectService,
        private readonly actorUpdaterService: ActorUpdaterService,
        private readonly characterAccessorService: CharacterAccessorService,
        private readonly playerNotificationService: PlayerNotificationService,
    ) {
        super();
    }

    executeAction(action: SpellAction) {
        let token = canvas?.tokens?.controlled[0] || game.user?.character?.getActiveTokens().shift();
        let actorId = token?.actor?.lvl0Id;
        if (!actorId) {
            this.playerNotificationService.showError('select_token_first');
            return;
        }

        if (action.type === 'heal') {
            this.characterAccessorService.selectCharacter(actorId).pipe(take(1)).subscribe(c => {
                this.actorUpdaterService.updateActor(c.id, {data: {health: {value: c.data.health.value + action.data.value}}})
            })
        } else if (action.type === 'addEffect') {
            this.actorEffectService.applyEffect(actorId, action.data);
        }
    }
}
