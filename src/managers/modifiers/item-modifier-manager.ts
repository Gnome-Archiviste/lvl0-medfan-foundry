import {singleton} from 'tsyringe';
import {
    ItemModifierInfo,
    ItemPropertiesTemplateStatModifiers,
    Lvl0FoundryItem,
    Lvl0ItemWithModifiers
} from '../../models/item';

@singleton()
export class ItemModifierManager {

    async addModifier(item: Lvl0ItemWithModifiers, modifier: ItemModifierInfo) {
        let modifiers = item.data.data.modifiers || {};
        let nextId = (Object.keys(modifiers).reduce((previousValue, currentValue) => Math.max(previousValue, +currentValue), 0) + 1) || 1;
        await item.update({data: {modifiers: {[nextId]: modifier}}}, {diff: true});
    }

    async removeModifier(item: Lvl0FoundryItem, modifierId: number) {
        await item.update({data: {modifiers: {['-=' + modifierId]: null}}}, {diff: true});
    }

    async updateModifier(item: Lvl0FoundryItem, modifierId: number, partialModifier: RecursivePartial<ItemModifierInfo>) {
        await item.update({
            data: {modifiers: {[modifierId]: partialModifier}}
        } as {data: ItemPropertiesTemplateStatModifiers}, {diff: true});
    }

}
