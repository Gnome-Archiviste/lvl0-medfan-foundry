export default [
    {
        "id": 'incandescenteTrap',
        "name": 'Chausse-trappes incandescentes',
        "icon": 'icons/magic/fire/beam-jet-stream-yellow.webp',
        "description": `L’élémentaliste piège une zone de 2 mètres par 2 mètres, habituellement derrière l’élémentaliste, avec des braises qui restent chaudes jusqu’à ce que quelqu’un marche dessus, infligeant 1d6/2 points de dégâts et forçant le ou les poursuivants ayant marché sur les braises de reculer hors de la zone et de terminer leur déplacement. Ce sort est habituellement utilisé pour faciliter une fuite.`,
        "damage": {
            "rollFormula": `return '1d6 / 2';`,
            "element": 'fire'
        },
        "distance": {
            "value": 2,
            "unit": 'm'
        },
        "duration": {
            "value": 1,
            "unit": 'scene'
        },
        "area": {
            "value": 2,
            "unit": 'm'
        },
        "resilience": {
            "text": 'La victime peut continuer son chemin.'
        },
        "criticalSuccess": {
            "text": `Plein dommage, soit 3 points de dégâts.`
        },

    },
    {
        "id": 'boilingOil',
        "name": 'Huile bouillante',
        "icon": 'icons/magic/fire/beam-jet-stream-yellow.webp',
        "description": `Immobilise les victimes pendant deux (2) tours sur une distance de trois (3) mètres carrés. Les
victimes ne peuvent plus se déplacer.`,
        "damage": {
            "rollFormula": `return '1d6 + 1';`,
            "element": 'fire'
        },
        "distance": {
            "value": 10,
            "unit": 'm'
        },
        "duration": {
            "value": 3,
            "unit": 'tours'
        },
        "area": {
            "value": 3,
            "unit": 'm'
        },
        "resilience": {
            "text": 'On fait un test par tour pour ne pas avoir l’effet du piège pour ce tour.'
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas faire de test de résilience.`
        },

    },
    {
        "id": 'incandescenteNuts',
        "name": 'Noix incandescentes',
        "icon": 'icons/magic/fire/beam-jet-stream-yellow.webp',
        "description": `Avec ce sort, l’élémentaliste utilise des noix (gland, faine, marron, etc) qu’il rend brûlantes. Il peut utiliser lui-même ces glands ou les offrir à ses alliés. Ces noix sont utilisées comme projectiles avec une fronde.`,
        "distance": {
            "value": 1,
            "unit": 'm'
        },
        "duration": {
            "text": 'Instantané'
        },
        "area": {
            "text": `1-6 cibles`
        },
        "resilience": {
            "text": 'Aucune'
        },
        "criticalSuccess": {
            "text": `Double la quantité de noix (les noix manquantes apparaissent).`
        },

    },
    {
        "id": 'halfWorldGrips',
        "name": 'Poignes du demi-monde',
        "icon": 'icons/magic/fire/beam-jet-stream-yellow.webp',
        "description": `Fais jaillir du sol des mains de feu ressemblant à des mains de démons qui immobilisent la victime pendant 5 tours. La victime peut se déprendre en réussissant un jet de l'habileté « Évasion »`,
        "bonus": {
            "text": `Aucun`
        },
        "damage": {
            "text": `Aucun`
        },
        "distance": {
            "value": 10,
            "unit": 'm'
        },
        "duration": {
            "value": 5,
            "unit": 'tours'
        },
        "area": {
            "text": `Une cible`
        },
        "resilience": {
            "text": 'Le sort ne fonctionne pas.'
        },
        "criticalSuccess": {
            "text": `La cible ne peut pas faire de test de résilience.`
        },

    },
]
