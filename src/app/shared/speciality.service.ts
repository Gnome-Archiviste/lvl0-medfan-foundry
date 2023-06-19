export abstract class SpecialityService {
    abstract removeSpeciality(characterId: string, specialityEntityId: string): Promise<void>;
}
