export default [
    {
        "id": "creationMajeureDacide",
        "name": "Création majeure d'acide",
        "description": "Crée 10 litres d'acide par arcane de l’élémentaliste (Ne peut être utilisé comme attaque sur un ennemi).",
        "distance": {
            "text": "1 mètre"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Devant l’élémentaliste"
        },
        "resilience": {
            "text": "Double la quantité"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "elementaireMajeurDacide",
        "name": "Élémentaire majeur d'acide",
        "description": "L’élémentaliste invoque un élémentaire d'acide à partir d'une source d'acide (au moins 1l.). L'élémentaire majeur obéit à des ordres complexes et peut se battre pour défendre l'élémentaliste.\nPHY 8, DEX 6, INT 4, CHA 6, PER 5\nHP 80, Armure : 2, H2H : 10, Lancer/tir : 9\nAttaques :\nCombat à main nue = 14 de dégâts,\nProjectile d’acide: 2d6+2 (2 fois)",
        "distance": {
            "value": 2,
            "unit": "m"
        },
        "duration": {
            "text": "1 scène ou jusqu'à destruction"
        },
        "resilience": {
            "text": "Double les points de vie"
        },
        "damage": {
            "text": "Voir statistique de l’élémental"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    },
    {
        "id": "souffleDuFeroxide",
        "name": "Souffle du feroxide",
        "description": "L’élémentaliste crache un jet d’acide qui touche toute personne sur son trajet.",
        "distance": {
            "value": 20,
            "unit": "m"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 20,
            "unit": "m"
        },
        "resilience": {
            "text": "Aucun test de résilience possible"
        },
        "damage": {
            "rollFormula": "return '2d6+' + (4 * context.actorData.computedData.magic.arcaneLevel);",
            "element": "acid"
        },
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "actions": []
    }
]