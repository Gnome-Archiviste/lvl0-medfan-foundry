export default [
    {
        "id": "creationMajeurDeTerre",
        "name": "Création majeur de terre",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Créer 10 m² de terre fertile dans n’importe quel terrain, par arcane de l'élémentaliste.",
        "distance": {
            "value": 1,
            "unit": "m",
            "text": "1 mètre"
        },
        "duration": {
            "text": "Instantanée"
        },
        "area": {
            "text": "Devant l’élémentaliste"
        },
        "criticalSuccess": {
            "text": "Créer 20 m² de terre par arcane de l'élémentaliste."
        }
    },
    {
        "id": "elementaireMajeurDePierre",
        "name": "Élémentaire majeur de pierre",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L'élémentaliste invoque un petit élémentaire de pierre  pierre à partir d'une source de terre ( au moins 2 m² ). L'élémentaire majeur obéit à des ordres complexes et peut se battre pour défendre l'élémentaliste. \nPHY 9, DEX 5, INT 4, CHA 6, PER 5\nHP 80, Armure : 2, H2H : 11, Lancer/tir : 8\nAttaques : H2H = 11 de dégâts, secousse: 3d6+2 (rayon 3 m.), ennemis projeté au sol",
        "distance": {
            "value": 2,
            "unit": "m",
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
        "id": "passeMuraille",
        "name": "Passe-muraille",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "La cible peut traverser les parois solides pendant 15 tours. L'élémentaliste doit toucher la cible.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 15",
            "value": 15,
            "unit": "tours",
            "text": "15 tours"
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