export default [
    {
        "id": "detectEvil",
        "name": "Détection des mauvais",
        "icon": "icons/magic/unholy/silhouette-evil-horned-giant.webp",
        "description": "* À l’arcane un (1) le champion ressent s’il y a présence d’au moins un être mauvais dans les environs (pâté de maisons) sans grandes précisions.\n\n* À l’arcane trois (3) le champion peut déterminer le nombre d’êtres mauvais dans les environs. \n\n* À l’arcane cinq (5) le champion voit une aura rougeâtre entourant les créatures mauvaises. Plus une créature est mauvaise et puissante, plus l’aura est brillante.",
        "distance": {
            "type": "self",
            "text": "Champion"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "value": 10,
            "unit": "m",
            "text": "10 mètres"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double le rayon du sort (pré-calculé)'; } return 'Double le rayon du sort';",
            "text": "Double le rayon du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "detectUndead",
        "name": "Détection des morts-vivants",
        "icon": "icons/magic/death/hand-undead-skeleton-fire-pink.webp",
        "description": "* À l’arcane un (1) le champion ressent s’il y a présence d’au moins un mort-vivant dans les environs (pâté de maisons) sans grandes précisions.\n\n* À l’arcane trois (3), le champion peut déterminer le nombre de morts-vivants dans les environs. \n\n* À l’arcane cinq (5) le champion voit une aura mauve entourant les morts-vivants. Plus un mort-vivant est puissant, plus son aura est brillante.",
        "distance": {
            "type": "self",
            "text": "Champion"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "value": 10,
            "unit": "m",
            "text": "10 mètres"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double le rayon du sort (pré-calculé)'; } return 'Double le rayon du sort';",
            "text": "Double le rayon du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "plonk",
        "name": "Plonk",
        "icon": "icons/magic/light/projectile-halo-teal.webp",
        "description": "En visant avec le doigt, le champion envoie un petit projectile magique qui passe au travers de l’armure.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Armure ne protège pas"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '1d6/2';",
            "text": "1d6/2"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "firstHeal",
        "name": "Premiers soins",
        "icon": "icons/magic/life/crosses-trio-red.webp",
        "description": "Guérit un coéquipier de 1d6 points de vie. Ne s’applique pas au champion lui-même. Ne peut pas dépasser le maximum de points de vie.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Guérit 1d6 points de vie"
        },
        "criticalSuccess": {
            "text": "Guérit de 6 points de vie"
        },
        "heal": {
            "rollFormula": "return '1d6';"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "purifyFood",
        "name": "Purification de nourriture et d’eau",
        "icon": "icons/magic/symbols/cross-circle-blue.webp",
        "description": "Purifie un repas ou une cruche d’eau par niveau d’arcane.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Un repas ou cruche"
        },
        "dependsOnArcaneLevel": false
    }
]