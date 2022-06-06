export default [
    {
        "id": "tsunami",
        "name": "Tsunami",
        "icon": "icons/maigc/water/wave-water-blue.webp",
        "description": "L'élémentaliste fait apparaître une énorme vague d’eau magique devant lui qui déferle sur tout ce qui bouge sur 50 mètres. Tout ce qui bouge est déplacé avec la vague sur 50 mètres. Trois jets sur 4 d’Athlétique doivent être réussis pour essayer d’attraper quelque chose. \n\n\n\n",
        "distance": {
            "text": "En avant du magicien"
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "width": 51,
            "widthPerArcane": 51,
            "text": "51x51 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Moitié des dégâts seulement"
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