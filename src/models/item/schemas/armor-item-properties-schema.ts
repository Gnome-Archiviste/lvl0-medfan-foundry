import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {ItemPropertiesTemplateStatModifiersSchema} from './item-properties-template-stat-modifiers-schema';
import {ItemPropertiesTemplateExtraSkillsSchema} from './item-properties-template-extra-skills-schema';
import {ItemPropertiesUniqueCapabilitiesSchema} from './item-properties-unique-capabilities-schema';
import {ArmorItemPropertiesData} from '../properties';
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

export const ArmorItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
    ...ItemPropertiesTemplateStatModifiersSchema(),
    ...ItemPropertiesUniqueCapabilitiesSchema(),
    ...ItemPropertiesTemplateExtraSkillsSchema(),
    protection: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
    dexMalus: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
    immunity: new StringField({required: true, initial: ''}),
});

export class Lvl0FoundryItemArmor extends FoundryItemSystemDataBase<ReturnType<typeof ArmorItemPropertiesSchema>> {
    static override defineSchema() {
        return ArmorItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    ArmorItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof ArmorItemPropertiesSchema>>
>>;
