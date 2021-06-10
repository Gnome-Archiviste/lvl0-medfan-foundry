export default {
    mage: {
        1: [
            {
                id: 'alarm',
                name: 'Alarme',
                description: `Protège une zone ou une pièce d’un système d’alarme magique. Lorsque quelque chose (qui n'était pas là lors du lancer du sort) entre dans la zone, on entend le son d’une cloche. A partir d’arcane 5, l’alarme peut être mental. Elle est entendue dans la tête du magicien et les personnes présentes durant le lancer du sort. `,
                distance: {
                    type: 'touch'
                },
                duration: {
                    formula: 'return 2 * context.actorData.level.value',
                    unit: 'h'
                },
                criticalSuccess: {
                    text: 'Double la durée'
                },
                area: {
                    value: 10,
                    unit: 'm'
                }
            },
            {
                id: 'fog',
                name: 'Brume',
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
            },
            {
                id: 'fireSlap',
                name: 'Gifle enflammée',
                description: `Avec ce sort, le magicien peut frapper à distance. Une fine feuille de flammes jaillit de la main du magicien, frappant une créature jusqu’à 5 mètres du magicien et lui fait 1d6 dommage de feu.`,
                distance: {
                    value: 5,
                    unit: 'mètres'
                },
                damage: {
                    rollFormula: '1d6',
                    element: 'fire'
                },
                duration: {
                    text: 'Instantané'
                },
                criticalSuccess: {
                    text: 'La cible ne peut pas faire de test de résilience.'
                },
                resilience: {
                    text: 'Divise le dommage par deux (arrondi au supérieur)'
                },
                area: {
                    text: 'Une cible'
                }
            }
        ]
    },
    champion: {

    }
}
