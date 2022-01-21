export default [
    {
        "id": "danseDuVoile",
        "name": "Danse du voile",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le bouffon danse et virevolte avec de grands voiles colorés, ce qui  rend le contour du sujet déformé, accordant un bonus de 1 point d’armure. Comme il est plus dur à voir, ce qui le rend plus difficile à toucher, ajoutant 1 point dans l’habileté Éviter.\n\nUn sort de « Voir l’invisibilité » ne neutralise pas l’effet de flou. Les adversaires qui ne peuvent pas voir le sujet ignorent l’effet du sort.",
        "distance": {
            "text": "toucher"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "une cible"
        },
        "bonus": {
            "text": "+1 d’armure, +1 éviter"
        },
        "resilience": {
            "text": "aucun"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "text": "aucun"
        }
    },
    {
        "id": "dissipationDeLaMagie",
        "name": "Dissipation de la magie",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Annule un sort de buffon d’arcane 5 ou moins. Annule un sort des autres sortes de magie d’arcane 2 ou moins. Doit toucher la cible.",
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
            "text": "Annule un sort de buffon d’arcane 6 et non-buffon d’arcane 3"
        }
    }
]