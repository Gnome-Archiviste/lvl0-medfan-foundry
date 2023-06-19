export interface RaceDefinitionBase {
    readonly name: string;
    readonly hasRaceSpecifier: boolean;
    readonly bonusStat: string;
    readonly extraSkillIds?: string[];
}

export interface RaceDefinition extends RaceDefinitionBase {
    readonly id: string;
}

export default {
    base: {
        halfelf: {
            name: "Demi-Elfe",
            hasRaceSpecifier: false,
            bonusStat: 'dex'
        },
        elf: {
            name: "Elfe",
            hasRaceSpecifier: false,
            bonusStat: 'cha'
        },
        hauflin: {
            name: "Haufelin",
            hasRaceSpecifier: false,
            bonusStat: 'per'
        },
        human: {
            name: "Humain",
            hasRaceSpecifier: false,
            bonusStat: 'int'
        },
        dwarf: {
            name: "Nain",
            hasRaceSpecifier: false,
            bonusStat: 'phy'
        }
    },
    anthropomorph: {
        katachas: {
            name: "Katachas",
            hasRaceSpecifier: true,
            bonusStat: 'dex'
        },
        canissabilys: {
            name: "Canissabilys",
            hasRaceSpecifier: true,
            bonusStat: 'per'
        },
        ekydeos: {
            name: "Ekydeös",
            hasRaceSpecifier: true,
            bonusStat: 'phy'
        },
        gryvolier: {
            name: "Gryvolier",
            hasRaceSpecifier: true,
            bonusStat: 'cha'
        },
        zelosaur: {
            name: "Zélosaure",
            hasRaceSpecifier: true,
            bonusStat: 'int'
        }
    },
    fantastic: {
        leprechaun: {
            name: "Farfadet",
            hasRaceSpecifier: false,
            bonusStat: 'per',
            extraSkillIds: ['ranger.move_silently']
        },
        fairy: {
            name: "Fée",
            hasRaceSpecifier: false,
            bonusStat: 'cha',
            extraSkillIds: ['ranger.move_silently']
        },
        gnome: {
            name: "Gnome",
            hasRaceSpecifier: false,
            bonusStat: 'int',
            extraSkillIds: ['ranger.move_silently']
        },
        pixie: {
            name: "Lutin",
            hasRaceSpecifier: false,
            bonusStat: 'dex',
            extraSkillIds: ['ranger.move_silently']
        },
        pooka: {
            name: "Pooka",
            hasRaceSpecifier: false,
            bonusStat: 'phy',
            extraSkillIds: ['ranger.move_silently']
        }
    },
    goblinoids: {
        halforc: {
            name: "Demi-Ork",
            hasRaceSpecifier: false,
            bonusStat: 'cha'
        },
        goblin: {
            name: "Gobelin",
            hasRaceSpecifier: false,
            bonusStat: 'dex'
        },
        hobgoblin: {
            name: "Hobgobelin",
            hasRaceSpecifier: false,
            bonusStat: 'int'
        },
        korrigan: {
            name: "Korrigan",
            hasRaceSpecifier: false,
            bonusStat: 'per'
        },
        orc: {
            name: "Ork",
            hasRaceSpecifier: false,
            bonusStat: 'phy'
        }
    },
    monsters: {
        bonhemseptar: {
            name: "Bonhem-Septar",
            hasRaceSpecifier: false,
            bonusStat: 'dex'
        },
        cambion: {
            name: "Cambion",
            hasRaceSpecifier: false,
            bonusStat: 'int'
        },
        dokalben: {
            name: "Dokälben",
            hasRaceSpecifier: false,
            bonusStat: 'cha'
        },
        knacker: {
            name: "Knacker",
            hasRaceSpecifier: false,
            bonusStat: 'per'
        },
        revenant: {
            name: "Revenant",
            hasRaceSpecifier: false,
            bonusStat: 'phy'
        }
    }
} as { [categoryId: string]: { [raceId: string]: RaceDefinitionBase } };
