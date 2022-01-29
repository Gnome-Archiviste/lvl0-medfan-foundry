export interface WandConfig {
    maxChargesPerWand: number;
}

export default {
    0: {maxChargesPerWand: 10},
    1: {maxChargesPerWand: 10},
    2: {maxChargesPerWand: 10},
    3: {maxChargesPerWand: 10},
    4: {maxChargesPerWand: 10},
    5: {maxChargesPerWand: 10},
    6: {maxChargesPerWand: 5},
    7: {maxChargesPerWand: 5},
    8: {maxChargesPerWand: 5},
    9: {maxChargesPerWand: 5},
    10: {maxChargesPerWand: 5},
    20: {maxChargesPerWand: 2},
} as { [arcaneLevel: number]: WandConfig }

