import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {PurseItemPropertiesData} from '../properties';
import {FoundryItemSystemDataBase} from '../lvl0-item-data';

const {
    NumberField,
} = foundry.data.fields;

export const PurseItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
    maxMoney: new NumberField({required: true, nullable: false, initial: 0, integer: true}),
});

export class Lvl0FoundryItemPurse extends FoundryItemSystemDataBase<ReturnType<typeof PurseItemPropertiesSchema>> {
    static override defineSchema() {
        return PurseItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    PurseItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof PurseItemPropertiesSchema>>
>>;
