import {RollSkillManager} from './managers/skill';
import {SpecialityService} from './app/speciality/speciality.service';

declare global {
    const rollSkillManager: RollSkillManager;
    const rollSpecialityManager: SpecialityService;
}
