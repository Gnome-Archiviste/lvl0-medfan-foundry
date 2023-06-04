import {Injectable, NgZone} from '@angular/core';
import {FileSelectorService} from '../data-accessor/file-selector.service';
import {Observable, Subscriber} from 'rxjs';

@Injectable()
export class FoundryFileSelectorService extends FileSelectorService {
    private readonly _subscriberByFilePicker: { filePicker: FilePicker, subscriber: Subscriber<string> }[] = [];

    constructor(private ngZone: NgZone) {
        super();

        Hooks.on('closeFilePicker', (fp, _) => {
            let filePickerWithSubscriberIndex = this._subscriberByFilePicker.findIndex(e => e.filePicker === fp);
            if (filePickerWithSubscriberIndex != -1) {
                let {subscriber} = this._subscriberByFilePicker[filePickerWithSubscriberIndex];
                subscriber.complete();
                this._subscriberByFilePicker.splice(filePickerWithSubscriberIndex, 1);
            }
        })
    }

    selectImage(currentPath?: string): Observable<string> {
        return new Observable((subscriber) => {
            let fp = new FilePicker({
                type: "image", // The type of files to display in the file picker
                current: currentPath,
                callback: (path) => {
                    this.ngZone.run(() => {
                        subscriber.next(path);
                        subscriber.complete();
                    })
                },
            });
            // @ts-ignore
            fp.browse();
            this._subscriberByFilePicker.push({filePicker: fp, subscriber: subscriber})
        });
    }

}
