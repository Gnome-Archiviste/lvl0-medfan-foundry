export default [
  {
    "id": "appelDeLaNature",
    "name": "Appel de la nature",
    "description": "Ce sort crée une sensation d’urgence, chez la cible, de se soulager de ses besoins naturels. Pendant 3 tours, la cible ne peut plus se concentrer sur autre chose. Elle doit se retirer pour aller faire ses besoins. Si elle est en combat, elle ne peut plus attaquer ou faire des sorts. Il doit partir du combat ou de la situation, en se déplaçant à la moitié du déplacement normal.",
    "distance": {
      "value": 10,
      "unit": "m"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * 3",
      "unit": "tours"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "baratiner",
    "name": "Baratiner",
    "description": "Avec ce sort, le bouffon peut cacher un mensonge qu’il dit à une victime, ce qui fait qu’il peut résister à un sort de Détection des mensonges. Si ça arrive, les deux (2) joueurs doivent faire un jet d’opposition.",
    "distance": {
      "text": "Le bouffon"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "text": "Aucun sort de Détection des mensonges possible"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "decouverteFortuite",
    "name": "Découverte fortuite",
    "description": "Le bouffon peut utiliser ce sort pour trouver des portes secrètes, des compartiments cachés, et autres zones cachées, spécialement construites pour échapper à la détection. Lorsque le sort est lancé, le bouffon trouvera accidentellement le passage secret s’il passe près de celui-ci, activant par accident le levier ou tombant dans la trappe sans le vouloir.\nLe sort ne détecte pas les dangers naturels. Il ne détecte pas non plus les pièges magiques, ce qui les déclenche lorsque le bouffon ouvre le passage secret par accident.",
    "distance": {
      "text": "Bouffon"
    },
    "duration": {
      "text": "1 scène ou jusqu’à la découverte d'une zone secrète (le premier des deux)"
    },
    "area": {
      "value": 2,
      "unit": "m"
    },
    "resilience": {
      "text": "Ne déclenche pas le piège s’il y en a un (mais le piège reste actif)"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "detectionDesMensonges",
    "name": "Détection des mensonges",
    "description": "À chaque tour, le bouffon peut se concentrer sur un sujet à portée et saura instantanément si le sujet ment délibérément.\nLe sort ne révèle pas la vérité, ne découvre pas les inexactitudes involontaires ni ne révèle des évasions. À chaque tour, le personnage peut se concentrer sur un sujet différent.",
    "distance": {
      "value": 5,
      "unit": "m"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "text": "Permet de savoir si la cible, sans vraiment mentir, évite de réellement répondre à la question"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "invocationDunFrankfurterDansant",
    "name": "Invocation d’un Frankfurter dansant",
    "description": "Un sort vraiment farfelue qui invoque une saucisse dansante, habillée d’un petit pain long et d’un chapeau bavarois, au secours du Bouffon. Ce hot-dog va danser, bondir et faire des galipettes, le tout pour attirer l’attention des personnages et des adversaires. Tous, à l’exception du Bouffon, doivent effectuer un jet de résilience pour éviter d’être fascinés par ce petit bonhomme loufoque. Les victimes distraites seront bouche bée d’horreur, se demandant à haute voix pourquoi de telles choses sont autorisées. Hélas, ce dilemme existentiel ne sera peut-être jamais résolu.",
    "distance": {
      "value": 10,
      "unit": "m"
    },
    "duration": {
      "value": 5,
      "unit": "tours"
    },
    "area": {
      "value": 5,
      "unit": "m"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "murmureDeDasha",
    "name": "Murmure de Dasha",
    "description": "Conversation chuchotée à distance. Il faut pouvoir voir la cible.",
    "distance": {
      "value": 5,
      "unit": "m"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * 1 * context.actorData.computedData.magic.arcaneLevel",
      "unit": "tours"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "formula": "if (context.criticalSuccess) { return 'Double la durée (pré-calculé)'; } return 'Double la durée';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "poussiereScintillante",
    "name": "Poussière scintillante",
    "description": "En soufflant dans sa main, le Bouffon déclenche un nuage de poussière scintillante. En plus d’être très jolie, cette poussière a tendance à se coller partout (sauf le Bouffon) et de révéler la silhouette des gens et choses invisibles.",
    "distance": {
      "value": 10,
      "unit": "m"
    },
    "duration": {
      "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
      "unit": "tours"
    },
    "area": {
      "value": 5,
      "unit": "m"
    },
    "resilience": {
      "text": "Aucun test de résilience"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "serpentins",
    "name": "Serpentins",
    "description": "Ce sort fait jaillir des serpentins du bout des doigts du bouffon qui immobilise la victime pendant 5 tours. La victime peut se déprendre en réussissant un jet de l'habileté « Évasion ».",
    "distance": {
      "value": 10,
      "unit": "m"
    },
    "duration": {
      "value": 5,
      "unit": "tours"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "Victime immobilisée"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "sphereGlaceeDeTalitha",
    "name": "Sphère glacée de Talitha",
    "description": "Créer une boule glacée attaquant une victime qui est figée pendant 2 tours.",
    "distance": {
      "value": 15,
      "unit": "m"
    },
    "duration": {
      "value": 2,
      "unit": "tours"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "Victime immobilisée"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "damage": {
      "rollFormula": "return '1d6+2';",
      "element": "water"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "trompeLoeil",
    "name": "Trompe-l’oeil",
    "description": "Ce sort crée l’illusion d’un passage, corridor, porte, trappe ou toute ouverture similaire sur une surface. Il semble absolument vrai, mais le passage est totalement illusoire. Lorsqu'une victime tente de passer, elle heurte violemment le mur. Toucher ou sonder la surface révèle sa nature illusoire, bien que cela ne fasse pas disparaître l’illusion. Il affecte une zone de trois (3) mètres sur trois (3) mètres sur trente (30) cm.",
    "distance": {
      "value": 5,
      "unit": "m"
    },
    "duration": {
      "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
      "unit": "heures"
    },
    "area": {
      "value": 2,
      "unit": "mètre"
    },
    "resilience": {
      "text": "Aucun test de résilience"
    },
    "damage": {
      "text": "Équivalent du mouvement de la victime en dommage"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]