import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {ItemPropertiesTemplateStatModifiersSchema} from './item-properties-template-stat-modifiers-schema';
import {ItemPropertiesTemplateExtraSkillsSchema} from './item-properties-template-extra-skills-schema';
import {ItemPropertiesUniqueCapabilitiesSchema} from './item-properties-unique-capabilities-schema';
import {HandWeaponItemPropertiesData} from '../properties';
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

export const HandWeaponItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
    ...ItemPropertiesTemplateStatModifiersSchema(),
    ...ItemPropertiesUniqueCapabilitiesSchema(),
    ...ItemPropertiesTemplateExtraSkillsSchema(),
    damage: new StringField({required: true, initial: ''}),
    element: new StringField({required: true, initial: ''}),
    bonus: new StringField({required: true, initial: ''}),
    canUseWeapon: new BooleanField({required: true, initial: false}),
    immunity: new StringField({required: true, initial: ''}),
});

export class Lvl0FoundryItemHandWeapon extends FoundryItemSystemDataBase<ReturnType<typeof HandWeaponItemPropertiesSchema>> {
    static override defineSchema() {
        return HandWeaponItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    HandWeaponItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof HandWeaponItemPropertiesSchema>>
>>;
