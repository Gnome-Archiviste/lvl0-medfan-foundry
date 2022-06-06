export default [
    {
        "id": "fusionDeKegan",
        "name": "Fusion de Kegan ",
        "icon": "icons/magic/fire/barrier-shield-explosion-yellow.webp",
        "description": "Créer un globe de 51x51 mètres à partir du magicien, faisant 20d6+10 de dégâts. Tout être survivant à l’impact initial sera aussi propulsé à la limite du globe. Le magicien ne reçoit AUCUN dégât.",
        "distance": {
            "type": "self",
            "text": "Magicien"
        },
        "duration": {
            "value": 1,
            "unit": "tour",
            "text": "1 tour"
        },
        "area": {
            "width": 51,
            "height": 51,
            "text": "51x51 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "propulse les adversaires restants à 25 m."
        },
        "resilience": {
            "text": "Divise le dommage par deux"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '20d6+10';",
            "text": "20d6+10"
        },
        "dependsOnArcaneLevel": false
    }
]