import {singleton} from 'tsyringe';
import elements from './data/elements';
import {Injectable} from '@angular/core';

@singleton()
@Injectable({
    providedIn: 'root'
})
export class ElementRepository {
    getElementWeaponNameByElementsIds(): Record<string, string> {
        return Object.entries(elements).reduce((previousValue, [key, value]) => {
            previousValue[key] = value.nameForWeapon;
            return previousValue;
        }, {})
    }

    getElementName(elementId: string) {
        if (!elementId)
            return '';
        if (elementId in elements) {
            return elements[elementId].name;
        }
        return elementId;
    }

    getElementWeaponName(elementId: string) {
        if (!elementId)
            return '';
        if (elementId in elements) {
            return elements[elementId].nameForWeapon;
        }
        return elementId;
    }
}
