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
                    formula: `
                        if (context.criticalSuccess)
                            return 2 * 2 * context.actorData.level.value;
                        return 2 * context.actorData.level.value;
                    `,
                    unit: 'h'
                },
                criticalSuccess: {
                    formula: `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
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
                    rollFormula: 'return "1d6";',
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
        1: [
            {
                id: 'detectEvil',
                name: 'Détection des mauvais',
                description: {
                    formula: `
                    let prefix = "<strong>L'effet dépend du niveau du champion.</strong>";
                    if (context.actorData.computedData.magic.arcaneLevel < 3)
                        return prefix + "Le champion ressent s’il y a présence d’au moins un être mauvais dans les environs (pâté de maisons) sans grandes précisions";
                    if (context.actorData.computedData.magic.arcaneLevel < 5)
                        return prefix + "Le champion peut déterminer le nombre d’êtres mauvais dans les environs";
                    return prefix + "Le champion voit une aura rougeâtre entourant les créatures mauvaises. Plus une créature est mauvaise et puissante, plus l’aura est brillante.";
                `
                },
                distance: {
                    type: 'self'
                },
                duration: {
                    text: 'Une scène'
                },
                criticalSuccess: {
                    formula: `
                        if (context.criticalSuccess)
                            return 'Double le rayon (pré-calculé)';
                        return 'Double le rayon';`
                },
                area: {
                    formula: `
                        if (context.criticalSuccess)
                            return 20;
                        return 10;
                    `,
                    unit: 'm'
                }
            },
            {
                id: 'detectUndead',
                name: 'Détection des morts-vivants',
                description: {
                    formula: `
                    let prefix = "<strong>L'effet dépend du niveau du champion.</strong>";
                    if (context.actorData.computedData.magic.arcaneLevel < 3)
                        return prefix + "Le champion ressent s’il y a présence d’au moins un mort-vivant dans les environs (pâté de maisons) sans grandes précisions";
                    if (context.actorData.computedData.magic.arcaneLevel < 5)
                        return prefix + "Le champion peut déterminer le nombre de morts-vivants dans les environs";
                    return prefix + "Le champion voit une aura mauve entourant les morts-vivants. Plus un mort-vivant est puissant, plus l’aura est brillante.";
                `
                },
                distance: {
                    type: 'self'
                },
                duration: {
                    text: 'Une scène'
                },
                criticalSuccess: {
                    text: 'Double le rayon'
                },
                area: {
                    value: 10,
                    unit: 'm'
                }
            },
            {
                id: 'plonk',
                name: 'Plonk',
                description: 'En visant avec le doigt, le champion envoie un petit projectile magique qui passe au travers de l’armure.',
                distance: {
                    value: 10,
                    unit: 'm'
                },
                damage: {
                    rollFormula: 'return "1d6/2"',
                    element: 'physic'
                },
                bonus: {
                    text: 'L\'armure ne protège pas'
                },
                duration: {
                    text: 'Instantané'
                },
                criticalSuccess: {
                    text: 'La cible ne peut pas faire de test de résilience'
                },
                resilience: {
                    text: 'Divise le dommage par deux (arrondi au supérieur)'
                },
                area: {
                    text: 'Une cible'
                }
            },
            {
                id: 'firstHeal',
                name: 'Premiers soins',
                description: 'Guérit un coéquipier de 1d6 points de vie. Ne s’applique pas au champion lui-même. Ne peut pas dépasser le maximum de points de vie.',
                distance: {
                    type: 'touch'
                },
                heal: {
                    rollFormula: 'return "1d6";'
                },
                duration: {
                    text: 'Instantané'
                },
                criticalSuccess: {
                    text: 'Guérit de 6 points de vie'
                },
                area: {
                    text: 'Une cible'
                }
            },
            {
                id: 'purifyFood',
                name: 'Purification de nourriture et d’eau',
                description: 'Purifie un repas ou une cruche d’eau par niveau d’arcane',
                distance: {
                    type: 'touch'
                },
                duration: {
                    text: 'Instantané'
                },
                area: {
                    text: 'Un repas ou cruche'
                }
            }
        ],
        2: [
            {
                id: 'protectAuraEvil',
                name: 'Aura de protection contre le mal',
                description: 'Empêche les mauvaises créatures de pénétrer dans une zone de 5 mètres de rayon autour du champion. Attention, bien que l’aura ce fait à l’entour du champion, cette dernière ne se déplace pas.',
                distance: {
                    type: 'self'
                },
                duration: {
                    rollFormula: `
                        if (context.criticalSuccess)
                            return "(1d6+" + context.actorData.computedData.magic.arcaneLevel + ")*2";
                        return "1d6+" + context.actorData.computedData.magic.arcaneLevel;
                    `,
                    unit: 'tours'
                },
                area: {
                    value: 5,
                    unit: 'm'
                },
                criticalSuccess: {
                    formula: `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
                },
            },
            {
                id: 'blind',
                name: 'Aveuglement',
                description: {
                    formula: `return "Rends une tête de la victime aveugle pour <em>" + context.actorData.computedData.magic.arcaneLevel + "</em> tour(s)." 
                        + " La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.";`
                },
                distance: {
                    value: 20,
                    unit: 'm'
                },
                duration: {
                    formula: `return context.actorData.computedData.magic.arcaneLevel`,
                    unit: 'tours'
                },
                area: {
                    text: 'Une cible'
                },
                resilience: {
                    text: 'Le sort ne fonctionne pas'
                },
                criticalSuccess: {
                    text: 'La cible ne peut pas faire de test de résilience.'
                },
            },
            {
                id: 'babelfish',
                name: 'Babelfish',
                description: {
                    formula: 'return "Permets de comprendre toute langue des créatures pensantes pendant " + (context.criticalSuccess ? 14 : 7) + " tours."'
                },
                distance: {
                    type: 'self'
                },
                duration: {
                    formula: `
                        if (context.criticalSuccess)
                            return 14;
                        return 7;
                    `,
                    value: 7,
                    unit: 'tours'
                },
                area: {
                    text: 'Une cible'
                },
                criticalSuccess: {
                    formula: `
                        if (context.criticalSuccess)
                            return 'Double la durée (pré-calculé)';
                        return 'Double la durée';`
                },
            },
            {
                id: 'duel',
                name: 'Duel',
                description: 'Avec un gant, le champion frappe un adversaire au visage pour un point de dégât direct. Cependant, le champion devient la seule cible de l’adversaire jusqu’à la fin du combat. Les habiletés comme provocation, commandement, intimidation des autres personnages n\'affectent pas les l’adversaire sous le sort Duel.',
                distance: {
                    type: 'touch'
                },
                bonus: {
                    text: 'Armure ne protège pas'
                },
                damage: {
                    formula: '1'
                },
                resilience: {
                    text: 'Le sort ne fonctionne pas'
                },
                duration: {
                    text: 'Instantané',
                },
                area: {
                    text: 'Une cible'
                },
                criticalSuccess: {
                    text: 'La cible ne peut pas faire de test de résilience.'
                },
            },
            {
                id: 'heroMeal',
                name: 'Repas du héros',
                description: 'Fournit un repas pour un personnage et guérit de 1d6 points de vie. Le repas disparaît à la fin, et ne laisse aucun reste.',
                distance: {
                    value: 1,
                    unit: 'm'
                },
                bonus: {
                    text: 'Guérit 1d6 points de vie'
                },
                duration: {
                    text: 'Instantané',
                },
                area: {
                    text: 'Devant le Champion'
                },
                criticalSuccess: {
                    text: 'Guérit de 2d6 points de vie'
                },
            },
        ]
    }
}
