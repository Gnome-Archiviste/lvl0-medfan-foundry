export type UnionKeys<TUnion, TDisciminator extends keyof TUnion> =
    TUnion[TDisciminator] extends string | number | symbol ?
        TUnion[TDisciminator] : never;
