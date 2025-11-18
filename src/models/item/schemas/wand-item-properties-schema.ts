import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {WandItemPropertiesData} from '../properties';
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

export const WandItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
    charge: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
    arcane: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
    spell: new StringField({required: true, initial: ''}),
    // When trying to fill a wand with an epic fail, the wand cannot be filled anymore
    blocked: new BooleanField({required: true, initial: false}),
});

export class Lvl0FoundryItemWand extends FoundryItemSystemDataBase<ReturnType<typeof WandItemPropertiesSchema>> {
    static override defineSchema() {
        return WandItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    WandItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof WandItemPropertiesSchema>>
>>;
