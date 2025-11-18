import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {ItemPropertiesTemplateStatModifiersSchema} from './item-properties-template-stat-modifiers-schema';
import {ItemPropertiesTemplateExtraSkillsSchema} from './item-properties-template-extra-skills-schema';
import {ItemPropertiesUniqueCapabilitiesSchema} from './item-properties-unique-capabilities-schema';
import {FootItemPropertiesData} from '../properties';
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

export const FootItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
    ...ItemPropertiesTemplateStatModifiersSchema(),
    ...ItemPropertiesUniqueCapabilitiesSchema(),
    ...ItemPropertiesTemplateExtraSkillsSchema(),
    immunity: new StringField({required: true, initial: ''}),
});

export class Lvl0FoundryItemFoot extends FoundryItemSystemDataBase<ReturnType<typeof FootItemPropertiesSchema>> {
    static override defineSchema() {
        return FootItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    FootItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof FootItemPropertiesSchema>>
>>;
