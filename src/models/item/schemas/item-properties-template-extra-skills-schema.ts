import {ItemPropertiesTemplateExtraSkills} from '../properties';

const {
    SchemaField,
    NumberField,
    BooleanField,
    ObjectField,
    ArrayField,
    StringField,
    TypedObjectField,
} = foundry.data.fields;

export const ItemPropertiesTemplateExtraSkillsSchema = () => ({
    extraSkills: new TypedObjectField(new SchemaField({
        id: new StringField({required: true})
    }), {required: true}),
});

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    ItemPropertiesTemplateExtraSkills,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof ItemPropertiesTemplateExtraSkillsSchema>>
>>;
