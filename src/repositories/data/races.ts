export interface RaceDefinition {
    readonly name: string;
    readonly display_subrace: boolean;
    readonly bonusStat: string;
    readonly extraSkillIds?: string[];
}

export default {
    base: {
        halfelf: {
            name: "Demi-Elfe",
            display_subrace: false,
            bonusStat: 'dex'
        },
        elf: {
            name: "Elfe",
            display_subrace: false,
            bonusStat: 'cha'
        },
        hauflin: {
            name: "Haufelin",
            display_subrace: false,
            bonusStat: 'per'
        },
        human: {
            name: "Humain",
            display_subrace: false,
            bonusStat: 'int'
        },
        dwarf: {
            name: "Nain",
            display_subrace: false,
            bonusStat: 'phy'
        }
    },
    anthropomorph: {
        katachas: {
            name: "Katachas",
            display_subrace: true,
            bonusStat: 'dex'
        },
        canissabilys: {
            name: "Canissabilys",
            display_subrace: true,
            bonusStat: 'per'
        },
        ekydeos: {
            name: "Ekydeös",
            display_subrace: true,
            bonusStat: 'phy'
        },
        gryvolier: {
            name: "Gryvolier",
            display_subrace: true,
            bonusStat: 'cha'
        },
        zelosaur: {
            name: "Zélosaure",
            display_subrace: true,
            bonusStat: 'int'
        }
    },
    fantastic: {
        leprechaun: {
            name: "Farfadet",
            display_subrace: false,
            bonusStat: 'per',
            extraSkillIds: ['ranger.move_silently']
        },
        fairy: {
            name: "Fée",
            display_subrace: false,
            bonusStat: 'cha',
            extraSkillIds: ['ranger.move_silently']
        },
        gnome: {
            name: "Gnome",
            display_subrace: false,
            bonusStat: 'int',
            extraSkillIds: ['ranger.move_silently']
        },
        pixie: {
            name: "Lutin",
            display_subrace: false,
            bonusStat: 'dex',
            extraSkillIds: ['ranger.move_silently']
        },
        pooka: {
            name: "Pooka",
            display_subrace: false,
            bonusStat: 'phy',
            extraSkillIds: ['ranger.move_silently']
        }
    },
    goblinoids: {
        halforc: {
            name: "Demi-Ork",
            display_subrace: false,
            bonusStat: 'cha'
        },
        goblin: {
            name: "Gobelin",
            display_subrace: false,
            bonusStat: 'dex'
        },
        hobgoblin: {
            name: "Hobgobelin",
            display_subrace: false,
            bonusStat: 'int'
        },
        korrigan: {
            name: "Korrigan",
            display_subrace: false,
            bonusStat: 'per'
        },
        orc: {
            name: "Ork",
            display_subrace: false,
            bonusStat: 'phy'
        }
    },
    monsters: {
        bonhemseptar: {
            name: "Bonhem-Septar",
            display_subrace: false,
            bonusStat: 'dex'
        },
        cambion: {
            name: "Cambion",
            display_subrace: false,
            bonusStat: 'int'
        },
        dokalben: {
            name: "Dokälben",
            display_subrace: false,
            bonusStat: 'cha'
        },
        knacker: {
            name: "Knacker",
            display_subrace: false,
            bonusStat: 'per'
        },
        revenant: {
            name: "Revenant",
            display_subrace: false,
            bonusStat: 'phy'
        }
    }
} as { [categoryId: string]: { [raceId: string]: RaceDefinition } };
