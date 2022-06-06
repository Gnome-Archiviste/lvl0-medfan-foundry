export default [
    {
        "id": "cornetDeFroid",
        "name": "Cornet de froid",
        "icon": "icons/magic/water/projectile-icecicle.webp",
        "description": "Un cône de froid extrême jaillit de la main de  l'élémentaliste, affectant jusqu’à trois (3) victimes dans une zone de 10 mètres de large et jusqu’à 10 mètres de long en avant de l'élémentaliste, causant 3d6 points de dégâts et les figent sur place.",
        "distance": {
            "text": "Devant l’élémentaliste"
        },
        "duration": {
            "value": 2,
            "unit": "tours",
            "text": "2 tours"
        },
        "area": {
            "text": "11x11 mètres Trois cibles qui sont dans la zone"
        },
        "bonus": {
            "text": "Victimes immobiliser"
        },
        "resilience": {
            "text": "Victimes non immobiliser"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '3d6';",
            "element": "water",
            "text": "3d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "elementaireMineurDeGlace",
        "name": "Élémentaire mineur de glace",
        "icon": "icons/magic/water/elemental-water.webp",
        "description": "L’élémentaliste invoque un petit élémentaire de glace à partir d'une source d'eau (au moins 1 litre). L'élémentaire mineur obéit à des ordres simples et peut même se battre mais ne possède pas beaucoup de points de vie. \n\nPHY 4, DEX 5, INT 3, CHA 3, PER 5\n\nHP 25, H2H : 6, Attaque : 3 de dégâts, Lance de glace = 1d6+1",
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
        "id": "mineMarineMineure",
        "name": "Mine marine mineure",
        "icon": "icons/magic/water/orb-water-bubbles.webp",
        "description": "L'élémentaliste crée une grosse bulle d'eau qui finit par exploser.\n\n\n\n",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Recul de 3 mètres"
        },
        "damage": {
            "rollFormula": "return '2d6';",
            "text": "2d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "purification",
        "name": "Purification",
        "icon": "icons/magic/water/water-hand.webp",
        "description": "L'élémentaliste purifie un peu d'eau que la cible boit. Permets de contrer les potions négatives (comme celle de sommeil).\n\n\n\n",
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
            "text": "Contrer les potions négative"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "resistanceAuFroid",
        "name": "Résistance au froid",
        "icon": "icons/magic/defensive/shield-barrier-glowing-triangle-blue.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre le froid. Le sort réduit de moitié le dommage produit par le froid, que la source des dégâts soit naturelle ou magique. L'élémentaliste doit toucher la cible. ",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "1 scène (une journée pour le froid ordinaire)"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Divise par deux les dégâts causés par le froid"
        },
        "criticalSuccess": {
            "text": "La cible est immunisée au froid."
        },
        "dependsOnArcaneLevel": false
    }
]