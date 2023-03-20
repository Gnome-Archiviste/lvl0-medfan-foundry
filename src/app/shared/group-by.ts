export type GroupBy<T extends Record<D, PropertyKey>, D extends keyof T> =
    { [K in T[D]]: T extends Record<D, K> ? T[] : never }

export function groupBy<T extends Record<D, PropertyKey>, D extends keyof T>(
    elements: T[],
    keyExtractor: (element: T) => T[D]
): GroupBy<T, D> {
    return elements.reduce((result, element) => {
        const key = keyExtractor(element);
        if (key in result) {
            (result[key] as T[]).push(element);
        } else {
            // @ts-ignore
            result[key] = [element] as T[];
        }
        return result;
    }, {} as GroupBy<T, D>);
}
