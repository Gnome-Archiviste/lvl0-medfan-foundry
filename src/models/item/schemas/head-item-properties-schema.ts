import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {ItemPropertiesTemplateStatModifiersSchema} from './item-properties-template-stat-modifiers-schema';
import {ItemPropertiesTemplateExtraSkillsSchema} from './item-properties-template-extra-skills-schema';
import {ItemPropertiesUniqueCapabilitiesSchema} from './item-properties-unique-capabilities-schema';
import {HeadItemPropertiesData} from '../properties';
import {FoundryItemSystemDataBase} from '../lvl0-item-data';

const {
    SchemaField,
    NumberField,
    BooleanField,
    ObjectField,
    ArrayField,
    StringField,
    TypedObjectField,
} = foundry.data.fields;

export const HeadItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
    ...ItemPropertiesTemplateStatModifiersSchema(),
    ...ItemPropertiesUniqueCapabilitiesSchema(),
    ...ItemPropertiesTemplateExtraSkillsSchema(),
    immunity: new StringField({required: true, initial: ''}),
});

export class Lvl0FoundryItemHead extends FoundryItemSystemDataBase<ReturnType<typeof HeadItemPropertiesSchema>> {
    static override defineSchema() {
        return HeadItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    HeadItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof HeadItemPropertiesSchema>>
>>;
