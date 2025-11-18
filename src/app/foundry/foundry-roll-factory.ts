import {RollFactory} from '../shared/roll-factory';
import {ChatRoll, DiceTerm, IRoll} from '../shared/roll';
import {FoundryLvl0IdResolver} from './foundry-lvl0-id-resolver';
import {Injectable} from '@angular/core';

export class FoundryRoll implements IRoll {
    readonly foundryRoll: Roll.Evaluated<Roll>;

    get formula(): string {
        return this.foundryRoll.formula!;
    }

    get total(): number {
        return this.foundryRoll.total!;
    }

    get terms(): DiceTerm[] {
        return this.foundryRoll.terms as any;
    }

    constructor(roll: Roll.Evaluated<Roll>) {
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

    async createRoll(formula: string, format?: ((roll: IRoll) => {
        message: string,
        actorId: string
    })): Promise<IRoll> {
        let roll = new Roll(formula);

        let foundryRoll = new FoundryRoll(await roll.roll());
        if (format) {
            const messageData = roll.toMessage({}, {create: false})
            const messageInfo = format(foundryRoll);
            let foundryActor = this.foundryLvl0IdResolver.getActorFromLvl0Id(messageInfo.actorId);
            const speaker = ChatMessage.getSpeaker({actor: foundryActor});
            await ChatMessage.create({...messageData, content: messageInfo.message + await roll.render(), speaker});
        }

        return foundryRoll;
    }

    convertToRollChat(roll: IRoll): ChatRoll {
        if (!(roll instanceof FoundryRoll))
            throw new Error('Roll was not a foundry roll');
        return {
            total: roll.total,
            formula: roll.formula,
            terms: roll.foundryRoll.dice.map((t) => ({
                number: t.total!,
                faces: t.faces!,
                results: t.results.map(x => ({result: x.result})),
            }))
        }
    }

}
