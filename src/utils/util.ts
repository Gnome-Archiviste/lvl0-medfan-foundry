export type UnionKeys<TUnion, TDisciminator extends keyof TUnion> =
    TUnion[TDisciminator] extends string | number | symbol ?
        TUnion[TDisciminator] : never;


export function toDictionaryByKey<T extends {}>(
    array: T[],
    keySelector: (element: T) => string,
)
    : { [key: string]: T } {
    return array.reduce((dic: { [k: string]: T }, element) => {
        dic[keySelector(element)] = element;
        return dic;
    }, {});
}
