export default [
    {
        "id": "marqueDeKegan",
        "name": "Marque de Kegan",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste applique le sceau magique sur une cible vivante. Permet à l’élémentaliste de tracer cette cible sur un rayon de 100 mètres par niveau d'arcane. Kegan usait de ce sort pour \"libérer\" un ork pour que celui-ci le guide vers le terrier et l'anéantir. ",
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
        }
    },
    {
        "id": "phosphene",
        "name": "Phosphène",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste fait apparaître rapidement une petite flamme qui rend une tête de la victime aveugle pour un (1) tour par arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "1 tour/arcane"
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
        }
    },
    {
        "id": "pluieDeLave",
        "name": "Pluie de lave",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Lorsque l’élémentaliste lance ce sort, le ciel se couvre de nuages orangés et des gouttelettes de lave tombent du ciel, brûlant gravement ceux dans la zone du sort.\n\n\n\n",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètre"
        },
        "bonus": {
            "text": "Possibilité d’endommager l’armure"
        },
        "resilience": {
            "text": "Divise les dégâts en 2"
        },
        "criticalSuccess": {
            "text": "Dégâts maximum"
        },
        "damage": {
            "rollFormula": "return '3d6';",
            "text": "3d6"
        }
    },
    {
        "id": "resistanceAuFeu",
        "name": "Résistance au feu",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
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
        }
    },
    {
        "id": "soufflerLaChandelle",
        "name": "Souffler la chandelle",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Avec ce sort l’élémentaliste peut éteindre tout feu brûlant dans un rayon d’un mètre par niveau d’arcane. Il n’y a pas de limite à la taille ou au nombre de feux s’ils sont complètement dans le rayon du sort. Le feu magique est immunisé contre ce sort.\n\n\n\n",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "1m par niveau d’arcane"
        },
        "bonus": {
            "text": "-2 sur perception si de nuit, double les dégâts de froid si en terrain froid."
        },
        "criticalSuccess": {
            "text": "Les feux dans la zone ne se rallument que si l’élémentaliste le souhaite"
        }
    }
]