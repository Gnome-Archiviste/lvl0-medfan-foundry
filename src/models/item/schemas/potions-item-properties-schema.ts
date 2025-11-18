import {ItemPropertiesTemplateBaseSchema} from './item-properties-template-base-schema';
import {PotionsItemPropertiesData} from '../properties';
import {FoundryItemSystemDataBase} from '../lvl0-item-data';

export const PotionsItemPropertiesSchema = () => ({
    ...ItemPropertiesTemplateBaseSchema(),
});

export class Lvl0FoundryItemPotions extends FoundryItemSystemDataBase<ReturnType<typeof PotionsItemPropertiesSchema>> {
    static override defineSchema() {
        return PotionsItemPropertiesSchema();
    }
}

// Ensure that the type is correct and sync with the foundry schema. If this failed, adjust the schema above
type assert = ExpectTrue<Equals<
    PotionsItemPropertiesData,
    foundry.data.fields.SchemaField.InitializedData<ReturnType<typeof PotionsItemPropertiesSchema>>
>>;
