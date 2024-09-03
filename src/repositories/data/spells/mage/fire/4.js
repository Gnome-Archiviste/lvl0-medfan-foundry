export default [
    {
        "id": "marqueDeKegan",
        "name": "Marque de Kegan",
        "icon": "icons/magic/symbols/rune-sigil-black-pink.webp",
        "description": "L’élémentaliste applique le sceau magique sur une cible vivante. Permet à l’élémentaliste de tracer cette cible a une distance de 100 mètres par niveau d'arcane. Kegan usait de ce sort pour \"libérer\" un ork pour que celui-ci le guide vers son terrier et l'anéantir. ",
        "distance": {
            "text": "toucher"
        },
        "duration": {
            "text": "???"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Permet de suivre une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "phosphene",
        "name": "Phosphène",
        "icon": "icons/magic/fire/flame-burning-embers-yellow.webp",
        "description": "L’élémentaliste fait apparaître rapidement une petite flamme qui rend une tête de la victime aveugle pour un (1) tour par arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
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
        "bonus": {
            "text": "-3 perception et toutes habilités de combats."
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "pluieDeLave",
        "name": "Pluie de lave",
        "icon": "icons/magic/fire/projectile-beams-salvo-red.webp",
        "description": "Lorsque l’élémentaliste lance ce sort, le ciel se couvre de nuages orangés et des gouttelettes de lave tombent du ciel, brûlant gravement ceux dans la zone du sort.\n\n\n\n",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "width": 11,
            "height": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Possibilité d’endommager l’armure (sur un succès remarquable)"
        },
        "resilience": {
            "text": "Divise les dégâts en 2"
        },
        "criticalSuccess": {
            "text": "L’armure des victimes ne fait plus que la moitié de la protection."
        },
        "damage": {
            "rollFormula": "return '2d6';",
            "text": "2d6 par tour"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "resistanceAuFeu",
        "name": "Résistance au feu",
        "icon": "icons/magic/defensive/shield-barrier-glowing-triangle-red.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection partielle contre le feu. Le sort réduit de moitié le dommage produit par le feu, que la source des dégâts soit naturelle ou magique. Le magicien doit toucher la cible.",
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
            "text": "Divise par deux (arrondis vers le bas) les dégâts causés par le feu"
        },
        "criticalSuccess": {
            "text": "La cible est immunisée au feu"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "soufflerLaChandelle",
        "name": "Souffler la chandelle",
        "icon": "icons/magic/fire/flame-burning-campfire-smoke.webp",
        "description": "Avec ce sort l’élémentaliste peut éteindre tout feu brûlant dans une zone d’un mètre plus deux mètres d’un mètre par niveau d’arcane. Il n’y a pas de limite à la taille ou au nombre de feux s’ils sont complètement dans la zone du sort. Le feu magique est immunisé contre ce sort.\n\n\n\n",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "(1 + 2 par niveau d’arcane)x(1 + 2 par niveau d’arcane)"
        },
        "bonus": {
            "text": "-2 sur perception si de nuit, double les dégâts de froid si en terrain froid."
        },
        "criticalSuccess": {
            "text": "Les feux dans la zone ne se rallument que si l’élémentaliste le souhaite"
        },
        "dependsOnArcaneLevel": false
    }
]