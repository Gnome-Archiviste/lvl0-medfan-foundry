export default [
    {
        "id": "nuageMeurtrier",
        "name": "Nuage meurtrier",
        "icon": "icons/magic/air/fog-gas-smoke-dense-green.webp",
        "description": "Un brouillard corrosif vert-jaunâtre jaillit du point désigné par le lanceur du sort et affecte une zone d’une zone de 13x13 mètres. En plus de devoir faire un jet d'Observer pour trouver un adversaire, les créatures prisent dans la zone du nuage subissent 12d6 de dégâts d’acide à chaque tour dans le nuage. \n\nLe nuage s’éloigne de l’élémentaliste à 4 mètres par tour, dans la direction que celui-ci décide. Parce que les vapeurs sont plus lourdes que l’air, elles roulent le long de la surface du sol et coulent au niveau le plus bas de la terre, lui permettant même de se glisser dans les ouvertures, telles que sous les portes.",
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
            "width": 13,
            "height": 13,
            "text": "13x13 mètres",
            "comment": ""
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
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "tempeteDacide",
        "name": "Tempête d’acide",
        "icon": "icons/magic/acid/projectile-beams-salvo-green.webp",
        "description": "Diminue la perception de moitié à cause des gouttelettes acides faisant picoter les yeux et fait du dommage à tous les tours et à tous ceux qui sont dans la zone de la tempête, alliés comme ennemis. Le déplacement est divisé par deux à cause des vents puissants.",
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
            "width": 21,
            "height": 21,
            "text": "21x21 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Déplacement et perception divisé par deux."
        },
        "resilience": {
            "text": "Divise le dommage par deux. Faire a chaque tour qu’une personne est dans la tempête d’acide"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "element": "acid",
            "text": "4d6 par tour"
        },
        "dependsOnArcaneLevel": false
    }
]