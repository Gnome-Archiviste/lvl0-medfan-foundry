import {ItemPropertiesTemplateBase} from '../properties';

const {
    SchemaField,
    NumberField,
    BooleanField,
    ObjectField,
    ArrayField,
    StringField,
    TypedObjectField,
} = foundry.data.fields;

export const ItemPropertiesTemplateBaseSchema = () => ({
    equiped: new BooleanField({required: true}),
    migrated: new BooleanField({required: false, initial: false, nullable: false}),
    price: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
    description: new StringField({required: true, initial: ''}),
    details: new StringField({required: true, initial: ''}),
    clutter: new NumberField({required: true, nullable: false, initial: 0, integer: false}),
    quantifiable: new BooleanField({required: true, initial: false}),
    quantity: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
    restriction: new StringField({required: true, initial: ''}),
});

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    ItemPropertiesTemplateBase,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof ItemPropertiesTemplateBaseSchema>>
>>;
