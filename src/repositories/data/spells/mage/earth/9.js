export default [
    {
        "id": "depetrification",
        "name": "Dépétrification",
        "icon": "icons/magic/earth/strike-body-stone-crumble.webp",
        "description": "Par un touché magique qui prend quelques minutes (environs 10 tours), la dépétrification part de la zone touchée et se répand tranquillement sur le corps.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Dépétrification"
        },
        "criticalSuccess": {
            "text": "Instantané"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "nexusTellurique",
        "name": "Nexus tellurique",
        "icon": "",
        "description": "L'élémentaliste créé une zone dans laquelle plusieurs magiciens peuvent regagner 15 points de mana. Les magiciens doivent rester dans la zone pendant 10 minutes sans être déconcentré. Si l’élémentaliste est touché (poussé ou blessé), il doit réussir un jet de concentration pour conserver son sort.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "10 minutes de jeu"
        },
        "area": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "bonus": {
            "text": "permet de regagner du mana"
        },
        "criticalSuccess": {
            "text": "diminue la durée à 5 minutes"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "partoutatis",
        "name": "Partoutatis",
        "icon": "icons/magic/earth/projectile-orb-asteroid-yellow.webp",
        "description": "Un météore tombe sur la cible. Touche tout sur un 5 mètre de rayon.",
        "distance": {
            "value": 60,
            "unit": "mètre",
            "text": "60 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "value": 5,
            "unit": "m",
            "text": "5 mètres"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '20d6+10';",
            "element": "physic",
            "text": "20d6 + 10"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "petrification",
        "name": "Pétrification",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "L’élémentaliste pétrifie une cible, c’est-à-dire qu’il la transforme en pierre. La cible ne peut reprendre vie qu’avec une potion de dépétrification, un sort de Dépétrification ou un sort du Baiser de la princesse.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "Jusqu’à dépétrification"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Pétrifie une cible"
        },
        "criticalSuccess": {
            "text": "Il faut absolument le sort  du Baiser de la princesse des Champions pour briser"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "leSortLaPotionOuLeSortDeDepetrificationNeFonctionnePas",
        "name": "        le sort. La potion ou le sort de Dépétrification ne fonctionne pas.",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Arcane 10\n\nMur de fer\n\nCe sort crée un mur de roche qui fusionne avec les surfaces rocheuses adjacentes. Le mur mesure 10 cm d’épaisseur par niveau d’arcane du magicien ainsi que jusqu’à 1 mètre de large par niveau d’arcane du magicien et jusqu’à 1 mètre de haut par niveau d’arcane du magicien. Le mur ne peut pas être évoqué de manière à occuper le même espace qu’une créature ou un autre objet.\n\n\n\n\n\nChaque zone d’un pied carré du mur a 30 points de vie par 10 cm d’épaisseur. Les créatures peuvent frapper le mur automatiquement, mais le mur est si dur que les 10 premiers points de dégâts de chaque coup sont ignorés. Une section de mur dont les points de vie tombent à 0 est fissurée. \n\n\n\n",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "Combat"
        },
        "area": {
            "text": "1 mètre de large/arcane"
        },
        "criticalSuccess": {
            "text": "Double la largeur"
        },
        "dependsOnArcaneLevel": false
    }
]