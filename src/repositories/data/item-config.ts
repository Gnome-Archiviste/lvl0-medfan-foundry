import {UnionKeys} from '../../utils/util';
import {Lvl0Item} from '../../app/data-accessor/models/lvl0-item';

export interface ItemTypeConfig {
    readonly canBeEquiped: boolean
    readonly canHaveModifiers: boolean
    readonly canHaveExtraSkills: boolean
}

export default <Record<UnionKeys<Lvl0Item, 'type'>, ItemTypeConfig>>{
    ammunition: {
        canBeEquiped: true,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
    },
    armor: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
    },
    bag: {
        canBeEquiped: true,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
    },
    belt: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
    },
    cloak: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
    },
    foot: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
    },
    hand: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
    },
    head: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
    },
    handWeapon: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
    },
    magical: {
        canBeEquiped: true,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
    },
    misc: {
        canBeEquiped: false,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
    },
    necklace: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
    },
    potions: {
        canBeEquiped: false,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
    },
    purse: {
        canBeEquiped: true,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
    },
    ring: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
    },
    shield: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: true,
    },
    scroll: {
        canBeEquiped: false,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
    },
    wand: {
        canBeEquiped: false,
        canHaveModifiers: false,
        canHaveExtraSkills: false,
    },
    weapon: {
        canBeEquiped: true,
        canHaveModifiers: true,
        canHaveExtraSkills: false,
    },
}
