export interface ItemTypeConfig {
    readonly canBeEquiped: boolean
    readonly canHaveModifiers: boolean
}

export default {
    'ammunition': {
        canBeEquiped: true,
        canHaveModifiers: false,
    },
    'armor': {
        canBeEquiped: true,
        canHaveModifiers: true,
    },
    'bag': {
        canBeEquiped: true,
        canHaveModifiers: false,
    },
    'belt': {
        canBeEquiped: true,
        canHaveModifiers: true,
    },
    'cloak': {
        canBeEquiped: true,
        canHaveModifiers: true,
    },
    'foot': {
        canBeEquiped: true,
        canHaveModifiers: true,
    },
    'hand': {
        canBeEquiped: true,
        canHaveModifiers: true,
    },
    'head': {
        canBeEquiped: true,
        canHaveModifiers: true,
    },
    'handWeapon': {
        canBeEquiped: true,
        canHaveModifiers: true,
    },
    'magical': {
        canBeEquiped: true,
        canHaveModifiers: false,
    },
    'misc': {
        canBeEquiped: false,
        canHaveModifiers: false,
    },
    'necklace': {
        canBeEquiped: true,
        canHaveModifiers: true,
    },
    'potions': {
        canBeEquiped: false,
        canHaveModifiers: false,
    },
    'purse': {
        canBeEquiped: true,
        canHaveModifiers: false,
    },
    'ring': {
        canBeEquiped: true,
        canHaveModifiers: true,
    },
    'shield': {
        canBeEquiped: true,
        canHaveModifiers: true,
    },
    'scroll': {
        canBeEquiped: false,
        canHaveModifiers: false,
    },
    'wand': {
        canBeEquiped: false,
        canHaveModifiers: false,
    },
    'weapon': {
        canBeEquiped: true,
        canHaveModifiers: true,
    }
} as Record<string, ItemTypeConfig>
