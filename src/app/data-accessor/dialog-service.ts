import {Observable} from 'rxjs';

// FIXME: Replace this with a wrapper so we don' t have to register all dialog as customelements (Same as for chat)
type DialogIds = 'lvl0-spell-definition-selector'
    | 'lvl0-level-up-dialog'
    | 'lvl0-character-initial-stat-roll-dialog'
    | 'lvl0-select-speciality-dialog'
    | 'lvl0-spell-selector-dialog'
    | 'lvl0-wand-selector-dialog'
    | 'lvl0-weapon-selector-dialog';

export abstract class DialogService {
    public abstract openDialog<TData, TResult>(dialogId: DialogIds, data: TData, dialogParameter: {
        id?: string,
        title: string
    }): Observable<TResult>;
}
