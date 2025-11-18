import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {ItemPropertiesTemplateStatModifiersSchema} from './item-properties-template-stat-modifiers-schema';
import {ItemPropertiesUniqueCapabilitiesSchema} from './item-properties-unique-capabilities-schema';
import {AmmunitionType, WeaponItemPropertiesData, WeaponType} from '../properties';
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

const validateRollDamage = (
    value: string,
    options?: foundry.data.fields.DataField.ValidationOptions,
): void | foundry.data.validation.DataModelValidationFailure => {
    let rollValue = value.replace('{phy}', '1')
    if (!Roll.validate(rollValue)) {
        return new foundry.data.validation.DataModelValidationFailure({
            message: `Invalid roll formula: ${JSON.stringify(value)}`,
            invalidValue: value,
            unresolved: true,
        })
    }
}

export const WeaponItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
    ...ItemPropertiesTemplateStatModifiersSchema(),
    ...ItemPropertiesUniqueCapabilitiesSchema(),
    damage: new StringField({required: false, validate: validateRollDamage, trim: true}),
    rangeDamage: new StringField({required: false, validate: validateRollDamage, trim: true}),
    handCount: new NumberField({required: true, nullable: false, initial: 1, integer: true}),
    element: new StringField({required: true, initial: 'physic', trim: true}),
    bonus: new StringField({required: true, initial: '', trim: true}),
    usedAmmunitionType: new StringField({
        required: true,
        initial: AmmunitionType.Arrow,
        choices: ['arrow', 'bolt', 'dart', 'marble'],
    }),
    weaponType: new StringField({
        required: true,
        initial: WeaponType.Melee,
        choices: ['melee', 'range', 'melee-range'],
    }),
});

export class Lvl0FoundryItemWeapon extends FoundryItemSystemDataBase<ReturnType<typeof WeaponItemPropertiesSchema>> {
    static override defineSchema() {
        return WeaponItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    WeaponItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof WeaponItemPropertiesSchema>>
>>;
