import {RollFactory} from '../shared/roll-factory';
import {DiceTerm, IRoll, SavedRoll} from '../shared/roll';
import {Evaluated} from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/client/dice/roll';
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

    async createRoll(formula: string, format?: ((roll: IRoll) => {
        message: string,
        actorId: string
    })): Promise<IRoll> {
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

    async createSavedRoll(formula: string): Promise<SavedRoll> {
        let roll = new Roll(formula);
        let foundryRoll = await roll.roll({async: true});

        return {
            total: roll.total!,
            formula: formula,
            terms: foundryRoll.dice.map((t: Die) => ({
                number: t.total!,
                faces: t.faces,
                results: t.results.map(x => ({result: x.result})),
            }))
        }
    }
}
