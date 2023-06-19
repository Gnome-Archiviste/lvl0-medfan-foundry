import {Observable} from 'rxjs';

type DialogIds = 'lvl0-spell-definition-selector' | 'lvl0-level-up-dialog' | 'lvl0-character-initial-stat-roll-dialog';

export abstract class DialogService {
    public abstract openDialog<TData, TResult>(dialogId: DialogIds, data: TData, dialogParameter: {id?: string, title: string}): Observable<TResult>;
}
