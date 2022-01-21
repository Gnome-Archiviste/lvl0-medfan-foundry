import elements from "../../data/elements.js";

export class ElementsUtil {
    static getName(elementId: string) {
        if (!elementId)
            return '';
        if (elementId in elements) {
            return elements[elementId].name;
        }
        return elementId;
    }

    static getNameForWeapon(elementId: string) {
        if (!elementId)
            return '';
        if (elementId in elements) {
            return elements[elementId].nameForWeapon;
        }
        return elementId;
    }
}

Handlebars.registerHelper('weaponEffectName', (v) => {
    return ElementsUtil.getNameForWeapon(v);
});
Handlebars.registerHelper('elementName', (v) => {
    return ElementsUtil.getName(v);
});
