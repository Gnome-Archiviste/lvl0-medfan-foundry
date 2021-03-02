export class ActorDataComputer {
    /**
     * @param actorType
     * @return {boolean}
     */
    isAvailableFor(actorType) {
        return false;
    }

    /**
     * @return {void}
     */
    compute(actorData) {
        throw new Error('Not implemented');
    }
}
