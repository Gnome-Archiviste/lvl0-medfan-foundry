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
        "icon": "icons/magic/symbols/runes-star-pentagon-orange-purple.webp",
        "description": "L'élémentaliste crée une zone dans laquelle plusieurs magiciens peuvent regagner 15 points de mana. Les magiciens doivent rester dans la zone pendant 10 minutes sans être déconcentré. Si l’élémentaliste est touché (poussé ou blessé), il doit réussir un jet de concentration pour conserver son sort.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "text": "10 minutes de jeu"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
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
        "description": "Un météore tombe sur la cible. Touche tout sur une zone de 7x7 mètres.",
        "distance": {
            "value": 60,
            "unit": "mètre",
            "text": "60 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 7,
            "height": 7,
            "text": "7x7 mètres",
            "comment": ""
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
        "icon": "icons/magic/earth/strike-body-stone-crumble.webp",
        "description": "",
        "area": {
            "text": "Une cible"
        },
        "dependsOnArcaneLevel": false
    }
]