import {Observable} from 'rxjs';

type DialogIds = 'lvl0-spell-definition-selector';

export abstract class DialogService {
    public abstract openDialog<TData, TResult>(dialogId: DialogIds, data: TData, dialogParameter: {id?: string, title: string}): Observable<TResult>;
}
