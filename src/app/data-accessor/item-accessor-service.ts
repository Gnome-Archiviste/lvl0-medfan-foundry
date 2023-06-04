import {Observable} from 'rxjs';
import {Lvl0Item} from './models/lvl0-item';

export abstract class ItemAccessorService {
    public abstract selectItem(id: string): Observable<Lvl0Item>;
}
