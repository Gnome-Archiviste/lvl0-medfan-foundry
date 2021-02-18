export default {
    base: {
        champion: {
            name: "Champion",
            display_element: false,
            arcaneLevels: [
                1, 4, 8, 13, 18, 23, 29, 36, 44, 53
            ]
        },
        ranger: {
            name: "Forestier",
            display_element: false
        },
        warrior: {
            name: "Guerrier",
            display_element: false
        },
        mage: {
            name: "Magicien",
            display_element: false,
            arcaneLevels: [
                1, 4, 8, 13, 18, 23, 29, 36, 44, 53
            ]
        },
        rogue: {
            name: "Voleur",
            display_element: false
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
