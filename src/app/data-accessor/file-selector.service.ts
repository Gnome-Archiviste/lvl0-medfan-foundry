import {Observable} from 'rxjs';

export abstract class FileSelectorService {
    public abstract selectImage(currentPath?: string): Observable<string>;
    public abstract canSelectImage(): boolean;
}
