export default [
    {
        "id": "eruptionSolaire",
        "name": "Éruption solaire",
        "icon": "icons/magic/fire/blast-jet-stream-splash.webp",
        "description": "Une colonne de feu de 11x11 mètres, tombe du ciel.\n\n\n\n",
        "distance": {
            "value": 60,
            "unit": "mètre",
            "text": "60 mètres"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 11,
            "widthPerArcane": 11,
            "text": "11x11 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut)"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '20d6';",
            "text": "20d6"
        },
        "dependsOnArcaneLevel": false
    }
]