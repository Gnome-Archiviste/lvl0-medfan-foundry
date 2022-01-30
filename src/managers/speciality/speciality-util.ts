import {singleton} from 'tsyringe';
import {Lvl0Actor, Lvl0ActorCharacter} from '../../models/actor';

@singleton()
export class SpecialityUtil {
    async addSpeciality(actor: Lvl0ActorCharacter, specialityId: string): Promise<void> {
        let specialities = actor.data.data.specialities || {};
        let nextId = (Object.keys(specialities).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        await actor.update({data: {specialities: {[nextId]: specialityId}}}, {diff: true});
    }

    async removeSpeciality(actor: Lvl0ActorCharacter, specialityId: string): Promise<void> {
        let specialities = actor.data.data.specialities || {};
        let entry = Object.entries(specialities).find(e => e[1] == specialityId);
        if (entry)
            await actor.update({data: {specialities: {['-=' + entry[0]]: null}}}, {diff: true});
    }
}
