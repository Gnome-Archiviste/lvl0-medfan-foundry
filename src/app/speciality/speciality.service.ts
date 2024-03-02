import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {ChatService} from '../chat/chat.service';
import {combineLatest, take} from 'rxjs';
import {selectCharacterMana} from '../data-accessor/selectors/character-selectors';
import {selectCharacterSpecialityInfo} from '../data-accessor/selectors/character-specialities-selector';
import {SystemDataDatabaseService} from '../system-data/system-data-database.service';
import {CharacterSpecialitiesInfo} from '../data-accessor/models/lvl0-character';
import {ActorUpdaterService} from '../data-accessor/actor-updater.service';
import {ArrowVolleyResult, SpecialityArrowVolleyUtil} from './speciality-arrow-volley-util';
import {PlayerNotificationService} from '../shared/player-notification.service';

export abstract class SpecialityService {
    protected constructor(
        protected readonly systemDataDatabaseService: SystemDataDatabaseService,
        protected readonly characterAccessorService: CharacterAccessorService,
        protected readonly actorUpdaterService: ActorUpdaterService,
        protected readonly chatService: ChatService,
        protected readonly specialityArrowVolleyUtil: SpecialityArrowVolleyUtil,
        protected readonly playerNotificationService: PlayerNotificationService,
    ) {
    }

    abstract removeSpeciality(characterId: string, specialityEntityId: string): Promise<void>;

    abstract addSpeciality(characterId: string, specialityId: string): Promise<void>;

    useSpeciality(characterId: string, specialityId: string): void {
        let character$ = this.characterAccessorService.selectCharacter(characterId);
        combineLatest([
            character$.pipe(selectCharacterSpecialityInfo(this.systemDataDatabaseService)),
            character$.pipe(selectCharacterMana()),
        ]).pipe(take(1))
            .subscribe(async ([characterSpecialitiesInfo, mana]: [CharacterSpecialitiesInfo, number]) => {
                let characterSpeciality = characterSpecialitiesInfo.specialities.find(x => x.speciality.id == specialityId);
                if (!characterSpeciality) {
                    this.playerNotificationService.showError('speciality_not_found')
                    return;
                }

                let manaCost = 1;
                if (mana < manaCost) {
                    this.playerNotificationService.showError('not_enough_mana')
                    return;
                }

                let specificExtraData: ArrowVolleyResult | undefined = undefined;
                if (characterSpeciality.speciality.id === 'arrow_volley') {
                    let arrowVolleyResult = await this.specialityArrowVolleyUtil.rollArrowVolley(characterId);
                    if (!arrowVolleyResult)
                        return;
                    specificExtraData = arrowVolleyResult;
                }

                await this.actorUpdaterService.updateActor(characterId, {
                    data: {mana: {value: mana - manaCost}}
                });
                await this.chatService.sendLvl0MessageFrom(characterId, {
                    type: 'speciality-roll',
                    data: {
                        specialityId: specialityId,
                        manaUsed: 1,
                        specificExtraData: specificExtraData
                    }
                });
            });
    }

    // Used in macros
    async rollSpeciality(token: Token, specialityId: string) {
        console.warn(token.actor?.lvl0Id, specialityId)
        let actorId = token.actor?.lvl0Id;
        if (actorId)
            this.useSpeciality(actorId, specialityId);
    }

}
