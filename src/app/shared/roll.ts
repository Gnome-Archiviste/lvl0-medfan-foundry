export type Result = {
    result: number;
}

export type DiceTerm = {
    number: number;
    faces: number;
    results: Result[];
}

export interface IRoll {
    total: number;
    terms: DiceTerm[];
}
