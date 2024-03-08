import {RollSkillManager} from './managers/skill';
import {SpecialityService} from './app/speciality/speciality.service';
import {ActorEffectService} from './app/data-accessor/actor-effect.service';
import {SpellActionService} from './app/spell/spell-action.service';
import {DialogService} from './app/data-accessor/dialog-service';
import {SpellUtil} from './app/spell/spell-util';
import {ChatService} from './app/chat/chat.service';
import {SpellChatService} from './app/spell/spell-chat.service';

declare global {
    const rollSkillManager: RollSkillManager;
    const rollSpecialityManager: SpecialityService;
    const actorEffectService: ActorEffectService; // FIXME: Temp, should not stay once this is moved
    const dialogService: DialogService; // FIXME: Temp, should not stay once this is moved
    const spellUtil: SpellUtil; // FIXME: Temp, should not stay once this is moved
    const spellChatService: SpellChatService; // FIXME: Temp, should not stay once this is moved
    const chatService: ChatService; // FIXME: Temp, should not stay once this is moved
}
