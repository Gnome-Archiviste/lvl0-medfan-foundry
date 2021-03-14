function parseHealthManaInfo(info) {
    if (info.indexOf('+') !== -1) {
        return info.split('+').reduce((result, currentValue) => {
            return {...result, ...parseHealthManaInfo(currentValue.trim())}
        }, {});
    }
    if (info === 'INT') {
        return {useStatValue: 'int'}
    }
    if (info.indexOf('D6') !== -1) {
        return {diceCount: +info.substr(0, 1)}
    }
    return {value: +info};
}

export default {
    base: {
        champion: {
            name: "Champion",
            requirements: [
                {stat: "cha", min: 4},
                {stat: "phy", min: 4}
            ],
            display_element: false,
            arcaneLevels: [
                1, 4, 8, 13, 18, 23, 29, 36, 44, 53
            ],
            // @formatter:off
            healthLevels: [
                "10", "5", "1D6", "5", "1D6", "5", "5", "5", "5",   "5",
                "4",  "4", "4",   "4", "5",   "4", "4", "4", "4",   "5",
                "4",  "4", "4",   "4", "2D6", "3", "3", "3", "3",   "4",
                "3", "3", "3",    "2", "3",   "2", "2", "2", "2",   "1D6",
                "1", "1", "1",    "1", "2",   "1", "1", "1", "1",   "2D6",
                "2", "1", "2",    "1", "1",   "1", "0", "1", "1",   "3",
                "0", "1", "0",    "1", "2",   "1", "0", "1", "2D6", "8",
            ].map(parseHealthManaInfo),
            specialityLevels: [
                15, 24, 36, 42, 49, 56, 63
            ],
            manaLevels: [
                "INT", "1D6", "1D6", "1D6", "1D6", "3", "3", "3", "3", "1D6",
                "1",   "1",   "1",   "1",   "2",   "1", "1", "1", "1", "1D6",
                "1",   "1",   "1",   "1",   "1",   "1", "1", "1", "1", "1D6",
                "1",   "1",   "1",   "1",   "1",   "1", "1", "1", "1", "1D6",
                "1",   "1",   "1",   "1",   "1",   "1", "1", "1", "1", "1D6",
                "1",   "1",   "1",   "1",   "1",   "1", "1", "1", "1", "1D6",
                "1",   "1",   "1",   "1",   "1",   "1", "1", "1", "1", "1D6",
            ].map(parseHealthManaInfo)
            // @formatter:on
        },
        ranger: {
            name: "Forestier",
            requirements: [
                {stat: "dex", min: 4}
            ],
            display_element: false,
            // @formatter:off
            healthLevels: [
                "9", "4", "1D6", "4", "1D6", "4", "4", "4", "3",   "4",
                "3", "4", "3",   "4", "3",   "4", "3", "4", "3",   "4",
                "3", "4", "3",   "4", "1D6", "3", "2", "3", "2",   "3",
                "2", "3", "2",   "3", "2",   "2", "2", "2", "2",   "1D6",
                "1", "1", "1",   "1", "2",   "1", "1", "1", "1",   "2D6",
                "1", "1", "1",   "1", "1",   "0", "0", "1", "0",   "3",
                "0", "0", "1",   "0", "3",   "1", "0", "1", "1D6", "7"
            ].map(parseHealthManaInfo),
            specialityLevels: [
                12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 70, 70, 70
            ],
            manaLevels: [...Array.fromRange(70).map(_ => ({value: 1}))]
            // @formatter:on
        },
        warrior: {
            name: "Guerrier",
            requirements: [
                {stat: "phy", min: 5, notRaces: ['leprechaun', 'fairy', 'gnome', 'pixie', 'pooka']},
                {stat: "phy", min: 4, races: ['leprechaun', 'fairy', 'gnome', 'pixie', 'pooka']},
                {stat: "dex", min: 3, races: ['leprechaun', 'fairy', 'gnome', 'pixie', 'pooka']}
            ],
            display_element: false,
            // @formatter:off
            healthLevels: [
                "11", "5", "1D6", "5", "1D6", "5", "5", "5", "4",   "5",
                "4",  "5", "4",   "5", "4",   "5", "4", "5", "4",   "5",
                "4",  "5", "4",   "5", "2D6", "4", "3", "4", "3",   "4",
                "3",  "4", "3",   "4", "3",   "3", "3", "3", "3",   "1D6",
                "2",  "2", "2",   "2", "3",   "2", "2", "2", "2",   "2D6",
                "2",  "1", "1",   "1", "1",   "1", "1", "2", "1",   "5",
                "1",  "1", "1",   "1", "5",   "1", "1", "1", "2D6", "9"
            ].map(parseHealthManaInfo),
            specialityLevels: [
                12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 70, 70, 70
            ],
            manaLevels: [...Array.fromRange(70).map(_ => ({value: 1}))]
            // @formatter:on
        },
        mage: {
            name: "Magicien",
            display_element: false,
            requirements: [
                {stat: "int", min: 5}
            ],
            arcaneLevels: [
                1, 4, 8, 13, 18, 23, 29, 36, 44, 53
            ],
            // @formatter:off
            healthLevels: [
                "7", "3", "1D6", "3", "1D6", "2", "2", "2", "2",   "3",
                "2", "2", "2",   "2", "3",   "2", "2", "2", "2",   "3",
                "2", "2", "2",   "2", "1D6", "2", "1", "2", "1",   "2",
                "1", "1", "1",   "1", "2",   "1", "1", "1", "1",   "1D6",
                "1", "1", "1",   "1", "2",   "1", "1", "1", "1",   "2D6",
                "1", "0", "2",   "0", "1",   "0", "0", "1", "0",   "1",
                "0", "0", "0",   "0", "1",   "0", "0", "0", "1D6", "5",
            ].map(parseHealthManaInfo),
            specialityLevels: [
                42, 49, 56, 63
            ],
            manaLevels: [
                "INT + 1D6", "2D6", "INT", "1D6", "2D6","5", "5", "5", "5", "2D6",
                "3",         "3",   "3",   "3",   "1D6","2", "2", "2", "2", "1D6",
                "2",         "2",   "2",   "2",   "1D6","2", "2", "2", "2", "1D6",
                "2",         "2",   "2",   "2",   "1D6","2", "2", "2", "2", "1D6",
                "2",         "2",   "2",   "2",   "1D6","2", "2", "2", "2", "2D6",
                "2",         "2",   "2",   "2",   "1D6","1", "2", "1", "2", "1D6",
                "1",         "2",   "2",   "1",   "1D6","2", "1", "2", "1", "1D6",
            ].map(parseHealthManaInfo)
            // @formatter:on
        },
        rogue: {
            name: "Voleur",
            display_element: false,
            requirements: [
                {stat: "dex", min: 4}
            ],
            // @formatter:off
            healthLevels: [
                "8", "3", "1D6", "3", "1D6", "3", "3", "3", "3",   "3",
                "3", "3", "3",   "3", "3",   "3", "3", "3", "3",   "3",
                "3", "3", "3",   "3", "1D6", "3", "2", "3", "2",   "3",
                "2", "3", "2",   "3", "2",   "2", "2", "2", "2",   "1D6",
                "1", "1", "1",   "1", "2",   "1", "1", "1", "1",   "2D6",
                "1", "1", "1",   "1", "1",   "0", "0", "1", "0",   "2",
                "0", "0", "1",   "0", "2",   "1", "0", "1", "1D6", "6"
            ].map(parseHealthManaInfo),
            specialityLevels: [
                12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 70, 70, 70
            ],
            manaLevels: [...Array.fromRange(70).map(_ => ({value: 1}))]
            // @formatter:on
        }
    },
    advance: {
        jester: {
            name: "Bouffon",
            baseJob: "mage",
            display_element: false
        },
        elementalist: {
            name: "Élémentaliste",
            baseJob: "mage",
            display_element: true
        },
        enchanter: {
            name: "Enchanteur",
            baseJob: "mage",
            display_element: false
        },
        necromancer: {
            name: "Nécromancien",
            baseJob: "mage",
            display_element: false
        },
        witch: {
            name: "Sorcière",
            baseJob: "mage",
            display_element: false
        }
    }
}
