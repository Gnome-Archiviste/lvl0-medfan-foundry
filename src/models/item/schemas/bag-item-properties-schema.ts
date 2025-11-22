import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {BagItemPropertiesData} from '../properties';
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

export const BagItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
    extraRows: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
    extraColumns: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
    unlockedColumnNumber: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
    noLimit: new BooleanField({required: true, initial: false}),
});

export class Lvl0FoundryItemBag extends FoundryItemSystemDataBase<ReturnType<typeof BagItemPropertiesSchema>> {
    static override defineSchema() {
        return BagItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    BagItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof BagItemPropertiesSchema>>
>>;
