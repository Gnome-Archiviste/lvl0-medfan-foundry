export default [
    {
        "id": "conductibilite",
        "name": "Conductibilité",
        "icon": "icons/magic/lightning/bolt-forked-large-green.webp",
        "description": "Lorsque qu'un élémentaliste d'acide fait ce sort en premier sur la même cible qu'un élémentaliste d'air, les dégâts électriques sont doublés. Ce sort fonctionne aussi avec les sorts en baguette.",
        "distance": {
            "value": 40,
            "unit": "mètre",
            "text": "40 mètres"
        },
        "duration": {
            "text": "Jusqu’à utilisation, maximum d’une scène."
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Double les dégâts des sorts d’électricité"
        },
        "criticalSuccess": {
            "text": "Fait plein dommage."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "immuniteALacide",
        "name": "Immunité à l’acide",
        "icon": "icons/magic/defensive/shield-barrier-flaming-pentagon-acid.webp",
        "description": "La cible devient imprégnée d’énergies magiques protectrices offrant une protection complète contre l’acide. Le sort annule le dommage produit par l’acide, que la source des dégâts soit naturelle ou magique. L'élémentaliste doit toucher la cible.",
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
            "text": "Annule les dégâts causés par l’acide"
        },
        "criticalSuccess": {
            "text": "Retourne la moitié des dégâts à celui qui les inflige."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "nuageMeurtrier",
        "name": "Nuage meurtrier",
        "icon": "icons/magic/air/fog-gas-smoke-dense-green.webp",
        "description": "Un brouillard corrosif vert-jaunâtre jaillit du point désigné par le lanceur du sort et affecte une zone d’une zone de 13x13 mètres. En plus de devoir faire un jet d'Observer pour trouver un adversaire, les créatures prisent dans la zone du nuage subissent 12d6 de dégâts d’acide à chaque tour dans le nuage. \n\nLe nuage s’éloigne de l’élémentaliste à 4 mètres par tour, dans la direction que celui-ci décide. Parce que les vapeurs sont plus lourdes que l’air, elles roulent le long de la surface du sol et coulent au niveau le plus bas de la terre, lui permettant même de se glisser dans les ouvertures, telles que sous les portes.",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "value": 15,
            "unit": "tours",
            "text": "15 tours"
        },
        "area": {
            "width": 13,
            "height": 13,
            "text": "13x13 mètres",
            "comment": ""
        },
        "resilience": {
            "text": "Divise les dégâts en 2"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '12d6';",
            "element": "acid",
            "text": "12d6"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "refluxRepetitif",
        "name": "Reflux répétitif",
        "icon": "icons/magic/unholy/beam-impact-green.webp",
        "description": "En frappant le sol du pied, l’élémentaliste déclenche une réaction en chaîne qui fait apparaître un petit geyser de liquide acide sous les cibles qu’il choisit, en commençant par le première cible puis éclate sous d’autres cibles à moins de 60 mètres du magicien. Les geysers infligent 2d6 + (3 par victimes) points de dégâts à chacune des victimes (1 cible par niveau d’arcane de l’élémentaliste). Tous les sujets peuvent tenter des jets de résilience pour la moitié des dégâts. L’élémentaliste choisit les cibles, mais elles doivent toutes être à moins de 60 mètres au total (du magicien à la dernière cible), et aucune cible ne peut être touchée plus d’une fois. Le magicien peut choisir d’affecter moins de cibles que le maximum.",
        "distance": {
            "text": "60 mètres."
        },
        "duration": {
            "text": "Instantané"
        },
        "area": {
            "text": "Aucune"
        },
        "resilience": {
            "text": "Divise le dommage par deux (plus haut) chaque victime doit faire un test"
        },
        "criticalSuccess": {
            "text": "L’armure de la cible est détruite."
        },
        "damage": {
            "element": "acid",
            "text": "2d6 + (3 par victimes) sur chaque victime"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "tempeteDacide",
        "name": "Tempête d’acide",
        "icon": "icons/magic/acid/projectile-beams-salvo-green.webp",
        "description": "Diminue la perception de moitié à cause des gouttelettes acides faisant picoter les yeux et fait du dommage à tous les tours et à tous ceux qui sont dans la zone de la tempête, alliés comme ennemis. Le déplacement est divisé par deux à cause des vents puissants.",
        "distance": {
            "value": 20,
            "unit": "mètre",
            "text": "20 mètres"
        },
        "duration": {
            "value": 10,
            "unit": "tours",
            "text": "10 tours"
        },
        "area": {
            "width": 21,
            "height": 21,
            "text": "21x21 mètres",
            "comment": ""
        },
        "bonus": {
            "text": "Déplacement et perception divisé par deux."
        },
        "resilience": {
            "text": "Divise le dommage par deux. Faire a chaque tour qu’une personne est dans la tempête d’acide"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience"
        },
        "damage": {
            "rollFormula": "return '4d6';",
            "element": "acid",
            "text": "4d6 par tour"
        },
        "dependsOnArcaneLevel": false
    }
]