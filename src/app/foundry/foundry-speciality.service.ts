import {Injectable} from '@angular/core';
import {SpecialityService} from '../speciality/speciality.service';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';
import {ChatService} from '../chat/chat.service';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {SpecialityArrowVolleyUtil} from '../speciality/speciality-arrow-volley-util';
import {PlayerNotificationService} from '../shared/player-notification.service';
import {SpecialityChatService} from '../speciality/speciality-chat.service';

@Injectable()
export class FoundrySpecialityService extends SpecialityService {
    constructor(
        systemDataDatabaseService: SystemDataDatabaseService,
        characterAccessorService: CharacterAccessorService,
        actorUpdaterService: ActorUpdaterService,
        chatService: ChatService,
        specialityArrowVolleyUtil: SpecialityArrowVolleyUtil,
        playerNotificationService: PlayerNotificationService,
        specialityChatService: SpecialityChatService,
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver,
    ) {
        super(
            systemDataDatabaseService,
            characterAccessorService,
            actorUpdaterService,
            chatService,
            specialityArrowVolleyUtil,
            playerNotificationService,
            specialityChatService
        );
    }

    async removeSpeciality(characterId: string, specialityEntityId: string): Promise<void> {
        await this.actorUpdaterService.updateActor(characterId, {
            system: {
                specialities: {
                    ['-=' + specialityEntityId]: null as any
                }
            }
        })
    }

    async addSpeciality(characterId: string, specialityId: string): Promise<void> {
        let actor = this.foundryLvl0IdResolver.getActorFromLvl0Id(characterId);
        if (actor) {
            if (actor.data.type === 'character') {
                let specialities = actor.data.data.specialities || {};
                let nextId = (Object.keys(specialities).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
                await actor.update({data: {specialities: {[nextId]: specialityId}}}, {diff: true});
            }
        }
    }
}

