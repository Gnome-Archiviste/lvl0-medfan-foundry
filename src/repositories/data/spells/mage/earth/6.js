export default [
    {
        "id": "armureDeFer",
        "name": "Armure de fer",
        "icon": "icons/equipment/chest/breastplate-banded-steel.webp",
        "description": "Permet d’absorber 25 points de dégâts. Le sort peut être fait sur l'élémentaliste ou un allié. L'élémentaliste doit toucher la cible. Ce sort ne peut pas s’additionner d’autres sorts de protections qui absorbent les dégâts. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Tant que les 25 points ne sont pas utilisés"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Absorbe 25 points de dégâts"
        },
        "criticalSuccess": {
            "text": "Absorbe 50 points de dégâts"
        },
        "dependsOnArcaneLevel": false,
        "actions": {
            "addEffect": {
                "name": "Ajouter l'effet",
                "type": "addEffect",
                "data": {
                    "duration": {
                        "text": "Tant que les 25 points ne sont pas utilisés"
                    },
                    "effectName": "Armure de fer",
                    "magicArmor": {
                        "formula": "return context.criticalSuccess ? 50 : 25"
                    }
                }
            }
        }
    },
    {
        "id": "chevalDePierre",
        "name": "Cheval de pierre",
        "icon": "icons/environment/creatures/horse-brown.webp",
        "description": "Créer un cheval puissant magique pour une (1) heure par arcane. Il est puissant, il peut tirer à lui seul un chariot contenant jusqu'à 6 personnes.",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
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
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "maledictionDeLacierBrulant",
        "name": "Malédiction de l’acier brûlant ",
        "icon": "icons/commodities/metal/barstock-heated-steel.webp",
        "description": "Un objet métallique à portée (comme une arme, un morceau d’armure, ou poigné de porte) devient chauffé au rouge. Toute créature touchant l’objet subit 2d6 blessures et échappe ou lâche l’objet. L’objet émet une faible lumière et peut mettre le feu à des objets inflammables.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "La cible est capable de conserver l’objet en main."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double les dégâts (pré-calculé)'; } return 'Double les dégâts';",
            "text": "Double les dégâts"
        },
        "damage": {
            "rollFormula": "if (context.criticalSuccess) { return '(' + ('2d6') + ')*2'; } return '2d6';",
            "text": "2d6"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "priseTellurique",
        "name": "Prise tellurique",
        "icon": "icons/magic/symbols/runes-star-pentagon-orange-purple.webp",
        "description": "L'élémentaliste crée une zone dans laquelle il peut regagner 3 points de mana par tour tant qu’il reste dans la zone sans être déconcentré. Ce sort est utilisable en combat mais si l’élémentaliste est touché (poussé ou blessé), il doit réussir un jet de concentration pour conserver son sort. L’élémentaliste peut faire le sort pour un autre magicien au niveau d’arcane 7.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "1 tour par arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "permet de regagner du mana"
        },
        "criticalSuccess": {
            "text": "diminue la durée à 5 minutes"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "fugueDuLapin",
        "name": "Fugue du lapin",
        "icon": "icons/creatures/mammals/rabbit-movement-glowing-green.webp",
        "description": "Imitant l’habileté naturelle des boggarts, ce sort permet à une cible de marcher dans la terre et la roche comme si elle marchait sur un sol solide. Le sort dure 10 tours.\n\n\n\n",
        "distance": {
            "text": "Soi-même"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 10",
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "Élémentaliste"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    }
]