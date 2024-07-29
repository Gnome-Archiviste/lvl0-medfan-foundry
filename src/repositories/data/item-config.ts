import {UnionKeys} from '../../utils/util';
import {Lvl0Item} from '../../app/data-accessor/models/lvl0-item';

export interface ItemTypeConfig {
    readonly canBeEquiped: boolean
    readonly canHaveModifiers: boolean
    readonly canHaveExtraSkills: boolean
    readonly canHaveUniqueCapabilities: boolean
}

export default <Record<UnionKeys<Lvl0Item, 'type'>, ItemTypeConfig>>{
    ammunition: {
        canBeEquiped: true,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
        canHaveUniqueCapabilities: false,
    },
    armor: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
        canHaveUniqueCapabilities: true,
    },
    bag: {
        canBeEquiped: true,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
        canHaveUniqueCapabilities: false,
    },
    belt: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
        canHaveUniqueCapabilities: true,
    },
    cloak: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
        canHaveUniqueCapabilities: true,
    },
    foot: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
        canHaveUniqueCapabilities: true,
    },
    hand: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
        canHaveUniqueCapabilities: true,
    },
    head: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
        canHaveUniqueCapabilities: true,
    },
    handWeapon: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
        canHaveUniqueCapabilities: true,
    },
    magical: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
        canHaveUniqueCapabilities: true,
    },
    misc: {
        canBeEquiped: false,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
        canHaveUniqueCapabilities: false,
    },
    necklace: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
        canHaveUniqueCapabilities: true,
    },
    potions: {
        canBeEquiped: false,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
        canHaveUniqueCapabilities: false,
    },
    purse: {
        canBeEquiped: true,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
        canHaveUniqueCapabilities: false,
    },
    ring: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
        canHaveUniqueCapabilities: true,
    },
    shield: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
        canHaveUniqueCapabilities: true,
    },
    scroll: {
        canBeEquiped: false,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
        canHaveUniqueCapabilities: false,
    },
    wand: {
        canBeEquiped: false,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
        canHaveUniqueCapabilities: false,
    },
    weapon: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: false,
        canHaveUniqueCapabilities: true,
    },
}
