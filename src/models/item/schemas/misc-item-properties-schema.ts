import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {MiscItemPropertiesData} from '../properties';
import {FoundryItemSystemDataBase} from '../lvl0-item-data';

export const MiscItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
});

export class Lvl0FoundryItemMisc extends FoundryItemSystemDataBase<ReturnType<typeof MiscItemPropertiesSchema>> {
    static override defineSchema() {
        return MiscItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    MiscItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof MiscItemPropertiesSchema>>
>>;
