import {ItemPropertiesTemplateStatModifiers} from '../properties';
import {ItemModifierInfoSchema} from './item-modifier-info-schema';

const {
    SchemaField,
    NumberField,
    BooleanField,
    ObjectField,
    ArrayField,
    StringField,
    TypedObjectField,
} = foundry.data.fields;

export const ItemPropertiesTemplateStatModifiersSchema = () => ({
    modifiers: new TypedObjectField(new SchemaField({
        ...ItemModifierInfoSchema(),
    }), {required: true}),
});

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    ItemPropertiesTemplateStatModifiers,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof ItemPropertiesTemplateStatModifiersSchema>>
>>;
