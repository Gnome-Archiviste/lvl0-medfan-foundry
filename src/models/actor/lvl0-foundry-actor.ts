export class Lvl0FoundryActor<SubType extends Actor.ConfiguredSubType = Actor.ConfiguredSubType> extends Actor<SubType> {
     get lvl0Id() {
        if (this.isToken)
            return this.id + "@" + this.token?.id;
        return this.id;
    }

    // Used by old macro
    async useSpeciality(specialityName: string): Promise<void> {
        rollSpecialityManager.useSpeciality(this.lvl0Id!, specialityName);
    }
}

