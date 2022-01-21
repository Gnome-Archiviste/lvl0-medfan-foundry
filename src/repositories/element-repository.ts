import elements from './data/elements';

export class ElementRepository {
    static getElementWeaponNameByElementsIds(): Record<string, string> {
        return Object.entries(elements).reduce((previousValue, [key, value]) => {
            previousValue[key] = value.nameForWeapon;
            return previousValue;
        }, {})
    }

    static getElementName(elementId: string) {
        if (!elementId)
            return '';
        if (elementId in elements) {
            return elements[elementId].name;
        }
        return elementId;
    }

    static getElementWeaponName(elementId: string) {
        if (!elementId)
            return '';
        if (elementId in elements) {
            return elements[elementId].nameForWeapon;
        }
        return elementId;
    }
}
