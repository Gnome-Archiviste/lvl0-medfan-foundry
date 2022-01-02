export default [
  {
    "id": "antidote",
    "name": "Antidote",
    "description": "Permets de contrer les potions négatives pendant une scène (comme celle de sommeil).",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "Contre les potions négatives"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "aveuglement",
    "name": "Aveuglement",
    "description": "Rends une tête de la victime aveugle pour un tour par niveau d’arcane. La perception de la victime est réduite de trois ainsi que toutes habilités de combats et d’évitements.",
    "distance": {
      "value": 20,
      "unit": "m"
    },
    "duration": {
      "formula": "return 1 * context.actorData.computedData.magic.arcaneLevel;",
      "unit": "tours"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "-3 perception et toutes habilités de combats."
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "bouleDeFeu",
    "name": "Boule de feu",
    "description": "D’un geste, le magicien envoie une boule de feu dans les airs pour exploser avec un rugissement à la hauteur et à la distance que le magicien désire, tant qu’elle se trouve dans la portée maximale du sort (15 mètres). L’explosion remplit la zone d’effet d’un feu et d’une chaleur intense, causant 1d6 dégâts par niveau d’arcane du magicien à toutes les créatures de la zone. Il affecte une sphère de deux mètres de rayon. La boule de feu suit une trajectoire rectiligne et si elle heurte une barrière solide avant d’atteindre la portée prescrite, l’impact provoque une explosion précoce.",
    "distance": {
      "value": 15,
      "unit": "m"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "value": 2,
      "unit": "m"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "damage": {
      "rollFormula": "return context.actorData.computedData.magic.arcaneLevel + 'd6';",
      "element": "fire"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "charme",
    "name": "Charme",
    "description": "Ce sort fait qu’une créature considère le magicien comme un ami et un allié de confiance. Le sort ne permet pas au personnage de contrôler la créature charmée comme s’il s’agissait d’un automate, mais le sujet perçoit les paroles et les actions du magicien de la manière la plus favorable. Le magicien peut essayer de donner des ordres au sujet, mais il doit réussir un test d’éloquence pour le convaincre de faire tout ce qu’il ne ferait pas d’ordinaire.\nTout acte du magicien, ou de ses alliés apparents, qui menace la créature charmée brise le sort. Notez également que le magicien doit parler la langue de la créature pour communiquer ou donner des ordres.\nLa créature charmée peut faire des tests de résilience pour se défaire du sort, mais elle doit réussir trois tests de suite un fois charmée.",
    "distance": {
      "value": 5,
      "unit": "m"
    },
    "duration": {
      "value": 10,
      "unit": "tours"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "Victime sympathique"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "guerison",
    "name": "Guérison",
    "description": "Guérit un coéquipier ou lui-même de 3d6 points de vie. Doit toucher la cible. Ne peut pas dépasser le maximum de points de vie. Au lieu de guérir, ce sort fait du dommage sur les morts-vivants.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "3d6 points de vie"
    },
    "resilience": {
      "text": "Guérit 18 points de vie"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "invisibilite",
    "name": "Invisibilité",
    "description": "Le magicien (et tout son équipement) disparaît de toutes les formes de vision naturelle. Les objets lâchés ou déposés par une créature invisible deviennent visibles ; les objets ramassés disparaissent s’ils sont rentrés dans les vêtements ou les pochettes portés par la créature. La lumière, cependant, ne devient jamais invisible, bien qu’une source de lumière puisse le devenir (ainsi, l’effet est celui d’une lumière sans source visible). Toute partie d’un objet que le sujet porte, mais qui s’étend à plus de trois (3) mètres de lui devient visible, comme une corde qui traîne. Le sort prend fin si le sujet attaque une créature. Dans ce cas, toute action ou tout sort infligeant des dégâts ou effets négatifs à une cible est considéré comme une attaque. Notez que les sorts affectant spécifiquement les alliés, mais pas les ennemis ne sont pas des attaques à cet effet, même lorsqu’ils incluent des ennemis dans leur zone. Les personnes affectées par ce sort ne peuvent se voir entre elles ni elle-même.",
    "distance": {
      "type": "self"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "text": "Le magicien"
    },
    "resilience": {
      "text": "Droit à une attaque sans devenir visible"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "miroir",
    "name": "Miroir",
    "description": "Ce sort reflète un sort (maximum du niveau d’arcane du magicien) lancé contre le magicien à l’envoyeur.",
    "distance": {
      "type": "self"
    },
    "duration": {
      "text": "Un combat ou utilisation"
    },
    "resilience": {
      "text": "Reflète 2 sorts"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "nueeGrouillante",
    "name": "Nuée grouillante",
    "description": "Convoque une nuée d’araignées, chauves-souris, rats ou scorpions, etc qui attaquent la cible. Le type d’animal et son attaque est déterminé par la table ci-dessous.\n*Le Maître de jeu peut donner un type plus précis selon la région)\nTypes de nuée\nDégâts\n1\nOiseaux\n4d6+6\n2\nRats\n3d6+6\n3\nPuces\n3d6+3\n4\nAraignées\n3d6, lancer un dé: sur un 5 ou 6, l’ennemi s’enfuit de dégoût pendant  2 tours\n5\nMoustiques\n3d6, lancer un dé: sur un 6, l’ennemi s'endort.\n6\nInsectes rampants\n2d6, lancer un dé: sur un 5 ou 6, l’ennemi s’enfuit de dégoût pendant  2 tours",
    "distance": {
      "value": 15,
      "unit": "m"
    },
    "duration": {
      "text": "Instantanée"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "text": "La cible ne peut pas faire de test de résilience."
    },
    "damage": {
      "text": "Selon l’attaque de la nuée."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "passageSansTraces",
    "name": "Passage sans traces",
    "description": "En recevant ce sort, la cible peut se déplacer sur n’importe quel type de terrain et ne laisser ni empreintes ni odeurs. Pister la cible devient impossible par des moyens non magiques.",
    "distance": {
      "value": 5,
      "unit": "m"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * context.actorData.computedData.magic.arcaneLevel",
      "unit": "minutes"
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
    "id": "runeDeKegan",
    "name": "Rune de Kegan",
    "description": "Le magicien dessine sur une surface un symbole. Lorsqu’un ennemi s’en approche à moins de soixante (60) centimètres, une explosion fait deux (2) dés de dégâts sur toutes les créatures se trouvant dans un rayon de deux (2) mètres.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Jusqu’à l’utilisation (Préparation 2 minutes)"
    },
    "area": {
      "value": 2,
      "unit": "m"
    },
    "resilience": {
      "text": "4d6"
    },
    "damage": {
      "rollFormula": "return '2d6';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]