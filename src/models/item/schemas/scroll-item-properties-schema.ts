import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {ScrollItemPropertiesData} from '../properties';
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

export const ScrollItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
    spell: new StringField({required: true, initial: ''}),
    arcane: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
});

export class Lvl0FoundryItemScroll extends FoundryItemSystemDataBase<ReturnType<typeof ScrollItemPropertiesSchema>> {
    static override defineSchema() {
        return ScrollItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    ScrollItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof ScrollItemPropertiesSchema>>
>>;
