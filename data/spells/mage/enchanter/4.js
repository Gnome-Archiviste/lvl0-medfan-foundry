export default [
  {
    "id": "anneauDemiSel",
    "name": "Anneau demi-sel",
    "description": "L’enchanteur infuse de l’énergie magique dans une bague en or sertie d’une petite sélénite (pierre semi-précieuse transparente), permettant de bonifier une habileté que le joueur choisit au début de la séance de jeu",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "value": 1,
      "unit": "heure"
    },
    "area": {
      "text": "La bague"
    },
    "bonus": {
      "text": "+1 point dans une habileté générale choisie en début de partie."
    },
    "resilience": {
      "text": "Donne un bonus d’une seconde habileté choisie par le magicien."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "dissipationDeLaMagie",
    "name": "Dissipation de la magie",
    "description": "Annule un sort de magie général ou d’enchanteurs d’arcane 5 ou moins. Annule un sort de magie spécialisé d’arcane 2 ou moins. Doit toucher la cible.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "Instantané"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "text": "Annule un sort de magicien d’arcane 6 et non-magicien d’arcane 3"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "effacer",
    "name": "Effacer",
    "description": "Ce sort supprime les écritures de nature magique ou non. En passant sa main lentement sur le texte, l’enchanteur  efface autant d’écritures que l’on peut trouver sur un parchemin ou jusqu’à deux pages d’un livre en poussant l’encre jusqu’au bas de la page, ne laissant qu’une goutte d’encre qui tombe au sol. Les écritures non magiques sont automatiquement effacées.",
    "distance": {
      "text": "Touché"
    },
    "duration": {
      "value": 5,
      "unit": "tours"
    },
    "area": {
      "text": "Un objet"
    },
    "resilience": {
      "text": "efface jusqu’à 4 pages"
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
    "description": "Le magicien (et tout son équipement) disparaît de toutes les formes de vision naturelle. Les objets lâchés ou déposés par une créature invisible deviennent visibles ; les objets ramassés disparaissent s’ils sont rentrés dans les vêtements ou les pochettes portés par la créature. La lumière, cependant, ne devient jamais invisible, bien qu’une source de lumière puisse le devenir (ainsi, l’effet est celui d’une lumière sans source visible). Toute partie d’un objet que le sujet porte, mais qui s’étend à plus de trois (3) mètres de lui devient visible, comme une corde qui traîne. Le sort prend fin si le sujet attaque une créature. Dans ce cas, est considéré comme une attaque toute action ou sort infligeant des dégâts ou effets négatifs à une cible. Notez que les sorts affectant spécifiquement les alliés, mais pas les ennemis ne sont pas des attaques à cet effet, même lorsqu’ils incluent des ennemis dans leur zone. Les personnes affectées par ce sort ne peuvent se voir entre elles, ni elle-même.",
    "distance": {
      "type": "self"
    },
    "duration": {
      "text": "une (1) scène"
    },
    "area": {
      "text": "Le magicien"
    },
    "resilience": {
      "text": "Double la durée du sort"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "objetBelliqueux",
    "name": "Objet bélliqueux",
    "description": "L’enchanteur donne un semblant de vie à un objet qui bouge sur l’ordre de celui-ci selon des actions simples mais qui peuvent être offensives : frapper quelqu’un ou quelque chose, hacher, abattre un arbre, fouetter , etc. Les dégâts infligés dépendent de l’objet.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "formula": "return (context.criticalSuccess ? 2 : 1) * 5 * context.actorData.computedData.magic.arcaneLevel",
      "unit": "tours"
    },
    "area": {
      "text": "une cible"
    },
    "resilience": {
      "formula": "if (context.criticalSuccess) { return 'Double la durée du sort (pré-calculé)'; } return 'Double la durée du sort';"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "potionDeGuerison",
    "name": "Potion de guérison",
    "description": "L’enchanteur prépare une potion claire et rougeâtre dans un grand chaudron contenant entre autre du sang de troll (100 ml), une pincée de poudre de perlépipein et de l’essence de cèdre (1 litre) et qui doit mijoter et être touillée pendant 4 heures. L’enchanteur fait 3 potions de soin par 4 points de mana dépensés durant la confection. L’enchanteur ne peut dépenser plus de points de mana que son niveau d’arcane.\n*Un shaman peut faire une potion de solanine avec la même recette mais en changeant l’essence de cèdre pour de la purée de belladone.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "text": "instantané"
    },
    "area": {
      "text": "le chaudron"
    },
    "bonus": {
      "text": "Donne 20 points de vie à la cible"
    },
    "resilience": {
      "text": "fait 4 potions par mana au lieu de 3."
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "resistance",
    "name": "Résistance",
    "description": "L’enchanteur infuse à une cible l’énergie nécessaire pour la protéger contre la moitié des dégâts faits par un élément donné. L’enchanteur doit tenir en main le bon type de matériel qui servira de catalyseur au sort*.\nL’enchanteur infuse dans un objet l’énergie nécessaire pour protéger le porteur de l’objet contre la moitié des dégâts faits par un élément donné. L’objet en question doit être neuf et préalablement traité pour recevoir l’enchantement. De plus, il doit être certi du bon type de matériel qui servira de catalyseur au sort*. Pour que l'enchantement ne s’estompe pas à la fin de la première utilisation, il faut le sceller avec le sort de Permanence.\nVoici les résistances à utiliser avec ce sort:.\nRésistance à l’acide: protection partielle contre les sorts d’acide.\nRésistance à l’air / électricité: protection partielle contre les sorts d’air et d’électricité.\nRésistance à l’eau / froid: protection partielle contre les sorts d’eau et de froid.\nRésistance au feu: protection partielle contre le feu.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "text": "Une cible"
    },
    "bonus": {
      "text": "divise les dégâts d’un élément par 2"
    },
    "resilience": {
      "text": "La résistance devient une immunité, ce qui veut dire que tous les"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  },
  {
    "id": "degatsDeLelementSerontIgnores",
    "name": "\tdégâts de l’élément seront ignorés.",
    "description": "* Liste des matériaux à utiliser:\nAcide: larme de verre\nAir/Électricité: morceau d’hématite\nEau/froid: Pierre de flocon de neige obsidienne\nFeu: Pierre de soleil\nVoir l’invisible\nCe sort permet au destinataire de voir tous les êtres invisibles (incluant l’invisibilité magique), éthérés ou astraux comme s’ils étaient normalement visibles. Le sort ne permet pas de reconnaître les illusions ni de détecter les choses cachées par des moyens autres que l’invisibilité.",
    "distance": {
      "type": "touch"
    },
    "duration": {
      "value": 1,
      "unit": "scène"
    },
    "area": {
      "text": "Une cible"
    },
    "resilience": {
      "text": "La durée devient une journée"
    },
    "icon": "icons/magic/symbols/question-stone-yellow.webp",
    "actions": []
  }
]