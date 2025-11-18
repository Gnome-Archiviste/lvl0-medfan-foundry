import {ItemPropertiesUniqueCapabilities} from '../properties/item-properties-unique-capabilities';

const {
    SchemaField,
    NumberField,
    BooleanField,
    ObjectField,
    ArrayField,
    StringField,
    TypedObjectField,
} = foundry.data.fields;

export const ItemPropertiesUniqueCapabilitiesSchema = () => ({
    superiorArcane: new SchemaField({
        active: new BooleanField({required: true}),
        manaMultiplierPerLevel: new NumberField({required: false, nullable: false, integer: true}),
        damagePerLevel: new NumberField({required: false, nullable: false, integer: true}),
        usageCountPerSessions: new NumberField({required: false, nullable: false, integer: true}),
        maximumArcaneLevel: new NumberField({required: false, nullable: false, integer: true}),
    }, {required: false}),
});

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    ItemPropertiesUniqueCapabilities,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof ItemPropertiesUniqueCapabilitiesSchema>>
>>;
