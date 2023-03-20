import {Observable} from 'rxjs';
import {Lvl0Character} from './models/lvl0-character';

export abstract class CharacterAccessorService {
    public abstract selectCharacter(id: string): Observable<Lvl0Character>;
}
