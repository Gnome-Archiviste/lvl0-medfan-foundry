import {ActorBasicStatNamesList, ActorStatNamesList} from '../shared';

const {
    SchemaField,
    NumberField,
    BooleanField,
    ObjectField,
    ArrayField,
    StringField,
    TypedObjectField,
} = foundry.data.fields;

export const CommonData = () => ({});

export const LevelDataSchema = () => new SchemaField({
    health: new NumberField({required: true}),
    mana: new NumberField({required: true}),
    money: new NumberField({required: true}),
    additionalStat: new StringField({required: false, choices: ActorBasicStatNamesList}),
});

export const SkillValueSchema = () => new SchemaField({
    value: new NumberField({required: true}),
    master: new BooleanField({required: true}),
    prodigy: new BooleanField({required: true}),
    manualMode: new BooleanField(),
});

export const JobDataSchema = () => new SchemaField({
    id: new StringField({required: true}),
    specialization: new StringField({required: true}),
    specializations: new ArrayField(new StringField()),
});

export const RaceDataSchema = () => new SchemaField({
    id: new StringField({required: true}),
    type: new StringField(),
});

export const CharacterModifierInfoSchema = () => new SchemaField({
    isPermanent: new BooleanField({required: true}),
    stat: new StringField({required: true, choices: ActorStatNamesList}),
    value: new NumberField({required: true}),
    name: new StringField({required: true}),
});

export const ActorEffectSchema = () => new SchemaField({
    duration: new StringField({required: true}),
    effectName: new StringField({required: true}),
    icon: new StringField({required: true}),
    modifiers: new ArrayField(new SchemaField({
        skill: new StringField({required: false}),
        stat: new StringField({required: false}),
        value: new NumberField({required: true}),
    })),
    magicArmor: new SchemaField({
        totalArmorPoint: new NumberField({required: true}),
        remainingArmorPoint: new NumberField({required: true}),
    }, {required: false}),
});

export const PendingSkillValueSchema = () => new SchemaField({
    value: new NumberField({required: true}),
    master: new BooleanField({required: true}),
    prodigy: new BooleanField({required: true}),
});

export const CharacterPropertiesSchema = () => ({
    ...CommonData(),
    levelUpData: new ObjectField(),
    staticInventory: new SchemaField({
        rationCount: new NumberField({integer: true, min: 0, initial: 0}),
        torchCount: new NumberField({integer: true, min: 0, initial: 0}),
        money: new NumberField({integer: true, min: 0, initial: 0}),
        money100: new NumberField({integer: true, min: 0, initial: 0}),
        money500: new NumberField({integer: true, min: 0, initial: 0}),
        money1000: new NumberField({integer: true, min: 0, initial: 0}),
    }),
    skills: new TypedObjectField(new TypedObjectField(SkillValueSchema())),
    usedSkillMastery: new TypedObjectField(new TypedObjectField(new BooleanField()), {required: false}),
    usedSkillProdigy: new TypedObjectField(new TypedObjectField(new BooleanField()), {required: false}),
    pendingSkills: new TypedObjectField(new TypedObjectField(PendingSkillValueSchema()), {required: false}),
    baseStats: new SchemaField({
        phy: new SchemaField({value: new NumberField({required: true})}),
        dex: new SchemaField({value: new NumberField({required: true})}),
        int: new SchemaField({value: new NumberField({required: true})}),
        cha: new SchemaField({value: new NumberField({required: true})}),
        per: new SchemaField({value: new NumberField({required: true})}),
    }),
    modifiers: new TypedObjectField(CharacterModifierInfoSchema()),
    health: new SchemaField({
        min: new NumberField({required: true}),
        max: new NumberField({required: true}),
        value: new NumberField({required: true}),
    }),
    mana: new SchemaField({
        min: new NumberField({required: true}),
        max: new NumberField({required: true}),
        value: new NumberField({required: true}),
    }),
    level: new SchemaField({
        value: new NumberField({required: true, integer: true, min: 1}),
    }),
    experience: new SchemaField({
        value: new NumberField({required: true, integer: true, min: 0}),
    }),
    size: new SchemaField({
        value: new StringField({required: true}),
    }),
    age: new SchemaField({
        value: new StringField({required: true}),
    }),
    job: JobDataSchema(),
    race: RaceDataSchema(),
    effects: new TypedObjectField(ActorEffectSchema()),
    specialities: new TypedObjectField(new StringField({required: true})),
    notes: new SchemaField({
        content: new StringField({required: true}),
        mode: new StringField({required: true, choices: ["markdown", "html"], initial: "markdown"}),
    }),
});

export abstract class FoundryActorSystemDataBase<DS extends ReturnType<typeof CommonData>> extends foundry.abstract.TypeDataModel<DS, Actor.Implementation> {
}

// Evaluate
// export interface Lvl0ActorEffect extends SchemaField.InitializedData<typeof effectSchema> {}
export class Lvl0FoundryCharacterSystemData extends FoundryActorSystemDataBase<ReturnType<typeof CharacterPropertiesSchema>> {
    static override defineSchema() {
        return CharacterPropertiesSchema();
    }

    static migrateData(source: any) {
        if (window['logMigrateData'])
            console.debug(`Migrating actor with data`, JSON.parse(JSON.stringify(source, null, 2)));
        return super.migrateData(source);
    }
}
