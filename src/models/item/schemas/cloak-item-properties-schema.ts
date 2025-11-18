import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {ItemPropertiesTemplateStatModifiersSchema} from './item-properties-template-stat-modifiers-schema';
import {ItemPropertiesTemplateExtraSkillsSchema} from './item-properties-template-extra-skills-schema';
import {ItemPropertiesUniqueCapabilitiesSchema} from './item-properties-unique-capabilities-schema';
import {CloakItemPropertiesData} from '../properties';
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

export const CloakItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
    ...ItemPropertiesTemplateStatModifiersSchema(),
    ...ItemPropertiesUniqueCapabilitiesSchema(),
    ...ItemPropertiesTemplateExtraSkillsSchema(),
    immunity: new StringField({required: true, initial: ''}),
});

export class Lvl0FoundryItemCloak extends FoundryItemSystemDataBase<ReturnType<typeof CloakItemPropertiesSchema>> {
    static override defineSchema() {
        return CloakItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    CloakItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof CloakItemPropertiesSchema>>
>>;
