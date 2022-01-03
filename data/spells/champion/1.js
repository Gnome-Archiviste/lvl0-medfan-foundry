export default [
    {
        "id": 'detectEvil',
        "name": 'Détection des mauvais',
        "icon": 'icons/magic/unholy/silhouette-evil-horned-giant.webp',
        "description": {
            "formula": `
                    let prefix = "<strong>L'effet dépend du niveau du champion.</strong>";
                    if (context.actorData.computedData.magic.arcaneLevel < 3)
                        return prefix + "Le champion ressent s’il y a présence d’au moins un être mauvais dans les environs (pâté de maisons) sans grandes précisions";
                    if (context.actorData.computedData.magic.arcaneLevel < 5)
                        return prefix + "Le champion peut déterminer le nombre d’êtres mauvais dans les environs";
                    return prefix + "Le champion voit une aura rougeâtre entourant les créatures mauvaises. Plus une créature est mauvaise et puissante, plus l’aura est brillante.";
                `
        },
        "distance": {
            "type": 'self'
        },
        "duration": {
            "text": 'Une scène'
        },
        "criticalSuccess": {
            "formula": `
                        if (context.criticalSuccess)
                            return 'Double le rayon (pré-calculé)';
                        return 'Double le rayon';`
        },
        "area": {
            "formula": `
                        if (context.criticalSuccess)
                            return 20;
                        return 10;
                    `,
            "unit": 'm'
        }
    },
    {
        "id": 'detectUndead',
        "name": 'Détection des morts-vivants',
        "icon": 'icons/magic/death/hand-undead-skeleton-fire-pink.webp',
        "description": {
            "formula": `
                    let prefix = "<strong>L'effet dépend du niveau du champion.</strong>";
                    if (context.actorData.computedData.magic.arcaneLevel < 3)
                        return prefix + "Le champion ressent s’il y a présence d’au moins un mort-vivant dans les environs (pâté de maisons) sans grandes précisions";
                    if (context.actorData.computedData.magic.arcaneLevel < 5)
                        return prefix + "Le champion peut déterminer le nombre de morts-vivants dans les environs";
                    return prefix + "Le champion voit une aura mauve entourant les morts-vivants. Plus un mort-vivant est puissant, plus l’aura est brillante.";
                `
        },
        "distance": {
            "type": 'self'
        },
        "duration": {
            "text": 'Une scène'
        },
        "criticalSuccess": {
            "text": 'Double le rayon'
        },
        "area": {
            "value": 10,
            "unit": 'm'
        }
    },
    {
        "id": 'plonk',
        "name": 'Plonk',
        "icon": 'icons/magic/light/projectile-halo-teal.webp',
        "description": 'En visant avec le doigt, le champion envoie un petit projectile magique qui passe au travers de l’armure.',
        "distance": {
            "value": 10,
            "unit": 'm'
        },
        "damage": {
            "rollFormula": 'return "1d6/2"',
            "element": 'physic'
        },
        "bonus": {
            "text": 'L\'armure ne protège pas'
        },
        "duration": {
            "text": 'Instantané'
        },
        "criticalSuccess": {
            "text": 'La cible ne peut pas faire de test de résilience'
        },
        "resilience": {
            "text": 'Divise le dommage par deux (arrondi au supérieur)'
        },
        "area": {
            "text": 'Une cible'
        }
    },
    {
        "id": 'firstHeal',
        "name": 'Premiers soins',
        "icon": 'icons/magic/life/crosses-trio-red.webp',
        "description": 'Guérit un coéquipier de 1d6 points de vie. Ne s’applique pas au champion lui-même. Ne peut pas dépasser le maximum de points de vie.',
        "distance": {
            "type": 'touch'
        },
        "heal": {
            "rollFormula": 'return "1d6";'
        },
        "duration": {
            "text": 'Instantané'
        },
        "criticalSuccess": {
            "text": 'Guérit de 6 points de vie'
        },
        "area": {
            "text": 'Une cible'
        }
    },
    {
        "id": 'purifyFood',
        "name": 'Purification de nourriture et d’eau',
        "icon": 'icons/magic/symbols/cross-circle-blue.webp',
        "description": 'Purifie un repas ou une cruche d’eau par niveau d’arcane',
        "distance": {
            "type": 'touch'
        },
        "duration": {
            "text": 'Instantané'
        },
        "area": {
            "text": 'Un repas ou cruche'
        }
    }
]
