export default [
    {
        "id": "nuageMeurtrier",
        "name": "Nuage meurtrier",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Un brouillard corrosif vert-jaunâtre jaillit du point désigné par le lanceur et affecte une zone d’un rayon de 6 mètres. En plus de devoir faire un jet d'Observer pour trouver un adversaire, les créatures prisent dans la zone du nuage subissent 12d6 de dégâts d’acide à chaque tour dans le nuage. \n\nLe nuage s’éloigne de l’élémentaliste à 4 mètres par tour, dans la direction que celui-ci décide. Parce que les vapeurs sont plus lourdes que l’air, elles roulent le long de la surface du sol et coulent au niveau le plus bas de la terre, lui permettant même de se glisser dans les ouvertures, telles que sous les portes.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 15,
            "unit": "tours",
            "text": "15 tours"
        },
        "area": {
            "value": 6,
            "unit": "m",
            "text": "6 mètres"
        },
        "resilience": {
            "text": "Divise les dégâts en 2"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '12d6';",
            "element": "acid",
            "text": "12d6"
        }
    },
    {
        "id": "tempeteDacide",
        "name": "Tempête d’acide",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Diminue la perception de moitié à cause des gouttelettes fouettant le visage et fait du dommage à tous les tours et à tous ceux qui sont dans la zone de la tempête, alliés comme ennemis. Le déplacement est divisé par deux à cause des vents puissants.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "value": 10,
            "unit": "m",
            "text": "10 mètres"
        },
        "bonus": {
            "text": "Déplacement et perception divisé par deux."
        },
        "resilience": {
            "text": "Divise le dommage par deux. Faire a chaque tour qu’une personne est dans le blizzard"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "element": "acid",
            "text": "4d6 par tour"
        }
    }
]