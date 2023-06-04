import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DialogDataService {
    private dataById: Record<string, any> = {};

    public storeData<TData>(data: TData): string {
        let dialogDataId = this.randomId();
        this.dataById[dialogDataId] = data;
        return dialogDataId;
    }

    public consumeData<TData>(dialogDataId: string): TData {
        if (!(dialogDataId in this.dataById)) {
            throw new Error(`Dialog data not found: ${dialogDataId}`)
        }

        let data = this.dataById[dialogDataId];
        delete this.dataById[dialogDataId];
        return data;
    }

    private randomId(): string {
        return Math.random().toString(36).substring(5, 7) + Math.random().toString(36).substring(5, 7);
    }
}
