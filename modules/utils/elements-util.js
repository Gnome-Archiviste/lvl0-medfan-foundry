import elements from "../../data/elements.js";

export class ElementsUtil {
    /**
     * @param {string} elementId
     * @return {string}
     */
    static getName(elementId) {
        if (!elementId)
            return '';
        if (elementId in elements) {
            return elements[elementId].name;
        }
        return elementId;
    }
    /**
     * @param {string} elementId
     * @return {string}
     */
    static getNameForWeapon(elementId) {
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
