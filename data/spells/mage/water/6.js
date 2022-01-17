export default [
    {
        "id": "armureDeGlace",
        "name": "Armure de glace",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permet d’absorber 20 points de dégâts. Le sort peut être fait sur l'élémentaliste ou un allié. L'élémentaliste doit toucher la cible. Le sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Tant que les 20 points ne sont pas utilisés"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Absorbe 20 points de dégâts"
        },
        "criticalSuccess": {
            "text": "Absorbe 40 points de dégâts"
        }
    },
    {
        "id": "formeLiquide",
        "name": "Forme liquide",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Une créature touchée et tout son équipement deviennent liquide, apparaissant comme un élémentaire d’eau. Dans cet état, le personnage ne peut pas être touché ou interagit physiquement, devenant immunisé contre toute attaque qui n’est pas de nature magique. Le personnage se déplace à 3 mètres par tour sauf dans l’eau où son déplacement normal est doublé. Dans l’eau la cible devient effectivement invisible, puisqu'il est impossible de la différencier du reste de l’environnement. Le personnage peut également passer à travers de petits trous ou des ouvertures étroites, même de simples fissures, avec tout ce qu’il portait ou tenait, tant que le sort persiste. Par contre, il ne peut pas attaquer physiquement ou affecter les autres, ne peut pas lancer de sorts autres que ceux d’eau, et ne peut pas du feu ou autre matière solide. Cela affecte une créature consentante.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "geyser",
        "name": "Geyser",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L'élémentaliste fait jaillir du sol un puissant jet d'eau chaude de 3 mètres + 3 mètres/arcane de haut.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "resilience": {
            "text": "Divise les dégâts en deux"
        },
        "criticalSuccess": {
            "text": "Double les dégâts."
        },
        "damage": {
            "rollFormula": "return '3d6+' + (1 * context.arcaneLevel);",
            "text": "3d6 + (1 par niveau d’arcane)"
        }
    },
    {
        "id": "hypothermie",
        "name": "Hypothermie",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Enveloppe un ennemi d’une brume qui le glace jusqu’aux os, ce qui l’empêche de se concentrer sur ses attaques tellement il grelotte.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "rollFormula": "return '1d6'",
            "unit": "tours",
            "text": "1d6 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "-1 en attaque, -2 en perceptions"
        },
        "resilience": {
            "text": "Annule les malus seulement"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience possible."
        },
        "damage": {
            "text": "1d6/tour"
        }
    },
    {
        "id": "nessy",
        "name": "Nessy",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Appelle une créature marine mythique comme destrier aquatique pour traverser une étendue d'eau.\n\n\n\n",
        "distance": {
            "text": "1 mètre dans une étendue d’eau"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    }
]
