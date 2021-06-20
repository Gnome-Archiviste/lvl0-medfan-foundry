export default [
    {
        id: 'fog',
        name: 'Brume',
        icon: 'icons/magic/air/weather-clouds.webp',
        description: `Une épaisse brume entoure le magicien, permettant de le cacher ainsi que ses coéquipiers, sur une zone de {{spell.area}}. Donne 2 points de pénalité sur leur perception (il faut faire une perception pour trouver un nouvel adversaire).`,
        distance: {
            type: 'self'
        },
        duration: {
            value: '3',
            unit: 'tours'
        },
        criticalSuccess: {
            formula: 'return "Rayon de " + (10 + context.actorData.computedData.magic.arcaneLevel) + " mètres";'
        },
        area: {
            formula: `
                    if (context.criticalSuccess) {
                        return 10 + context.actorData.computedData.magic.arcaneLevel;
                    }
                    switch (context.actorData.computedData.magic.arcaneLevel) {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            return 5;
                        case 5:
                            return 6;
                        case 6:
                            return 7;
                        case 7:
                            return 8;
                        case 8:
                            return 9;
                        case 9:
                            return 10;
                        case 10:
                        case 20:
                            return 11;
                        default:
                            return 11;
                    }`,
            unit: 'mètres'
        }
    }
]
