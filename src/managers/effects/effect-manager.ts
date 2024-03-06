import {container, singleton} from 'tsyringe';
import {Lvl0FoundryActor} from 'models/actor';
import {StatsRepository} from 'repositories/stats-repository';
import {SkillRepository} from 'repositories/skill-repository';
import {Lvl0ActorEffectModifier} from '../../app/data-accessor/actor-effect.service';

@singleton()
export class EffectManager {
    constructor(
    ) {
    }

    getEffectsWithBonusDamage(actor: Lvl0FoundryActor): { name: string, value: number }[] {
        let actorData = actor.data.data;
        let effectsWithBonusDamage: { name: string, value: number }[] = [];
        if (actorData.effects) {
            for (let effect of Object.values(actorData.effects)) {
                if (!effect.modifiers)
                    continue;
                let damageModifier = effect.modifiers.find(x => x.stat === 'damage');
                if (damageModifier) {
                    effectsWithBonusDamage.push({
                        name: effect.effectName,
                        value: damageModifier.value
                    })
                }
            }
        }

        return effectsWithBonusDamage;
    }
}

Handlebars.registerHelper("effectModifierInfo", (modifier: Lvl0ActorEffectModifier) => {
    let prefix = '';
    if (modifier.skill)
        prefix = container.resolve(SkillRepository).getSkillFromId(modifier.skill).name;
    else if (modifier.stat)
        prefix = container.resolve(StatsRepository).getStatDisplayName(modifier.stat);

    if (modifier.value < 0) {
        return prefix + ' ' + modifier.value;
    } else {
        return prefix + ' +' + modifier.value;
    }
});
