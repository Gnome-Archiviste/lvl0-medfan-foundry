export default [
    {
        "id": "annulationDeLaMagie",
        "name": "Annulation de la magie",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Annule un sort de bouffon d’arcane 10 ou moins. Annule un sort de non-bouffon d’arcane 5 ou moins. Doit toucher la cible.",
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
        "criticalSuccess": {
            "text": "Annule un sort de non-bouffon d’arcane 7 ou moins."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "blizzardDelicieux",
        "name": "Blizzard délicieux",
        "icon": "icons/magic/air/wind-tornado-spiral-brown.webp",
        "description": "L’élémentaliste crée un vortex tourbillonnant de crème glacée, de gros morceaux de chocolat et de biscuit martelant une zone de 11x11 mètres, infligeant 1d6 dégâts par niveau d’arcane.  À cause des débris et des flaques de crème glacée volant partout, la zone devient glissante pendant toute la durée du sort. Toute personne se déplaçant de plus d’un mètre doit effectuer un test de gymnastique ou tomber à plat ventre.  Le bouffon peut  déplacer le Blizzard délicieux à une vitesse de 5 mètres par tour.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "rollFormula": "return '2d6'",
            "unit": "tours",
            "text": "2d6 tours"
        },
        "area": {
            "width": 11,
            "height": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Ralentit les cibles"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut). Il faut faire le jet pour chaque tour qu’une personne est dans la zone du sort."
        },
        "criticalSuccess": {
            "text": "Les cibles sont congelé pour 1d6 tours"
        },
        "damage": {
            "text": "2d6 dégâts par niveau d’arcane"
        },
        "dependsOnArcaneLevel": false
    }
]