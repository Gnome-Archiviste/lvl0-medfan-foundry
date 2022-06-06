export default [
    {
        "id": "crisDeGuerre",
        "name": "Cris de guerre",
        "icon": "icons/magic/sonic/scream-wail-shout-teal.webp",
        "description": "La panique et la terreur traversent le cœur des créatures affectées par ce sort, les obligeant à fuir le champion le plus rapidement possible. Les créatures se recroquevillent dans une horreur abjecte si elles sont acculées, et si elles sont forcées d’affronter le champion, toute créature affectée subit une pénalité de -2 à tous les jets.",
        "distance": {
            "type": "self",
            "text": "Champion"
        },
        "duration": {
            "rollFormula": "return '1d6'",
            "unit": "tours",
            "text": "1d6 tours"
        },
        "area": {
            "width": 9,
            "height": 9,
            "text": "9x9 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Ne s’enfuit pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "enchantement",
        "name": "Enchantement",
        "icon": "icons/weapons/swords/sword-runed-glowing.webp",
        "description": "Ce sort permet d’enchanter une arme pour un combat. Ajoute +2 aux dégâts et les doubles 3 sont aussi considérés comme un succès exceptionnel. Besoin de permanence pour conserver l’effet.",
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
            "text": "+2 dégâts, double 3 = succès exceptionnel."
        },
        "criticalSuccess": {
            "text": "Dégâts +4"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "liberation",
        "name": "Libération ",
        "icon": "icons/magic/movement/trail-streak-pink.webp",
        "description": "Annule l’effet des sorts entravant les mouvements de leur victime ou toutes autres entraves magiques (sauf la pétrification).",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Une cible"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "ligneDeVie",
        "name": "Ligne de vie ",
        "icon": "icons/magic/life/crosses-trio-red.webp",
        "description": "Le champion est capable de soigner plusieurs de ses compagnons, et à distance. Une flux d’énergie rougeâtre s’échappe de la main du champion et va rejoindre jusqu’à 5 cibles afin de les soigner, leur redonnant 3d6 points de vie.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "De cible en cible"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "marcherSurLeau",
        "name": "Marcher sur l’eau",
        "icon": "icons/equipment/feet/shoes-leather-simple-brown.webp",
        "description": "Ce sort permet à une cible de marcher sur un liquide comme si elle marchait sur un sol solide. Le sort dure 10 tours.",
        "distance": {
            "type": "touch",
            "text": "Toucher"
        },
        "duration": {
            "formula": "if (context.criticalSuccess) { return 20; } return 10",
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "value": 20,
            "unit": "tours",
            "text": "Durée 20 tours"
        },
        "dependsOnArcaneLevel": false
    }
]