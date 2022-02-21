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
        },
        "dependsOnArcaneLevel": false
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
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "invocationDunZanni",
        "name": "Invocation d’un Zanni",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Fait apparaître un type d’un démon servant pour combattre avec le bouffon. La créature a la peau blanche, des pieds et des mains démesurés, une chevelure hirsute flamboyante et un nez vermillon. La créature est habillée de vêtements aux couleurs criardes et ne cesse de rigoler de façon… malaisante. Attention, on ne peut avoir plus de deux invocations à la fois, sinon on perd le contrôle des créatures, qui attaqueront tous ceux qu’ils voient. Les caractéristiques de la créature : Phy=9, Int=7, Cha=4, Dex=8, Per=6 (aucune habileté), 80 points de vie.",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "text": "Un combat ou jusqu’à détruit"
        },
        "criticalSuccess": {
            "text": "130 points de vie"
        },
        "damage": {
            "rollFormula": "return '1d6+6';",
            "text": "1d6 + 6"
        },
        "dependsOnArcaneLevel": false
    }
]