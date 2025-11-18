import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {AmmunitionItemPropertiesData, AmmunitionType} from '../properties';
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

export const AmmunitionItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
    extraDamage: new StringField({required: true, initial: ''}),
    extraDamageEffect: new StringField({required: true, initial: 'physic'}),
    bonus: new StringField({required: true, initial: ''}),
    ammunitionType: new StringField({
        required: true,
        initial: AmmunitionType.Arrow,
        // FIXME: Replace with AmmunitionType
        choices: ['arrow', 'bolt', 'dart', 'marble'],
    }),
});

export class Lvl0FoundryItemAmmunition extends FoundryItemSystemDataBase<ReturnType<typeof AmmunitionItemPropertiesSchema>> {
    static override defineSchema() {
        return AmmunitionItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    AmmunitionItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof AmmunitionItemPropertiesSchema>>
>>
