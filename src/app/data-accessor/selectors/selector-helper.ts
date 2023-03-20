import {distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import _ from 'lodash';

export function createSelector<TSource, TReturn>(
    valueSelector: (value: TSource) => TReturn,
    comparator?: (previous: TReturn, current: TReturn) => boolean
) {
    return function (source: Observable<TSource>): Observable<TReturn> {
        return new Observable<TReturn>(subscriber => {
            return source.subscribe({
                next(value) {
                    subscriber.next(valueSelector(value));
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        }).pipe(
            distinctUntilChanged(comparator || ((a, b) => _.isEqual(a, b))),
            shareReplay(1)
        );
    };
}

