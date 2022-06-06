export default [
    {
        "id": "chausseTrappesNaturelles",
        "name": "Chausse-trappes naturelles",
        "icon": "icons/environment/wilderness/terrain-stone-stalagtite.webp",
        "description": "L’élémentaliste piège une zone de 2 mètres par 2 mètres, habituellement derrière l’élémentaliste,  avec des pointes de minéraux affutées jusqu’à ce que quelqu’un marche dessus, infligeant 1d6/2 points de dégâts et forçant le ou les poursuivants ayant marché sur les pointes à reculer hors de la zone et de terminer leur déplacement. Ce sort est habituellement utilisé pour faciliter une fuite.\n\n\n\n",
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
            "widthPerArcane": 5,
            "text": "5x5 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Victimes ralenties"
        },
        "resilience": {
            "text": "La victime peut continuer son chemin.Succès remarquable : Plein dommage, soit 3 points de dégâts."
        },
        "damage": {
            "rollFormula": "return '1d6/2';",
            "text": "1d6/2"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "sentierBucolique",
        "name": "Sentier bucolique",
        "icon": "icons/creatures/mammals/rabbit-movement-glowing-green.webp",
        "description": "Ce sort fonctionne dans les milieux avec un sol naturel, qu’il soit fait de terre, de pierre ou de roche.  Le sol devient lisse pour la cible du sort. Cela lui permet de faire le double du déplacement. Que ce soit en combat ou lors des déplacements sur une distance.",
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
            "text": "Double le déplacement"
        },
        "criticalSuccess": {
            "text": "Triple le déplacement"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "fruitsFossilisees",
        "name": "Fruits fossilisées",
        "icon": "images/Objets/fruits_fossilises.png",
        "description": "Avec ce sort, l’élémentaliste utilise des baies ou des noix qu’il pétrifie. Il peut utiliser lui-même ces baies et glands ou les offrir à ses alliés. Ces noix sont utilisées comme projectiles avec une fronde.",
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
            "text": "le projectile fait 1d6 de dégâts"
        },
        "criticalSuccess": {
            "text": "Double la quantité de noix (les noix manquantes apparaissent magiquement)."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "orDesFous",
        "name": "Or des fous",
        "icon": "icons/commodities/stone/ore-chunk-yellow-gold.webp",
        "description": "Avec ce sort, l’élémentaliste transforme une petite pierre en pyrite, un minéral qui ressemble à de l’or mais sans valeur. En la lançant au loin, la fausse or détourne l’attention des poursuivants pendant 3 tours et permet à l’élémentaliste de s'enfuir.",
        "distance": {
            "text": "L’élémentaliste"
        },
        "duration": {
            "text": "Trois (3) tours"
        },
        "area": {
            "text": "Une (1) pierre"
        },
        "bonus": {
            "text": "Permet de s’enfuire sans combat"
        },
        "resilience": {
            "text": "Les poursuivants ne sont pas dupés."
        },
        "criticalSuccess": {
            "text": "Double le temps de distraction"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "racines",
        "name": "Racines",
        "icon": "icons/magic/nature/root-vine-entangle-foot-green.webp",
        "description": "Fais jaillir des racines du sol qui immobilise la victime pendant 5 tours. La victime peut se déprendre en réussissant un test d’Évasion.",
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