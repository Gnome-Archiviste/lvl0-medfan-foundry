export default [
    {
        "id": "appelDeLaNature",
        "name": "Appel de la nature",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort crée une sensation d’urgence, chez la cible, de se soulager de ses besoins naturels. Pendant 3 tours, la cible ne peut plus se concentrer sur autre chose. Elle doit se retirer pour aller faire ses besoins. Si elle est en combat, elle ne peut plus attaquer ou faire des sorts. Il doit partir du combat ou de la situation, en se déplaçant à la moitié du déplacement normal. ",
        "distance": {
            "value": 10,
            "unit": "mètre",
            "text": "10 mètres"
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 3",
            "value": 3,
            "unit": "tours",
            "text": "3 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';",
            "text": "Double la durée du sort"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "baratiner",
        "name": "Baratiner",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Avec ce sort, le bouffon peut cacher un mensonge qu’il dit à une victime, ce qui fait qu’il peut résister à un sort de Détection des mensonges. Si ça arrive, les deux (2) joueurs doivent faire un jet d’opposition.",
        "distance": {
            "text": "Le bouffon"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Aucun sort de Détection des mensonges possible"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "decouverteFortuite",
        "name": "Découverte fortuite",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Le bouffon peut utiliser ce sort pour trouver des portes secrètes, des compartiments cachés, et autres zones cachées, spécialement construites pour échapper à la détection. Lorsque le sort est lancé, le bouffon trouvera accidentellement le passage secret s’il passe près de celui-ci, activant par accident le levier ou tombant dans la trappe sans le vouloir. \n\n\n\n\n\nLe sort ne détecte pas les dangers naturels. Il ne détecte pas non plus les pièges magiques, ce qui les déclenche lorsque le bouffon ouvre le passage secret par accident.\n\n\n\n",
        "distance": {
            "text": "Bouffon"
        },
        "duration": {
            "text": "1 scène ou jusqu’à la découverte d'une zone secrète (le premier des deux)"
        },
        "area": {
            "value": 2,
            "unit": "m",
            "text": "2 mètres"
        },
        "criticalSuccess": {
            "text": "Ne déclenche pas le piège s’il y en a un (mais le piège reste actif)"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "detectionDesMensonges",
        "name": "Détection des mensonges",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "À chaque tour, le bouffon peut se concentrer sur un sujet à portée et saura instantanément si le sujet ment délibérément.\n\nLe sort ne révèle pas la vérité, ne découvre pas les inexactitudes involontaires ni ne révèle des évasions. À chaque tour, le personnage peut se concentrer sur un sujet différent.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "value": 1,
            "unit": "scène",
            "text": "1 scène"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "text": "Permet de savoir si la cible, sans vraiment mentir, évite de réellement répondre à la question"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "invocationDunFrankfurterDansant",
        "name": "Invocation d’un Frankfurter dansant",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Un sort vraiment farfelue qui invoque une saucisse dansante, habillée d’un petit pain long et d’un chapeau bavarois, au secours du Bouffon. Ce hot-dog va danser, bondir et faire des galipettes, le tout pour attirer l’attention des personnages et des adversaires. Tous, à l’exception du Bouffon, doivent effectuer un jet de résilience pour éviter d’être fascinés par ce petit bonhomme loufoque. Les victimes distraites seront bouche bée d’horreur, se demandant à haute voix pourquoi de telles choses sont autorisées. Hélas, ce dilemme existentiel ne sera peut-être jamais résolu.",
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
            "value": 5,
            "unit": "m",
            "text": "5 mètres"
        },
        "resilience": {
            "text": "La personne n’est pas bouche bée"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "dashaWhispering",
        "name": "Murmure de Dasha",
        "icon": "icons/svg/silenced.svg",
        "description": "Conversation chuchotée à distance. Il faut pouvoir voir la cible.",
        "distance": {
            "text": "5 mètres + 1 mètre par niveau d’arcane."
        },
        "duration": {
            "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.arcaneLevel",
            "unit": "tours",
            "text": "1 tour par niveau d’arcane"
        },
        "area": {
            "text": "Une cible"
        },
        "criticalSuccess": {
            "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';",
            "text": "Double la durée"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "poussiereScintillante",
        "name": "Poussière scintillante",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "En soufflant dans sa main, le Bouffon déclenche un nuage de poussière scintillante. En plus d’être très jolie, cette poussière a tendance à se coller partout (sauf le Bouffon) et de révéler la silhouette des gens et choses invisibles.",
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
            "value": 5,
            "unit": "m",
            "text": "5 mètres"
        },
        "resilience": {
            "text": "Le sort ne fonctionne pas."
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience"
        },
        "dependsOnArcaneLevel": true
    },
    {
        "id": "serpentins",
        "name": "Serpentins",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort fait jaillir des serpentins du bout des doigts du bouffon qui immobilise la victime pendant 5 tours. La victime peut se déprendre en réussissant un jet de l'habileté « Évasion ».",
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
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "sphereGlaceeDeTalitha",
        "name": "Sphère glacée de Talitha",
        "icon": "icons/magic/water/orb-ice-opaque.webp",
        "description": "Créer une boule glacée attaquant une victime qui est figée pendant 2 tours.",
        "distance": {
            "value": 15,
            "unit": "mètre",
            "text": "15 mètres"
        },
        "duration": {
            "value": 2,
            "unit": "tours",
            "text": "2 tours"
        },
        "area": {
            "text": "Une cible"
        },
        "bonus": {
            "text": "Victime immobilisée"
        },
        "resilience": {
            "text": "Victime non-immobilisée"
        },
        "criticalSuccess": {
            "text": "La cible ne peut pas faire de test de résilience."
        },
        "damage": {
            "rollFormula": "return '1d6+2';",
            "element": "water",
            "text": "1d6+2"
        },
        "dependsOnArcaneLevel": false
    },
    {
        "id": "trompeLoeil",
        "name": "Trompe-l’oeil",
        "icon": "icons/magic/symbols/question-stone-yellow.webp",
        "description": "Ce sort crée l’illusion d’un passage, corridor, porte, trappe ou toute ouverture similaire sur une surface. Il semble absolument vrai, mais le passage est totalement illusoire. Lorsqu'une victime tente de passer, elle heurte violemment le mur. Toucher ou sonder la surface révèle sa nature illusoire, bien que cela ne fasse pas disparaître l’illusion. Il affecte une zone de trois (3) mètres sur trois (3) mètres sur trente (30) cm.",
        "distance": {
            "value": 5,
            "unit": "mètre",
            "text": "5 mètres"
        },
        "duration": {
            "formula": "return 1 * context.arcaneLevel;",
            "unit": "heures",
            "text": "1 heure par niveau d’arcane"
        },
        "area": {
            "value": 2,
            "unit": "mètre",
            "text": "2 mètre"
        },
        "resilience": {
            "text": "Annule le sort"
        },
        "criticalSuccess": {
            "text": "Aucun test de résilience"
        },
        "damage": {
            "text": "Équivalent du mouvement de la victime en dommage"
        },
        "dependsOnArcaneLevel": true
    }
]