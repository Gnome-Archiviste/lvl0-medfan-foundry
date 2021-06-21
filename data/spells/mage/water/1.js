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
    },
    {
        id: 'waterCreation',
        name: 'Création mineure d\'eau',
        icon: 'icons/magic/water/water-hand.webp',
        description: `Ce sort génère une eau saine et potable. L’eau doit être créée dans une zone aussi petite qu’elle contiendra réellement le liquide. L’élémentaliste peut créer 1 litre d’eau par niveau d’arcane.`,
        distance: {
            value: 1,
            unit: 'm'
        },
        duration: {
            text: 'Instantané'
        },
        criticalSuccess: {
            text: 'Double la quantité'
        },
        area: {
            text: `Devant l’élémentaliste`
        }
    },
    {
        id: 'iceHand',
        name: 'Main de glace',
        icon: 'icons/magic/water/snowflake-ice-snow-white.webp',
        description: `Enveloppe la main du magicien d’une aura glacée. Fait du dégât et immobilise la victime pendant deux (2) tours. Le magicien doit toucher sa victime.`,
        distance: {
            type: 'touch'
        },
        damage: {
            rollFormula: 'return "1d6-2";',
            element: 'ice'
        },
        duration: {
            value: 2,
            unit: 'tours'
        },
        criticalSuccess: {
            text: 'La cible ne peut pas faire de test de résilience.'
        },
        resilience: {
            text: 'Victime non-immobilisée'
        },
        area: {
            text: 'Une cible'
        }
    },
    {
        id: 'splash',
        name: 'Splash',
        icon: 'icons/magic/water/wave-water-blue.webp',
        description: `En mettant une petite quantité d'eau dans ses mains et en les joignant, l'élémentaliste crée un projectile sous la forme d'un jet d'eau.`,
        distance: {
            value: 10,
            unit: 'm'
        },
        damage: {
            rollFormula: `
                if (context.criticalSuccess) {
                    return "(1d6-2)*2";
                }
                return "1d6-2";`,
            element: 'ice'
        },
        duration: {
            text: 'Instantané'
        },
        criticalSuccess: {
            text: 'Double les dégâts'
        },
        resilience: {
            text: 'Annule les dégâts'
        },
        area: {
            text: 'Une cible'
        }
    },
    {
        id: 'ice',
        name: 'Verglas',
        icon: 'icons/magic/water/snowflake-ice-purple.webp',
        description: `Rends le sol, sous la cible, glissant, la faisant tomber. La cible doit faire un jet d'habilité gymnastique pour se relever. Si la cible décide de rester au sol, elle pourra faire certaines actions comme lancer un sort ou utiliser une arme de jet après avoir perdu un tour.`,
        distance: {
            value: 5,
            unit: 'm'
        },
        bonus: {
            text: `Victime immobilisée`
        },
        duration: {
            text: '1 tour + réussite du test d\'habileté'
        },
        criticalSuccess: {
            text: 'La cible ne peut pas faire de test de résilience.'
        },
        resilience: {
            text: 'Le sort ne fonctionne pas'
        },
        area: {
            text: 'Une cible'
        }
    }

]
