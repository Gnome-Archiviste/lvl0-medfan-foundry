export interface JobRequirement {
    stat: string;
    min: number;
    notRaces: string[] | undefined;
    races: string[] | undefined;
}
