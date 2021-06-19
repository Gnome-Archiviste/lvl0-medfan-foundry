export default {
    mage: {
        1: [
            {
                id: 'alarm',
                name: 'Alarme',
                icon: 'icons/magic/sonic/bell-alarm-red-purple.webp',
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
                id: 'fireSlap',
                name: 'Gifle enflammée',
                icon: 'icons/magic/fire/beam-strike-whip-red.webp',
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
            },
            {
                id: 'light',
                name: 'Lumière',
                icon: 'icons/magic/light/orb-lightbulb-gray.webp',
                description: {
                    formula: `
                        let message = "Fait apparaître une boule de lumière pour éclairer une pièce ou un corridor. La lumière est fixe."
                        if (context.actorData.computedData.magic.arcaneLevel) {
                            message += "<br>La boule de lumière peut suivre le magicien pour 2 points de magie additionnels.";
                        }
                        return message;
                    `
                },
                distance: {
                    value: 2,
                    unit: 'mètres'
                },
                duration: {
                    formula: `return (context.criticalSuccess ? 2 : 1) * context.actorData.computedData.magic.arcaneLevel`,
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
                    unit: 'mètres'
                }
            },
        ]
    },
    champion: {
        1: [
            {
                id: 'detectEvil',
                name: 'Détection des mauvais',
                icon: 'icons/magic/unholy/silhouette-evil-horned-giant.webp',
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
                icon: 'icons/magic/death/hand-undead-%20skeleton-fire-pink.webp',
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
                icon: 'icons/magic/light/projectile-halo-teal.webp',
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
                icon: 'icons/magic/life/crosses-trio-red.webp',
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
                icon: 'icons/magic/symbols/cross-circle-blue.webp',
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
                icon: 'icons/magic/unholy/barrier-fire-pink.webp',
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
                icon: 'icons/magic/perception/eye-slit-orange.webp',
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
                actions: {
                    addEffect: {
                        name: `Ajouter l'effet`,
                        type: 'addEffect',
                        data: {
                            duration: {
                                formula: `return context.actorData.computedData.magic.arcaneLevel`,
                                unit: 'tours'
                            },
                            effectName: 'Aveuglement',
                            modifiers: [
                                {
                                    stat: 'per',
                                    value: -3
                                },
                                {
                                    skill: 'combat.dodge',
                                    value: -3
                                },
                                {
                                    skill: 'combat.melee_combat',
                                    value: -3
                                },
                                {
                                    skill: 'combat.throw_shoot',
                                    value: -3
                                },
                                {
                                    skill: 'champion.shield_attack',
                                    value: -3
                                },
                                {
                                    skill: 'warrior.charge',
                                    value: -3
                                },
                                {
                                    skill: 'warrior.two_handed_combat',
                                    value: -3
                                },
                                {
                                    skill: 'combat.hand_combat',
                                    value: -3
                                }
                            ]
                        }
                    }
                }
            },
            {
                id: 'babelfish',
                name: 'Babelfish',
                icon: 'icons/magic/symbols/question-stone-yellow.webp',
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
                icon: 'icons/equipment/hand/glove-ring-leather-green.webp',
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
                icon: 'icons/consumables/food/bowl-stew-brown.webp',
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
        ],
        3: [
            {
                id: 'preserveDead',
                name: 'Conservation du cadavre',
                icon: 'icons/magic/life/cross-embers-glow-yellow-purple.webp',
                description: {
                    formula: `return "Ce sort a deux effets."
                        + "<ul>"
                        + "<li>Le champion préserve le cadavre ciblé afin qu’il ne se décompose pas, pendant " + ((context.criticalSuccess ? 2 : 1) * context.actorData.computedData.magic.arcaneLevel * 3) + " jours. Ce sort prolonge le temps pour ressusciter la créature touchée d’entre les morts. Le sort fonctionne sur les parties du corps coupées et autres.</li>"
                        + "<li>Le sort empêche le cadavre ciblé d’être animé par un sort d’animation des morts.</li>"
                        + "</ul>Le sort se termine lorsque le cadavre est ressuscité des morts ou arrive au bout de sa durée."`
                },
                distance: {
                    value: 1,
                    unit: 'm'
                },
                duration: {
                    formula: `return (context.criticalSuccess ? 2 : 1) * context.actorData.computedData.magic.arcaneLevel * 3`,
                    unit: 'jours'
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
                id: 'detectLies',
                name: 'Détection des mensonges',
                icon: 'icons/creatures/abilities/mouth-teeth-crooked-blue.webp',
                description: 'À chaque tour, le champion peut se concentrer sur un sujet à portée et saura instantanément si le sujet ment délibérément.<br>Le sort ne révèle pas la vérité, ne découvre pas les inexactitudes involontaires, ni ne révèle Les évasions. À chaque tour, le personnage peut se concentrer sur un sujet différent.',
                distance: {
                    value: 5,
                    unit: 'm'
                },
                duration: {
                    text: `une scène`
                },
                area: {
                    text: 'Une cible'
                },
                criticalSuccess: {
                    text: 'Permet de savoir si la cible, sans vraiment mentir, évite de réellement répondre à la question'
                }
            },
            {
                id: 'healBlindness',
                name: 'Guérison de l’aveuglement',
                icon: 'icons/creatures/eyes/slime-single-red.webp',
                description: `Ce sort guérit la cécité, qu'elle soit d'origine naturelle ou magique chez une cible. Le sort ne restaure pas les yeux perdus, mais il les répare s'ils sont endommagés.`,
                distance: {
                    type: 'touch'
                },
                bonus: {
                    text: `Annule un aveuglement`
                },
                duration: {
                    text: `Instantané`
                },
                area: {
                    text: 'Une cible'
                }
            },
            {
                id: 'healDeafness',
                name: 'Guérison de la surdité',
                icon: 'icons/magic/life/cross-yellow-green.webp',
                description: `Ce sort guérit la surdité, qu'elle soit d'origine naturelle ou magique chez une cible. Le sort ne restaure pas les oreilles perdues, mais il les répare s'ils sont endommagés.`,
                distance: {
                    type: 'touch'
                },
                bonus: {
                    text: `Annule la surdité`
                },
                duration: {
                    text: `Instantané`
                },
                area: {
                    text: 'Une cible'
                }
            },
            {
                id: 'combatPrecognition',
                name: 'Précognition de combat',
                icon: 'icons/magic/time/clock-spinning-gold-pink.webp',
                description: `La cible gagne une prémonition contre les attaques imminentes et peut y répondre un peu plus rapidement que d'habitude, donnant un bonus de 1 à vos points d’armure. Elle prévoit aussi les défenses et les esquives de son adversaire, ce qui donne un bonus de + I aux dommages.`,
                distance: {
                    type: 'touch'
                },
                bonus: {
                    text: `+1 armure, + 1 dommage`
                },
                duration: {
                    value: 1,
                    unit: 'scène'
                },
                area: {
                    text: 'Une cible'
                },
                criticalSuccess: {
                    text: 'Succès remarquable : +2 armures, + 2 dommages'
                },
                actions: {
                    addEffect: {
                        name: `Ajouter l'effet`,
                        type: 'addEffect',
                        data: {
                            duration: {
                                value: 1,
                                unit: 'scène'
                            },
                            effectName: 'Précognition de combat',
                            modifiers: [
                                {
                                    stat: 'damage',
                                    valueFormula: `return (context.criticalSuccess ? 2 : 1);`
                                },
                                {
                                    stat: 'protection',
                                    valueFormula: `return (context.criticalSuccess ? 2 : 1);`
                                }
                            ]
                        }
                    }
                }
            }
        ]
    }
}
