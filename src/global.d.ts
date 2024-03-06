import {RollSkillManager} from './managers/skill';
import {SpecialityService} from './app/speciality/speciality.service';
import {ActorEffectService} from './app/data-accessor/actor-effect.service';

declare global {
    const rollSkillManager: RollSkillManager;
    const rollSpecialityManager: SpecialityService;
    const actorEffectService: ActorEffectService; // FIXME: Temp, should not stay once this is moved
}
