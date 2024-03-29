export default [
    {
        "id": "incandescenteTrap",
        "name": "Chausse-trappes incandescentes",
        "icon": "icons/magic/fire/beam-jet-stream-yellow.webp",
        "description": "L’élémentaliste piège une zone de 2 mètres par 2 mètres, habituellement derrière l’élémentaliste,  avec des braises qui restent chaudes jusqu’à ce que quelqu’un marche dessus, infligeant 1d6/2 points de dégâts et forçant le ou les poursuivants ayant marché sur les braises de reculer hors de la zone et de terminer leur déplacement. Ce sort est habituellement utilisé pour faciliter une fuite.\n\n\n\n",
        "distance": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètres"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Victimes ralenties"
        },
        "resilience": {
            "text": "La victime peut continuer son chemin."
        },
        "criticalSuccess": {
            "text": "Plein dommage, soit 3 points de dégâts."
        },
        "damage": {
            "rollFormula": "return '1d6/2';",
            "text": "1d6/2"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "boilingOil",
        "name": "Huile bouillante",
        "icon": "icons/commodities/materials/liquid-orange.webp",
        "description": "Immobilise les victimes pendant deux (2) tours sur une distance de trois (3) mètres carrés. Les victimes ne peuvent plus se déplacer.\n\n\n\n",
        "distance": {
            "text": "8 mètres + 1 m par arcane"
        },
        "duration": {
            "value": 2,
            "unit": "tours",
            "text": "2 tours"
        },
        "area": {
            "width": 5,
            "height": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Victimes immobilisées"
        },
        "resilience": {
            "text": "On fait un test par tour pour ne pas avoir l’effet du piège pour ce tour."
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "text": "1d6 (au lancé seulement)"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "maledictionDeLacierBrulant",
        "name": "Malédiction de l’acier brûlant ",
        "icon": "icons/commodities/metal/barstock-heated-steel.webp",
        "description": "Un objet métallique à portée (comme une arme, un morceau d’armure, ou poigné de porte) devient chauffé au rouge. Toute créature touchant l’objet subit 1d6 + 2 blessures et échappe ou lâche l’objet. L’objet émet une faible lumière et peut mettre le feu à des objets inflammables.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "La cible est capable de conserver l’objet en main."
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double les dégâts (pré-calculé)'; } return 'Double les dégâts';",
            "text": "Double les dégâts"
        },
        "damage": {
            "rollFormula": "if (context.criticalSuccess) { return '(' + ('1d6+2') + ')*2'; } return '1d6+2';",
            "text": "1d6 + 2"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "incandescenteNuts",
        "name": "Noix incandescentes",
        "icon": "icons/consumables/nuts/acorn-glowing-brown.webp",
        "description": "Avec ce sort, l’élémentaliste utilise des noix (gland, faine, marron, etc) qu’il rend brûlantes. Il peut utiliser lui-même ces glands ou les offrir à ses alliés. Ces noix sont utilisées comme projectiles avec une fronde.",
        "distance": {
            "text": "1 mètre en avant de l’élémentaliste"
        },
        "duration": {
            "text": "instantanée"
        },
        "area": {
            "text": "1 à 6 cibles"
        },
        "bonus": {
            "text": "le projectile fait 1d6 de dégâts de feu"
        },
        "criticalSuccess": {
            "text": "Double la quantité de noix (les noix manquantes apparaissent)."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "halfWorldGrips",
        "name": "Poignes du demi-monde",
        "icon": "icons/magic/unholy/hand-claw-glow-orange.webp",
        "description": "Fais jaillir du sol des mains de feu ressemblant à des mains de démons qui immobilisent la victime pendant 5 tours. La victime peut se déprendre en réussissant un jet de l'habileté « Évasion »",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 5,
            "unit": "tours",
            "text": "5 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Victime immobilisée"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "dependsOnArcaneLevel": false
    }
]