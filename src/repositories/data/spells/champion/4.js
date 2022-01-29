export default [
    {
        "id": "antidote",
        "name": "Antidote",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Permets de contrer les potions négatives (comme celle de sommeil ou les venins d’animaux).",
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
            "text": "Contrer les potions"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "armeEnchantee",
        "name": "Arme enchantée",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Transforme les dégâts normaux d’une arme en dégâts magiques et permet ainsi de toucher les créatures qui requièrent ce type de dégâts pour les combattre. ex: fantôme, vampires, morts-vivants.\n\n\n\n",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "transforme les dégâts normaux en dégâts magiques"
        },
        "criticalSuccess": {
            "text": "Ajouté 6 de dégâts"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "guerison",
        "name": "Guérison",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Guérit un coéquipier de (4d6) points de vie. Le champion doit toucher la cible. Ne peut pas dépasser le maximum de points de vie de la cible. Ne s’applique pas au champion lui-même\n\n\n\n",
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
            "text": "Guérit 4d6 points de vie"
        },
        "criticalSuccess": {
            "text": "Guérit 24 points de vie"
        },
        "heal": {
            "rollFormula": "if (context.criticalSuccess) { return '24' } return '4d6';"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "protectionDautrui",
        "name": "Protection d’autrui",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Lancé sur un coéquipier, absorbe jusqu’à 10 points de dégâts. Le champion sait que le coéquipier a été attaqué si ce dernier est touché. Ce sort ne peut pas s’additionner à d’autres sorts de protections qui absorbent les dégâts. \n\n\n\n",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Quand les points ont été absorbés"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Absorbe jusqu’à 10 points de dégâts"
        },
        "criticalSuccess": {
            "text": "Absorbe jusqu’à 20 points de dégâts"
        },
        "dependsOnArcaneLevel": false,
        "actions": {
            "addEffect": {
                "name": "Ajouter l'effet",
                "type": "addEffect",
                "data": {
                    "duration": {
                        "text": "Quand les points ont été absorbés"
                    },
                    "effectName": "Protection d’autrui",
                    "magicArmor": {
                        "formula": "return context.criticalSuccess ? 20 : 10"
                    }
                }
            }
        }
    },
    {
        "id": "repulsionDesMortsVivants",
        "name": "Répulsion des morts-vivants",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Les morts-vivants ne peuvent pas rentrer dans la zone pendant 10 tours. Tous les morts-vivants déjà dans la zone sont éjectés violemment.",
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
            "value": 5,
            "unit": "m",
            "text": "5 mètres"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    }
]