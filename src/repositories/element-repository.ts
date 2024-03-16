import elements from './data/elements';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ElementRepository {
    getElementIds(): string[] {
        return Object.keys(elements);
    }
}
