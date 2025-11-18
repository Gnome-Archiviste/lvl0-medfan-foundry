import {ActorStatNamesList} from '../../shared';
import {ItemModifierInfo} from '../item-modifier-info';

const {
    SchemaField,
    NumberField,
    BooleanField,
    ObjectField,
    ArrayField,
    StringField,
    TypedObjectField,
} = foundry.data.fields;

export const ItemModifierInfoSchema = () => ({
    stat: new StringField({required: true, initial: 'phy', choices: ActorStatNamesList}),
    value: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
    operation: new StringField({required: false, initial: 'ADD', choices: ['ADD', 'MULTIPLY']}),
});

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    ItemModifierInfo,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof ItemModifierInfoSchema>>
>>;
