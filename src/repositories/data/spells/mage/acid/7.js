export default [
    {
        "id": "creationMajeureDacide",
        "name": "Création majeure d'acide",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Crée 10 litres d'acide par arcane de l’élémentaliste (Ne peut être utilisé comme attaque sur un ennemi).",
        "distance": {
            "value": 1,
            "unit": "mètre",
            "text": "1 mètre"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Devant l’élémentaliste"
        },
        "criticalSuccess": {
            "text": "Double la quantité"
        }
    },
    {
        "id": "elementaireMajeurDacide",
        "name": "Élémentaire majeur d'acide",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste invoque un élémentaire d'acide à partir d'une source d'acide (au moins 1l.). L'élémentaire majeur obéit à des ordres complexes et peut se battre pour défendre l'élémentaliste. \n\nPHY 8, DEX 6, INT 4, CHA 6, PER 5\n\nHP 80, Armure : 2, H2H : 10, Lancer/tir : 9\n\nAttaques : \n\nCombat à main nue = 14 de dégâts, \n\nProjectile d’acide: 2d6+2 (2 fois)",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "1 scène ou jusqu'à destruction"
        },
        "criticalSuccess": {
            "text": "Double les points de vie"
        },
        "damage": {
            "text": "Voir statistique de l’élémental"
        }
    },
    {
        "id": "souffleDuFeroxide",
        "name": "Souffle du feroxide",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste crache un jet d’acide qui touche toute personne sur son trajet.",
        "distance": {
            "text": "20 mètres de longs à partir de l’élémentaliste"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "1 mètre en avant sur 20 mètres de long"
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience possible"
        },
        "damage": {
            "rollFormula": "return '2d6+' + (4 * context.arcaneLevel);",
            "element": "acid",
            "text": "2d6 + (4 par niveau d’arcane)"
        }
    }
]
