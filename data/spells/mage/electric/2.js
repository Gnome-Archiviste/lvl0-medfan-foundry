export default [
    {
        "id": "lightning",
        "name": "Éclair",
        "icon": "icons/magic/lightning/bolt-strike-blue.webp",
        "description": "Un éclair vient frapper la victime désignée par l'élémentaliste en provenance de la main de l’élémentaliste.",
        "distance": {
            "text": "8 m + 1 m par arcane"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '1d6+2';",
            "element": "electric",
            "text": "1d6 + 2"
        }
    },
    {
        "id": "dashaWhispering",
        "name": "Murmure de Dasha",
        "icon": "icons/svg/silenced.svg",
        "description": "Conversation chuchotée à distance. Il faut pouvoir voir la cible.",
        "distance": {
            "text": "5 mètres + 1 mètre par niveau."
        },
        "duration": {
            "text": "1 tour/arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "etherealSkates",
        "name": "Patin d’éther",
        "icon": "Patin d’éther",
        "description": "Permet à la cible de se déplacer sans faire de bruit.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.actorData.computedData.magic.arcaneLevel",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Déplacement sans bruit"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        }
    },
    {
        "id": "jump",
        "name": "Porté par le vent",
        "icon": "icons/svg/up.svg",
        "description": "Ce sort permet au personnage qui en bénéficie de faire des sauts équivalent à son déplacement complet vers l’avant (ou en hauteur); ou l’équivalent à la moitié de son déplacement complet s’il saute vers l’arrière. \nSi ce sort est utilisé avec la spécialité Déplacement véloce, le saut est de 2 fois le déplacement complet. ",
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
            "text": "Permet de sauter sur la distance d’un déplacement complet"
        },
        "criticalSuccess": {
            "text": "Bon pour 3 tours"
        }
    },
    {
        "id": "WindInTheSails",
        "name": "Vent dans les voiles",
        "icon": "icons/magic/air/wind-weather-sailing-ship.webp",
        "description": "Le sort permet d’avoir un vent favorable lors des déplacements sur les eaux ou sur les routes. Le déplacement en bateau se verra deux fois plus rapide, et celui sur les routes, il aidera les aventuriers à avancer de 50% plus rapidement. ",
        "distance": {
            "type": "self",
            "text": "Élémentaliste"
        },
        "duration": {
            "text": "1h par niveau d’arcane"
        },
        "area": {
            "value": 5,
            "unit": "m",
            "text": "5 mètres"
        },
        "bonus": {
            "text": "Déplacement 2x en bateau, 1.5x sur les routes"
        },
        "criticalSuccess": {
            "text": "Déplacement 2.5x en bateau et 2x sur les routes"
        }
    }
]