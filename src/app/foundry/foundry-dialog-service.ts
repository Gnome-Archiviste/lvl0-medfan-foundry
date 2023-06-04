import {DialogService} from '../data-accessor/dialog-service';
import {Observable} from 'rxjs';
import {FoundryDialogBase} from './foundry-dialog-wrapper';
import {Injectable} from '@angular/core';
import {DialogDataService} from '../data-accessor/dialog-data-service';

@Injectable()
export class FoundryDialogService extends DialogService {
    constructor(private readonly dialogDataService: DialogDataService) {
        super();
    }

    openDialog<TData, TResult>(dialogId: string, data: TData, dialogParameter: {id?: string, title: string}): Observable<TResult> {
        let dialogDataId = this.dialogDataService.storeData(data);
        return new Observable<TResult>(subscriber => {
            let dialog = new FoundryDialogBase<TResult>(dialogId, dialogDataId, (result) => {
                if (result)
                    subscriber.next(result);
                subscriber.complete();
            }, dialogParameter);
            dialog.render(true);
        });
    }
}
