import {RollFactory} from '../shared/roll-factory';
import {DiceTerm, IRoll} from '../shared/roll';
import {Evaluated, MessageData} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/client/dice/roll';
import {Lvl0Actor} from '../data-accessor/models/lvl0-actor';
import {CharacterAccessorService} from '../data-accessor/character-accessor.service';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';
import {Injectable} from '@angular/core';

export class FoundryRoll implements IRoll {
    readonly foundryRoll: Roll;

    get total(): number {
        return this.foundryRoll.total!;
    }

    get terms(): DiceTerm[] {
        return this.foundryRoll.terms as any;
    }

    constructor(roll: Evaluated<Roll>) {
        this.foundryRoll = roll;
    }
}

@Injectable()
export class FoundryRollFactory extends RollFactory {
    public constructor(
        private readonly foundryLvl0IdResolver: FoundryLvl0IdResolver
    ) {
        super();
    }

    async createRoll(formula: string, format?: ((roll: IRoll) => { message: string, actorId: string })): Promise<IRoll> {
        let roll = new Roll(formula);

        let foundryRoll = new FoundryRoll(await roll.roll({async: true}));
        if (format) {
            const messageData = roll.toMessage({}, {create: false})
            const messageInfo = format(foundryRoll);
            let foundryActor = this.foundryLvl0IdResolver.getActorFromLvl0Id(messageInfo.actorId);
            const speaker = ChatMessage.getSpeaker({actor: foundryActor});
            await ChatMessage.create({...messageData, content: messageInfo.message + await roll.render(), speaker});
        }

        return foundryRoll;
    }
}
