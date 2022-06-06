export default [
    {
        "id": "creationMajeureDair",
        "name": "Création majeure d'air",
        "icon": "icons/magic/air/weather-wind-gust.webp",
        "description": "Créé 10 mètres cube d’air pure arcane de l’élémentaliste.",
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
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "elementaireMajeurDair",
        "name": "Élémentaire majeur d’air",
        "icon": "icons/creatures/magical/spirit-undead-ghost-blue.webp",
        "description": "L'élémentaliste invoque un élémentaire d’air, tant qu’il y a de l’air de disponible (donc il ne peut être créé sous l’eau, par exemple). L'élémentaire majeur obéit à des ordres complexes et peut se battre pour défendre l'élémentaliste. Attention, on ne peut avoir plus de deux invocations à la fois, sinon on perd le contrôle des créatures, qui attaqueront tous ceux qu’ils voient.\n\nPHY 8, DEX 7, INT 4, CHA 6, PER 4\n\nHP 80, Armure : 2, H2H : 10, Lancer/tir : 10\n\nAttaques : H2H = 10 de dégâts, jet d’air: 3d6+4 (Distance 5 m.), ennemis projeté à 10 mètres",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "1 scène ou jusqu'à destruction"
        },
        "area": {
            "text": "Aucune"
        },
        "criticalSuccess": {
            "text": "Double les points de vie"
        },
        "damage": {
            "text": "Voir statistique de l’élémental"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "passageAerien",
        "name": "Passage aérien",
        "icon": "icons/magic/air/weather-clouds.webp",
        "description": "Des marches similaires à des petits nuages apparaissent et peuvent être utilisées par des personnages. Peut servir de pont. Utilisable avec un destrier ou avec beaucoup de poids sur le personnages. 10 mètres par niveau. Disparaît quand les joueurs ont atteint leur destination, l'élémentaliste doit être le dernier du groupe.\n\n\n\n",
        "distance": {
            "text": "En avant de l'élémentaliste"
        },
        "duration": {
            "text": "Jusqu’à destination"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Passage dans les airs de 10 mètres par arcane"
        },
        "criticalSuccess": {
            "text": "Deux personnages peuvent passer de front"
        },
        "dependsOnArcaneLevel": false
    }
]